<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include '../db.php';

$stmt = $conn->prepare("SELECT id, title, completed FROM todos");
$stmt->execute();

$todos = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($todos);
