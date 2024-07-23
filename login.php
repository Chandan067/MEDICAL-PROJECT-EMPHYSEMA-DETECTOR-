<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

require "dbh.php"; // Adjust this according to your actual file path

$response = array();

// Enable error reporting
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents("php://input"));

    if ($data && isset($data->doc_id) && isset($data->password)) {
        $doc_id = $data->doc_id;
        $password = $data->password;

        try {
            // Prepare SQL statement
            $sql = "SELECT * FROM users WHERE doc_id = ? AND password = ?";
            $stmt = $conn->prepare($sql);
            $stmt->execute([$doc_id, $password]);
            $result = $stmt->fetch(PDO::FETCH_ASSOC);

            // Check if user exists
            if ($result) {
                $response['status'] = "success";
                $response['message'] = "Login successful.";
            } else {
                $response['status'] = "error";
                $response['message'] = "Invalid doc_id or password.";
            }
        } catch (PDOException $e) {
            $response['status'] = "error";
            $response['message'] = "Database error: " . $e->getMessage();
        }
    } else {
        $response['status'] = "error";
        $response['message'] = "Invalid input.";
    }
} else {
    $response['status'] = "error";
    $response['message'] = "Invalid request method";
}

// Close the database connection
$conn = null;

// Respond with JSON
header('Content-Type: application/json');
echo json_encode($response);
?>
