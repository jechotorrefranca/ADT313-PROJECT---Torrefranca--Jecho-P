<?php
require 'config.php';

header('Content-Type: application/json');

$data = json_decode(file_get_contents("php://input"), true);

$sql = "SELECT * FROM animes";
$conditions = [];
$params = [];
$types = "";

if (!empty($data['id'])) {
    $conditions[] = "id = ?";
    $params[] = $data['id'];
    $types .= "i";
}

if (!empty($data['tmdbId'])) {
    $conditions[] = "tmdbId = ?";
    $params[] = $data['tmdbId'];
    $types .= "s";
}

if (!empty($data['media_type'])) {
    $conditions[] = "media_type = ?";
    $params[] = $data['media_type'];
    $types .= "s";
}

if (!empty($data['name'])) {
    $conditions[] = "name LIKE ?";
    $params[] = "%" . $data['name'] . "%";
    $types .= "s";
}

if (count($conditions) > 0) {
    $sql .= " WHERE " . implode(" AND ", $conditions);
}

$stmt = $conn->prepare($sql);

if (!$stmt) {
    echo json_encode(["error" => "Error preparing statement: " . $conn->error]);
    exit;
}

if (count($params) > 0) {
    $stmt->bind_param($types, ...$params);
}

$stmt->execute();
$result = $stmt->get_result();

$animes = [];
while ($row = $result->fetch_assoc()) {
    $animes[] = $row;
}

if (count($animes) > 0) {
    echo json_encode(["success" => true, "data" => $animes]);
} else {
    echo json_encode(["success" => false, "message" => "No animes found."]);
}

$stmt->close();
$conn->close();
?>
