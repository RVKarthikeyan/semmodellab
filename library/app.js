// Fetch books from server
const fetchBooks = () => {
    fetch('server.php?action=list')
        .then(response => response.json())
        .then(data => {
            const booksList = document.getElementById('booksList');
            booksList.innerHTML = '';
            data.forEach(book => {
                booksList.innerHTML += `
                    <tr>
                        <td>${book.id}</td>
                        <td>${book.title}</td>
                        <td>${book.author}</td>
                        <td>${book.status}</td>
                        <td>
                            ${book.status === 'available' 
                                ? `<button onclick="borrowBook(${book.id})">Borrow</button>` 
                                : `<button onclick="returnBook(${book.id})">Return</button>`}
                        </td>
                    </tr>
                `;
            });
        });
};

// Add book to the library
const addBookForm = document.getElementById('addBookForm');
addBookForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;

    fetch('server.php?action=add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, author })
    }).then(() => {
        fetchBooks();
        addBookForm.reset();
    });
});

// Borrow a book
const borrowBook = (id) => {
    fetch(`server.php?action=borrow&id=${id}`).then(() => fetchBooks());
};

// Return a book
const returnBook = (id) => {
    fetch(`server.php?action=return&id=${id}`).then(() => fetchBooks());
};

// Initialize the app by loading the books
fetchBooks();
