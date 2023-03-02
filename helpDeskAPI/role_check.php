<?php
include('header.php');
require_once('config.php');

// Check if the request method is POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    // Get the session ID and role from the request body
    $data = json_decode(file_get_contents("php://input"));
    $session_id = $data->sessionId;
    $role = $data->role;

    // Connect to the database
    $pdo = connect();

    // Check if the session ID exists in the sessions table
    $stmt = $pdo->prepare('SELECT id FROM sessions WHERE session_id = :session_id LIMIT 1');
    $stmt->execute(['session_id' => $session_id]);
    $result = $stmt->fetch(PDO::FETCH_ASSOC);

    // If the session ID exists, retrieve the user's role from the accounts table
    if ($result) {
        $id = $result['id'];
        $stmt = $pdo->prepare('SELECT role FROM accounts WHERE id = :id');
        $stmt->execute(['id' => $id]);
        $result = $stmt->fetch(PDO::FETCH_ASSOC);

        // If the user's role matches the required role, return a success response
        if ($result['role'] == $role) {
            $response = [
                'success' => true
            ];
            header('Content-Type: application/json');
            echo json_encode($response);
        }else{
            $response = [
                'success' => false
            ];
            header('Content-Type: application/json');
            echo json_encode($response);
        }
    }
    
}
