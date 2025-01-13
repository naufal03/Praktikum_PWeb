<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: DELETE");
header("Access-Control-Allow-Headers: Content-Type");

include '../db.php';

$data = json_decode(file_get_contents("php://input"));

if (!empty($data->id)) {
  $stmt = $conn->prepare("DELETE FROM todos WHERE id = :id");
  $stmt->bindParam(':id', $data->id);

  if ($stmt->execute()) {
    echo json_encode(["message" => "Todo deleted successfully"]);
  } else {
    echo json_encode(["message" => "Failed to delete todo"]);
  }
} else {
  echo json_encode(["message" => "Invalid input"]);
}
