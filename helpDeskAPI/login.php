<?php
include("header.php");
require_once('config.php');

// Check for POST request
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents("php://input"));

    $username = $data->username;
    $password = $data->password;

    $pdo = connect();

    // Prepare the SQL statement
    $sql = "SELECT id, role FROM accounts WHERE username = :username AND password = :password";

    try {
        // Execute the SQL statement
        $stmt = $pdo->prepare($sql);
        $stmt->execute([
            'username' => $username,
            'password' => $password
        ]);

        // Check if the user exists
        if ($stmt->rowCount() === 1) {
            $user = $stmt->fetch(PDO::FETCH_ASSOC);
            // User exists, return success response
            $sessionId = bin2hex(random_bytes(32));
            $stmt = $pdo->prepare("INSERT INTO `sessions` (`id`, `session_id`) VALUES (?, ?)
  ON DUPLICATE KEY UPDATE `session_id` = VALUES(`session_id`);
");
            $stmt->execute([$user['id'], $sessionId]);

            $response = [
                'status' => 1,
                'message' => 'Login successful',
                'sessionId' => $sessionId
            ];
            header('Content-Type: application/json');
            echo json_encode($response);
        } else {
            // User does not exist or password is incorrect, return error response
            $response = [
                'status' => 0,
                'message' => 'Invalid username or password',
            ];
            header('Content-Type: application/json');
            echo json_encode($response);
        }
    } catch (PDOException $e) {
        // Return error response
        $response = [
            'status' => 'error',
            'message' => $e->getMessage(),  
        ];
        header('Content-Type: application/json');
        echo json_encode($response);
    }
}
?>