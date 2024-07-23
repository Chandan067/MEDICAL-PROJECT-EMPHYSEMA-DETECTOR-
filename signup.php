<?php
// Database connection parameters
$servername = "localhost";
$username = "root";
$password = "";
$database = "doctor";

// Create connection
$conn = new mysqli($servername, $username, $password, $database);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Retrieve data from POST request
$data = json_decode(file_get_contents("php://input"));

// Extracting data from JSON
$doc_id = $data->doc_id;
$username = $data->username;
$email = $data->email;
$phno = $data->phno;
$password = $data->password;

// Prepare SQL statement
$stmt = $conn->prepare("INSERT INTO users (doc_id, username, email, phno, password) VALUES (?, ?, ?, ?, ?)");
$stmt->bind_param("sssss", $doc_id, $username, $email, $phno, $password);

// Execute the statement
if ($stmt->execute()) {
    $response = array("success" => true, "message" => "User data inserted successfully.");
    echo json_encode($response);
} else {
    $response = array("success" => false, "message" => "Error: " . $conn->error);
    echo json_encode($response);
}

// Close statement and connection
$stmt->close();
$conn->close();
?>
