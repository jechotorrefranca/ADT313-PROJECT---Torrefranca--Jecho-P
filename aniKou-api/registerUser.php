<?php
require 'config.php';

$data = json_decode(file_get_contents("php://input"), true);

$requiredFields = ['email', 'password', 'firstName', 'lastName', 'middleName', 'contactNo'];
foreach ($requiredFields as $field) {
    if (empty($data[$field])) {
        echo json_encode(["error" => "$field is required."]);
        exit;
    }
}

$email = $data['email'];
$password = md5($data['password']);
$firstName = $data['firstName'];
$lastName = $data['lastName'];
$middleName = $data['middleName'];
$contactNo = $data['contactNo'];
$role = 'user';

$stmt = $conn->prepare("
    INSERT INTO users (email, password, firstName, lastName, middleName, contactNo, role) 
    VALUES (?, ?, ?, ?, ?, ?, ?)
");

$stmt->bind_param(
    "sssssss",
    $email,
    $password,
    $firstName,
    $lastName,
    $middleName,
    $contactNo,
    $role
);

if (!$stmt) {
    echo json_encode(["error" => "Error preparing statement: " . $conn->error]);
    exit;
}

if ($stmt->execute()) {
    echo json_encode(["success" => "User registered successfully"]);
} else {
    echo json_encode(["error" => "Error executing query: " . $stmt->error]);
}

$stmt->close();
$conn->close();
?>
