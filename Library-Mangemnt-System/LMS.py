import json
import os

# ---------- Book Class ----------
class Book:
    def __init__(self, book_id, title, author):
        self.book_id = book_id
        self.title = title
        self.author = author
        self.issued_to = None  # Stores user_id of the borrower

    def to_dict(self):
        return {
            "book_id": self.book_id,
            "title": self.title,
            "author": self.author,
            "issued_to": self.issued_to
        }


# ---------- User Class ----------
class User:
    def __init__(self, user_id, name):
        self.user_id = user_id
        self.name = name
        self.borrowed_books = []

    def to_dict(self):
        return {
            "user_id": self.user_id,
            "name": self.name,
            "borrowed_books": self.borrowed_books
        }


# ---------- Library Class ----------
class Library:
    def __init__(self, filename="library_data.json"):
        self.filename = filename
        self.books = {}
        self.users = {}
        self.load_data()

    # ---------- File Handling ----------
    def load_data(self):
        if os.path.exists(self.filename):
            try:
                with open(self.filename, "r") as file:
                    data = json.load(file)
                    self.books = {b["book_id"]: Book(**b) for b in data.get("books", [])}
                    self.users = {u["user_id"]: User(**u) for u in data.get("users", [])}
            except json.JSONDecodeError:
                print("Error reading JSON. Starting with empty data.")
        else:
            self.save_data()

    def save_data(self):
        data = {
            "books": [b.to_dict() for b in self.books.values()],
            "users": [u.to_dict() for u in self.users.values()]
        }
        with open(self.filename, "w") as file:
            json.dump(data, file, indent=4)

    # ---------- Book Management ----------
    def add_book(self, book_id, title, author):
        if book_id in self.books:
            print("Book ID already exists!")
            return
        self.books[book_id] = Book(book_id, title, author)
        self.save_data()
        print(f"Book '{title}' added successfully!")

    def delete_book(self, book_id):
        if book_id not in self.books:
            print("Book not found.")
            return
        del self.books[book_id]
        self.save_data()
        print(f"Book ID {book_id} deleted.")

    # ---------- User Management ----------
    def add_user(self, user_id, name):
        if user_id in self.users:
            print("User ID already exists!")
            return
        self.users[user_id] = User(user_id, name)
        self.save_data()
        print(f"User '{name}' added successfully!")

    # ---------- Issue/Return ----------
    def issue_book(self, book_id, user_id):
        if book_id not in self.books:
            print("Book not found.")
            return
        if user_id not in self.users:
            print("User not found.")
            return
        book = self.books[book_id]
        user = self.users[user_id]
        if book.issued_to:
            print("Book is already issued.")
            return
        book.issued_to = user_id
        user.borrowed_books.append(book_id)
        self.save_data()
        print(f"Book '{book.title}' issued to {user.name}.")

    def return_book(self, book_id, user_id):
        if book_id not in self.books:
            print("Book not found.")
            return
        if user_id not in self.users:
            print("User not found.")
            return
        book = self.books[book_id]
        user = self.users[user_id]
        if book.issued_to != user_id:
            print("This book wasn't issued to this user.")
            return
        book.issued_to = None
        user.borrowed_books.remove(book_id)
        self.save_data()
        print(f"Book '{book.title}' returned successfully.")

    # ---------- Display ----------
    def show_books(self):
        if not self.books:
            print("No books in the library.")
            return
        print("\n--- Books in Library ---")
        for b in self.books.values():
            status = f"Issued to {self.users[b.issued_to].name}" if b.issued_to else "Available"
            print(f"{b.book_id}: {b.title} by {b.author} [{status}]")

    def show_users(self):
        if not self.users:
            print("No users in the system.")
            return
        print("\n--- Registered Users ---")
        for u in self.users.values():
            print(f"{u.user_id}: {u.name} | Borrowed: {u.borrowed_books}")


# ---------- Demo ----------
if __name__ == "__main__":
    lib = Library()

    while True:
        print("\n=== Library Management System ===")
        print("1. Add Book")
        print("2. Delete Book")
        print("3. Add User")
        print("4. Issue Book")
        print("5. Return Book")
        print("6. Show Books")
        print("7. Show Users")
        print("8. Exit")

        choice = input("Enter choice: ")

        try:
            if choice == "1":
                lib.add_book(input("Book ID: "), input("Title: "), input("Author: "))
            elif choice == "2":
                lib.delete_book(input("Book ID: "))
            elif choice == "3":
                lib.add_user(input("User ID: "), input("Name: "))
            elif choice == "4":
                lib.issue_book(input("Book ID: "), input("User ID: "))
            elif choice == "5":
                lib.return_book(input("Book ID: "), input("User ID: "))
            elif choice == "6":
                lib.show_books()
            elif choice == "7":
                lib.show_users()
            elif choice == "8":
                break
            else:
                print("Invalid choice. Try again.")
        except Exception as e:
            print("Error:", e)