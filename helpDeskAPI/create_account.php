<?php
include("header.php");

require_once("config.php");

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents("php://input"));

    $username = $data->username;
    $password = $data->password;
    $first_name = $data->first_name;
    $last_name = $data->last_name;
    $CNI = $data->CNI;
    $role = $data->role;
    $sessionId = $data->sessionId;
    $pdo = connect();

    $pdo->beginTransaction();

    try {
        $sql = 'SELECT accounts.role FROM accounts
        JOIN sessions ON accounts.id = sessions.id
        WHERE sessions.session_id = :session_id';
        $stmt = $pdo->prepare($sql);
        $stmt->bindParam(':session_id', $sessionId);
        $stmt->execute();
        $result = $stmt->fetch(PDO::FETCH_ASSOC);
        // Check if session ID exists and user's role is Admin
        if ($result && $result['role'] === 'Admin') {
            $accounts_sql = "INSERT INTO accounts (id, username, password, role) VALUES (:id, :username, :password, :role)";
            $user_profile_sql = "INSERT INTO user_profile (id, first_name, last_name, CNI) VALUES (:id, :first_name, :last_name,  :CNI)";
            $id = uniqid();
            // Execute the first SQL statement
            $stmt = $pdo->prepare($accounts_sql);
            $stmt->execute([
                'id' => $id,
                'username' => $username,
                'password' => $password,
                'role' => $role
            ]);

            // Execute the second SQL statement
            $stmt = $pdo->prepare($user_profile_sql);
            $stmt->execute([
                'id' => $id,
                'first_name' => $first_name,
                'last_name' => $last_name,
                'CNI' => $CNI,
            ]);

            // Commit the transaction
            $pdo->commit();

            // Return success response
            $response = [
                'status' => 1,
                'message' => 'Account created successfully',
            ];
            header('Content-Type: application/json');
            echo json_encode($response);
        }
    } catch (PDOException $e) {
        // Rollback the transaction on error
        $pdo->rollBack();

        // Return error response
        $response = [
            'status' => 0,
            'message' => $e->getMessage(),
        ];
        header('Content-Type: application/json');
        echo json_encode($response);
    }
}
