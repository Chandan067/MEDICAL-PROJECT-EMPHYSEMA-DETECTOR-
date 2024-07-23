<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

require "dbh.php"; // Adjust this according to your actual file path

// Check if the request method is POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Check if all required form fields are present
    if (isset($_POST['name']) && isset($_POST['phno']) && isset($_POST['email']) && isset($_POST['specialization']) && isset($_POST['qualification']) && isset($_POST['address'])) {
        // Get the form data
        $name = $_POST['name'];
        $phno = $_POST['phno'];
        $email = $_POST['email'];
        $specialization = $_POST['specialization'];
        $qualification = $_POST['qualification'];
        $address = $_POST['address'];

        try {
            // Prepare SQL statement
            $sql = "INSERT INTO doctor_data (name, phno, email, specialization, qualification, address) VALUES (:name, :phno, :email, :specialization, :qualification, :address)";
            $stmt = $conn->prepare($sql);
            $stmt->bindParam(':name', $name, PDO::PARAM_STR);
            $stmt->bindParam(':phno', $phno, PDO::PARAM_STR);
            $stmt->bindParam(':email', $email, PDO::PARAM_STR);
            $stmt->bindParam(':specialization', $specialization, PDO::PARAM_STR);
            $stmt->bindParam(':qualification', $qualification, PDO::PARAM_STR);
            $stmt->bindParam(':address', $address, PDO::PARAM_STR);

            // Execute SQL statement
            if ($stmt->execute()) {
                $response['status'] = "success";
                $response['message'] = "Doctor details inserted successfully!";
            } else {
                $response['status'] = "error";
                $response['message'] = "Failed to insert doctor details";
            }
        } catch (PDOException $e) {
            $response['status'] = "error";
            $response['message'] = "Database error: " . $e->getMessage();
        }
    } else {
        // Handle the case where required form fields are missing or not properly named
        $response['status'] = "error";
        $response['message'] = "Invalid request data. Required form fields are missing.";
    }
} else {
    // Handle the case where request method is not POST
    $response['status'] = "error";
    $response['message'] = "Invalid request method";
}

// Close the database connection
$conn = null;

// Respond with JSON
echo json_encode($response);
?>
