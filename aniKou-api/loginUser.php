<?php
require 'config.php';
use Firebase\JWT\JWT;

$response = array('success' => false, 'message' => '');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents("php://input"), true);
    $email = $conn->real_escape_string($data['email']);
    $password = md5($conn->real_escape_string($data['password']));

    $sql = "SELECT * FROM users WHERE email = '$email' AND password = '$password'";
    $result = $conn->query($sql);
    
    if ($result->num_rows > 0) {
        $user = $result->fetch_assoc();
        $response['success'] = true;
        $response['message'] = 'Login successful';

        $payload = [
            'iat' => time(), // Issued at
            'exp' => time() + (10 * 24 * 60 * 60),
            'data' => [ // Store user data here
                'user_id' => $user['id'],
                'user_email' => $user['email'],
                'user_role' => $user['role'],
            ],
        ];

        // Encode the JWT
        $jwt = JWT::encode($payload, $secretKey, 'HS256');

        // Include user details in the response
        $response['user'] = array(
            'user_id' => $user['id'],
            'user_role' => $user['role'],
            'access_token' => $jwt
        );
    } else {
        $response['message'] = "Invalid credentials";
    }
}

echo json_encode($response);

$conn->close();
?>