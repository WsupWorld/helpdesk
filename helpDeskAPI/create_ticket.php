<?php

require_once 'config.php';
include 'header.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $json_data = file_get_contents('php://input');

    $data = json_decode($json_data, true);

    // Get the image data, title, and description from the data array
    // $image_data = $data['imageData'];
    $title = $data['title'];
    $description = $data['description'];
    $sessionId = $data['sessionId'];

    $pdo = connect();

    // Generate a unique ticket ID
    $ticket_id = uniqid();
    $stmt = $pdo->prepare("SELECT id FROM sessions WHERE session_id = ?");
    $stmt->execute([$sessionId]);

    // fetch the result
    $id = $stmt->fetch(PDO::FETCH_ASSOC)["id"];
    echo json_encode($id);
    // check if a row was returned
    if ($id) {
        // Insert the ticket into the database
        $sql = "INSERT INTO tickets (id, ticket_id, title, description) VALUES (:id, :ticket_id, :title, :description)";
        $stmt = $pdo->prepare($sql);
        $stmt->execute(["id" => $id, "ticket_id" => $ticket_id, "title" => $title, "description" => $description]);

        // Insert the images into the database
        // $sql = "INSERT INTO images (ticket_id, image) VALUES (?, ?)";
        // $stmt = $conn->prepare($sql);

        // foreach ($image_data as $image) {
        //     $stmt->execute([$ticket_id, $image]);
        // }w

        // Close the database connection

        // Send a response back to the client
        $response = array('message' => 'Ticket created successfully');
        echo json_encode($response);
    }
}
