<?php
// Database connection
$conn = new mysqli('localhost', 'root', '', 'library');

if ($conn->connect_error) {
    die('Database connection failed: ' . $conn->connect_error);
}

$action = $_GET['action'] ?? '';

if ($action === 'list') {
    // Fetch all books
    $result = $conn->query('SELECT * FROM books');
    $books = $result->fetch_all(MYSQLI_ASSOC);
    echo json_encode($books);
}

if ($action === 'add') {
    // Add a new book
    $data = json_decode(file_get_contents('php://input'), true);
    $title = $conn->real_escape_string($data['title']);
    $author = $conn->real_escape_string($data['author']);
    $conn->query("INSERT INTO books (title, author) VALUES ('$title', '$author')");
    echo 'Book added';
}

if ($action === 'borrow') {
    // Mark a book as borrowed
    $id = intval($_GET['id']);
    $conn->query("UPDATE books SET status = 'borrowed' WHERE id = $id");
    echo 'Book borrowed';
}

if ($action === 'return') {
    // Mark a book as returned
    $id = intval($_GET['id']);
    $conn->query("UPDATE books SET status = 'available' WHERE id = $id");
    echo 'Book returned';
}

$conn->close();
