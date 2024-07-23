<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

require "dbh.php"; // Adjust this according to your actual file path

// Check if the request method is GET
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // Check if the id parameter is provided
    if (isset($_GET['id'])) {
        // Get the id parameter
        $id = $_GET['id'];

        try {
            // Prepare SQL statement with a WHERE clause to fetch details based on id
            $sql = "SELECT name, age, gender, specialization, qualification, address FROM doctor_data WHERE id = :id";
            $stmt = $conn->prepare($sql);
            $stmt->bindParam(':id', $id, PDO::PARAM_INT);

            // Execute SQL statement
            if ($stmt->execute()) {
                $result = $stmt->fetch(PDO::FETCH_ASSOC);

                if ($result) {
                    $response['status'] = "success";
                    $response['data'] = $result;
                } else {
                    $response['status'] = "error";
                    $response['message'] = "No doctor details found for the provided id";
                }
            } else {
                $response['status'] = "error";
                $response['message'] = "Failed to fetch doctor details";
            }
        } catch (PDOException $e) {
            $response['status'] = "error";
            $response['message'] = "Database error: " . $e->getMessage();
        }
    } else {
        // Handle the case where the id parameter is missing
        $response['status'] = "error";
        $response['message'] = "ID parameter is missing";
    }
} else {
    // Handle the case where request method is not GET
    $response['status'] = "error";
    $response['message'] = "Invalid request method";
}

// Close the database connection
$conn = null;

// Respond with JSON
echo json_encode($response);
?>
