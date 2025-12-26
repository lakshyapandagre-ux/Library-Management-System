// --- Mock Database (State) ---
let inventory = [
    { id: "B-101", title: "The Great Gatsby", author: "F. Scott Fitzgerald", qty: 5, status: "Available" },
    { id: "B-102", title: "Clean Code", author: "Robert C. Martin", qty: 2, status: "Available" },
    { id: "B-103", title: "Introduction to Algorithms", author: "Thomas H. Cormen", qty: 0, status: "Issued" },
    { id: "B-104", title: "Design Patterns", author: "Erich Gamma", qty: 3, status: "Available" }
];

// --- Initialization ---
document.addEventListener('DOMContentLoaded', () => {
    refreshTable();
    setupEventListeners();
});

// --- Modal Handling ---
const overlay = document.getElementById('modal-overlay');

function openModal(modalId) {
    overlay.classList.remove('hidden');
    document.getElementById(modalId).classList.remove('hidden');
}

function closeAllModals() {
    overlay.classList.add('hidden');
    document.querySelectorAll('.modal').forEach(modal => modal.classList.add('hidden'));

    // Reset all forms
    document.querySelectorAll('form').forEach(form => form.reset());
}

// Close modals when clicking overlay
overlay.addEventListener('click', closeAllModals);


// --- Core Logic ---

// 1. Refresh Table UI
function refreshTable(data = inventory) {
    const tableBody = document.querySelector('#books-table tbody');
    tableBody.innerHTML = ''; // Clear current rows

    if (data.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="5" style="text-align:center; padding: 2rem; color: var(--text-muted);">No books found in records.</td></tr>';
        return;
    }

    data.forEach(book => {
        const row = document.createElement('tr');
        const statusClass = book.qty > 0 ? 'status-avail' : 'status-issued';
        const statusText = book.qty > 0 ? 'Available' : 'Out of Stock';

        row.innerHTML = `
            <td><span style="color:var(--accent); font-weight:bold;">${book.id}</span></td>
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.qty}</td>
            <td><span class="status-badge ${statusClass}">${statusText}</span></td>
        `;
        tableBody.appendChild(row);
    });
}

// 2. Add Book
document.getElementById('form-add').addEventListener('submit', (e) => {
    e.preventDefault();
    const id = document.getElementById('add-id').value;
    const title = document.getElementById('add-name').value;
    const author = document.getElementById('add-author').value;
    const qty = parseInt(document.getElementById('add-qty').value);

    if (inventory.some(b => b.id === id)) {
        showToast("Error: Book ID already exists!", "error");
        return;
    }

    inventory.push({ id, title, author, qty, status: "Available" });
    refreshTable();
    showToast("Success: New book added to library.", "success");
    closeAllModals();
});

// 3. Issue Book
document.getElementById('form-issue').addEventListener('submit', (e) => {
    e.preventDefault();
    const id = document.getElementById('issue-id').value;
    const student = document.getElementById('issue-student').value;

    const bookIndex = inventory.findIndex(b => b.id === id);

    if (bookIndex === -1) {
        showToast("Error: Book ID not found.", "error");
        return;
    }

    if (inventory[bookIndex].qty > 0) {
        inventory[bookIndex].qty--;
        refreshTable();
        showToast(`Success: Issued '${inventory[bookIndex].title}' to ${student}.`, "success");
        closeAllModals();
    } else {
        showToast("Error: Book is currently out of stock.", "error");
    }
});

// 4. Return Book
document.getElementById('form-return').addEventListener('submit', (e) => {
    e.preventDefault();
    const id = document.getElementById('return-id').value;
    const bookIndex = inventory.findIndex(b => b.id === id);

    if (bookIndex === -1) {
        showToast("Error: Book ID not found.", "error");
        return;
    }

    inventory[bookIndex].qty++;
    refreshTable();
    showToast("Success: Book returned safely.", "success");
    closeAllModals();
});

// 5. Delete Book
document.getElementById('form-delete').addEventListener('submit', (e) => {
    e.preventDefault();
    const id = document.getElementById('delete-id').value;
    const initialSize = inventory.length;

    inventory = inventory.filter(b => b.id !== id);

    if (inventory.length < initialSize) {
        refreshTable();
        showToast("Success: Book entry deleted.", "success");
        closeAllModals();
    } else {
        showToast("Error: Could not find book to delete.", "error");
    }
});

// --- Search / Filter ---
function filterBooks() {
    const query = document.getElementById('search-input').value.toLowerCase();
    const filtered = inventory.filter(book =>
        book.title.toLowerCase().includes(query) ||
        book.author.toLowerCase().includes(query) ||
        book.id.toLowerCase().includes(query)
    );
    refreshTable(filtered);
}

// --- Utilities ---

function showToast(message, type = "success") {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = 'toast';

    // Color coding based on type
    if (type === 'error') {
        toast.style.borderLeftColor = 'var(--danger)';
    } else {
        toast.style.borderLeftColor = 'var(--success)';
    }

    toast.innerText = message;
    container.appendChild(toast);

    // Auto remove after 3 seconds
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(100%)';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

function scrollToSection(id) {
    document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
}

function setupEventListeners() {
    // Escape key to close modals
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeAllModals();
    });
}
