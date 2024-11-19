<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

$conn = new mysqli("localhost", "root", "", "aniKouDb");

if ($conn->connect_error) {
    die(json_encode(["error" => "Connection failed: " . $conn->connect_error]));
}

$data = json_decode(file_get_contents("php://input"), true);

$email = $conn->real_escape_string($data['email']);
$password = md5($conn->real_escape_string($data['password']));
$firstName = $conn->real_escape_string($data['firstName']);
$lastName = $conn->real_escape_string($data['lastName']);
$middleName = $conn->real_escape_string($data['middleName']);
$contactNo = $conn->real_escape_string($data['contactNo']);

$role = 'user';

$sql = "INSERT INTO users (email, password, firstName, lastName, middleName, contactNo, role) 
        VALUES ('$email', '$password', '$firstName', '$lastName', '$middleName', '$contactNo', '$role')";

if ($conn->query($sql) === TRUE) {
    echo json_encode(["success" => "User registered successfully"]);
} else {
    echo json_encode(["error" => "Error: " . $conn->error]);
}

$conn->close();
?>
