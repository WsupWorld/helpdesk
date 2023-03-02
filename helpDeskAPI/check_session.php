<?php
include("header.php");
require_once('config.php');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents("php://input"));
    $session_id = $data->sessionId;
    $pdo = connect();

    $stmt = $pdo->prepare('SELECT id FROM sessions where session_id =:session_id LIMIT 1');
    $stmt->execute(['session_id' => $session_id]);
    $result = $stmt->fetch(PDO::FETCH_ASSOC);
    if ($result) {

        $id = $result['id'];

        $stmt = $pdo->prepare('SELECT role FROM accounts WHERE id = ?');
        $stmt->execute([$id]);
        $result = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($result) {
            $user_role = $result['role'];
            if ($user_role) {
                $response = [
                    'role' => $user_role
                ];
            }
            header('Content-Type: application/json');
            echo json_encode($response);
        }
    }
}
