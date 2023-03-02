<?php
include('header.php');
require_once('config.php');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents("php://input"));

    $sessionId = $data->sessionId;
    $pdo = connect();
    $stmt = $pdo->prepare('SELECT id FROM sessions WHERE session_id = :sessionId');
    $stmt->execute(['sessionId' => $sessionId]);
    $id = $stmt->fetchColumn();
    // Retrieve user role based on sessionId
    $stmt = $pdo->prepare('SELECT role FROM accounts WHERE id = :id');
    $stmt->execute(['id' => $id]);
    $userRole = $stmt->fetchColumn();
    // Retrieve tickets based on user role
    if ($userRole === 'user') {
        $stmt = $pdo->prepare('SELECT title, description, date, first_name, last_name FROM tickets join user_profile on tickets.id = user_profile.id WHERE tickets.id = :id');
        $stmt->execute(['id' => $id]);
        $tickets = $stmt->fetchAll(PDO::FETCH_ASSOC);
    } else if ($userRole === 'Admin') {
        $stmt = $pdo->prepare('SELECT title, description, date, first_name, last_name FROM tickets join user_profile on tickets.id = user_profile.id');
        $stmt->execute();
        $tickets = $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
    if ($tickets) {
        header('Content-Type: application/json');
        echo json_encode($tickets);
    } else {
        header('Content-Type: application/json');   
        echo json_encode(['error' => 'Invalid request method']);
    }
} else {
    // http_response_code(405); // Method Not Allowed/
    echo json_encode(['error' => 'Invalid request method']);
}
