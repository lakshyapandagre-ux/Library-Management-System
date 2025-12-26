<div align="center">

# 📚✨ **Library Management System (LMS)** ✨📚

---

![Python Version](https://img.shields.io/badge/python-3.6%2B-blue.svg) ![License](https://img.shields.io/badge/license-MIT-green.svg) ![Status](https://img.shields.io/badge/status-Active-brightgreen.svg)

</div>

---

## 📝 **Introduction**

> The **Library Management System (LMS)** is designed to streamline the process of managing book inventories and user activities in libraries.  
> It serves as a practical tool for librarians and administrators to keep track of book availability, user registrations, and borrowing history.  
> *Ideal for small to medium-sized libraries, schools, and institutions seeking a cost-effective and easy-to-use solution.*

---

## 🚀 **Features**

- ✅ **Add / Delete Books** — Easily manage your library’s book collection.  
- ✅ **Add Users** — Register new library users.  
- ✅ **Issue Books** — Assign books to registered users.  
- ✅ **Return Books** — Mark issued books as returned.  
- ✅ **View Books & Users** — Display all available books and registered users.  
- 💾 **Persistent Storage** — All data is stored in a JSON file (`library_data.json`), ensuring data is saved between sessions.  
- ⚠️ **Error Handling** — Basic validation and error handling to prevent invalid operations.  
- 🛠️ **Modular Design** — Organized code structure with classes for books, users, and the library for easy maintenance and scalability.

---

## 🔍 **Use Cases**

This Library Management System is perfect for:

- 🏫 **Schools and Educational Institutions:** Manage textbooks and reference materials for students and staff.  
- 📚 **Public Libraries:** Keep track of community book lending and returns.  
- 🏢 **Small Organizations and Clubs:** Manage collections of books, magazines, or other lending materials.  
- 🏠 **Home Libraries:** Personal book collections can be organized and tracked efficiently.

---

## 🧱 **Project Structure**

```
Library-Mangemnt-System/
│
├── LMS.py               # Main program file
├── library_data.json    # Auto-generated data file (book/user records)
└── README.md            # Project documentation
```

---

## ⚙️ **How It Works**

1. 💾 When you start the program, it loads existing data from `library_data.json`. If the file does not exist, it initializes empty records for books and users.  
2. 🎛️ You interact with the system through a **menu-driven interface**, selecting options by entering corresponding numbers. Each menu option guides you through the required input steps.  
3. 💾 After every operation (adding, issuing, returning books), the system immediately saves updated data back to the JSON file to ensure persistence.  
4. ⚠️ The system performs basic validation to prevent errors like issuing already issued books or deleting non-existent users.  
5. 🚪 You can exit anytime using the menu option, ensuring all data is safely stored.

---

## 📋 **Menu Options**

| Option | Description          |
|:------:|---------------------|
| 1      | Add a new book       |
| 2      | Delete a book        |
| 3      | Add a new user       |
| 4      | Issue a book         |
| 5      | Return a book        |
| 6      | Show all books       |
| 7      | Show all users       |
| 8      | Exit program         |

---

## 🖥️ **Usage**

### 🧩 Run the Program
```bash
python3 LMS.py
```

### 📘 Example Run
```
=== Library Management System ===
1. Add Book
2. Delete Book
3. Add User
4. Issue Book
5. Return Book
6. Show Books
7. Show Users
8. Exit
Enter choice: 1
Book ID: B101
Title: The Alchemist
Author: Paulo Coelho
Book 'The Alchemist' added successfully!
```

---

## 💾 **Data Storage**

All data is stored in a JSON file (`library_data.json`) with this structure:
```json
{
  "books": [
    {
      "book_id": "B101",
      "title": "The Alchemist",
      "author": "Paulo Coelho",
      "issued_to": "U001"
    }
  ],
  "users": [
    {
      "user_id": "U001",
      "name": "Alice",
      "borrowed_books": ["B101"]
    }
  ]
}
```

---

## 🧠 **Classes Overview**

### `Book`  
Represents a single book with attributes:  
- `book_id`, `title`, `author`, `issued_to`

### `User`  
Represents a user with:  
- `user_id`, `name`, and a list of `borrowed_books`

### `Library`  
Handles all main operations:  
- Loading and saving data  
- Adding/deleting books and users  
- Issuing and returning books  
- Displaying data

---

## 🧩 **Technologies Used**

- 🐍 **Python 3.x** — Core programming language used to build the system.  
- 📦 **JSON Module** — For reading and writing data to JSON files, enabling persistent storage.  
- 🔧 **File Handling** — Built-in Python file operations to manage data files safely.

---

## 🛠️ **Requirements**

- Python 3.x  
- No external libraries required (uses built-in `json` and `os`)

---

## ✨ **Future Improvements**

- 🖼️ Add a graphical user interface (GUI) using `tkinter` or `PyQt`  
- 🔍 Implement search and filtering for books/users  
- ⏰ Add due dates and fines for late returns  
- 🔐 Integrate user authentication (Admin vs Member)  
- ☁️ **Cloud Integration:** Store data on cloud platforms for remote access and backup.  
- 📊 **Report Generation:** Generate reports on borrowing history, popular books, and user activity.  
- 📣 **Notifications:** Implement email or SMS notifications for due dates and overdue books.

---

## 🧾 **Summary**

> 💡 **The Library Management System provides a comprehensive yet simple solution to manage library operations including book inventory, user registrations, and borrowing activities.**  
> With persistent data storage, user-friendly menu navigation, and modular code design, it offers a reliable tool for small to medium-sized libraries and institutions to maintain efficient control over their collections and users.  
> 📚✨

---

## 👨‍💻 **Author**

**Vinayak**  
📧 *[vmaugust8@gmail.com]*  
💻 *[https://github.com/vinayakmishra4]*  

---

## 📝 **License**

This project is licensed under the [MIT License](LICENSE).

---

⭐ If you like this project, give it a star on GitHub!
