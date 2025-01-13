

<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type");
include '../db.php';

$data = json_decode(file_get_contents("php://input"));

if (!empty($data->title)) {
  $stmt = $conn->prepare("INSERT INTO todos (title, completed) VALUES (:title, :completed)");
  $stmt->bindParam(':title', $data->title);
  $stmt->bindParam(':completed', $data->completed);

  if ($stmt->execute()) {
    echo json_encode(["message" => "Todo created successfully"]);
  } else {
    echo json_encode(["message" => "Failed to create todo"]);
  }
} else {
  echo json_encode(["message" => "Invalid input"]);
}
