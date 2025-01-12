<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT");
header("Access-Control-Allow-Headers: Content-Type");

include '../db.php';

$data = json_decode(file_get_contents("php://input"));

if (!empty($data->id) && isset($data->title) && isset($data->completed)) {
  $stmt = $conn->prepare("UPDATE todos SET title = :title, completed = :completed WHERE id = :id");
  $stmt->bindParam(':id', $data->id);
  $stmt->bindParam(':title', $data->title);
  $stmt->bindParam(':completed', $data->completed);

  if ($stmt->execute()) {
    echo json_encode(["message" => "Todo updated successfully"]);
  } else {
    echo json_encode(["message" => "Failed to update todo"]);
  }
} else {
  echo json_encode(["message" => "Invalid input"]);
}
