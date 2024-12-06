<?php
$host = "localhost";
$username = "root";
$password = "";
$database = "shopping_app";

$conn = new mysqli($host, $username, $password, $database);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // Fetch items from the database
    $result = $conn->query("SELECT * FROM items");
    $items = [];
    while ($row = $result->fetch_assoc()) {
        $items[] = $row;
    }
    echo json_encode($items);
}
?>
