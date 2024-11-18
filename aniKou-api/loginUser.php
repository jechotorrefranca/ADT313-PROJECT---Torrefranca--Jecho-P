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

$sql = "SELECT * FROM users WHERE email = '$email' AND password = '$password'";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $user = $result->fetch_assoc();

    $access_token = bin2hex(random_bytes(16));

    echo json_encode([
        "success" => true,
        "message" => "Login successful",
        "access_token" => $access_token,
        "role" => $user['role']
    ]);

} else {

    echo json_encode(["success" => false, "error" => "Invalid credentials"]);
}

$conn->close();
?>
