<?php
$host = "localhost";
$username = "root";
$password = "";
$database = "user_auth";

// Create connection
$conn = new mysqli($host, $username, $password, $database);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Handle POST requests
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $action = $_POST['action'];

    if ($action === 'register') {
        $user = $_POST['username'];
        $pass = $_POST['password']; // Stored as plain text

        // Insert into database
        $stmt = $conn->prepare("INSERT INTO users (username, password) VALUES (?, ?)");
        $stmt->bind_param("ss", $user, $pass);
        if ($stmt->execute()) {
            echo "Registration successful!";
        } else {
            echo "Error: " . $stmt->error;
        }
    } elseif ($action === 'login') {
        $user = $_POST['username'];
        $pass = $_POST['password'];

        // Retrieve user details
        $stmt = $conn->prepare("SELECT password FROM users WHERE username = ?");
        $stmt->bind_param("s", $user);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result->num_rows > 0) {
            $row = $result->fetch_assoc();
            if ($pass === $row['password']) {
                echo "Login successful!";
            } else {
                echo "Invalid password!";
            }
        } else {
            echo "User not found!";
        }
    }
}
?>
