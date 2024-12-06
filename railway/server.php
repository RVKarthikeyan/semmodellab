<?php
$host = "localhost";
$username = "root";
$password = "";
$database = "railway_system";

$conn = new mysqli($host, $username, $password, $database);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // Fetch trains
    $result = $conn->query("SELECT * FROM trains");
    $trains = [];
    while ($row = $result->fetch_assoc()) {
        $trains[] = $row;
    }
    echo json_encode($trains);
} elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Book a ticket
    $train_id = $_POST['train_id'];
    $passenger_name = $_POST['passenger_name'];

    // Check seat availability
    $train = $conn->query("SELECT available_seats FROM trains WHERE id = $train_id")->fetch_assoc();
    if ($train['available_seats'] > 0) {
        // Add booking
        $stmt = $conn->prepare("INSERT INTO bookings (train_id, passenger_name) VALUES (?, ?)");
        $stmt->bind_param("is", $train_id, $passenger_name);
        $stmt->execute();

        // Update seat count
        $conn->query("UPDATE trains SET available_seats = available_seats - 1 WHERE id = $train_id");
        echo "Booking successful!";
    } else {
        echo "No seats available!";
    }
}
?>
