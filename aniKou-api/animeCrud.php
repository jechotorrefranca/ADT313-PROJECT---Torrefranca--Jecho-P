<?php
require 'config.php';

use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use Firebase\JWT\ExpiredException;

$headers = getallheaders();
$accessToken = $headers['authorization'] ?? '';

try {
    if (strpos($accessToken, 'Bearer ') === 0) {
        $accessToken = substr($accessToken, 7);
    }
    $key = new Key($secretKey, 'HS256');
    $decoded = JWT::decode($accessToken, $key);
    if (!isset($decoded->data->user_id) || !isset($decoded->data->user_email) || !isset($decoded->data->user_role)) {
        echo json_encode(['status' => 'error', 'message' => 'Invalid token structure.']);
        exit;
    }
    // Corrected condition
    if ($decoded->data->user_role !== 'admin') {
        echo json_encode(['status' => 'error', 'message' => 'Access denied.']);
        exit;
    }
} catch (ExpiredException $e) {
    echo json_encode(['status' => 'error', 'message' => 'Access token has expired.']);
    exit;
} catch (Exception $e) {
    echo json_encode([
        'status' => 'error',
        'message' => 'Invalid access token.',
        'error' => $e->getMessage(),
        'headers' => $headers,
        'accessToken' => $accessToken
    ]);
    exit;
}

$data = json_decode(file_get_contents("php://input"), true);

$isAdmin = ($decoded->data->user_role === 'admin');

if ($isAdmin && $_SERVER['REQUEST_METHOD'] === 'POST') {
        $userId = $decoded->data->user_id; // Extract user ID from token

        $adult = $conn->real_escape_string($data['adult']);
        $backdrop_path = $conn->real_escape_string($data['backdrop_path']);
        $cast = json_encode($data['cast']);
        $genre_ids = json_encode($data['genre_ids']);
        $tmdbId = $conn->real_escape_string($data['tmdbId']);
        $media_type = $conn->real_escape_string($data['media_type']);
        $name = $conn->real_escape_string($data['name']);
        $original_language = $conn->real_escape_string($data['original_language']);
        $original_name = $conn->real_escape_string($data['original_name']);
        $overview = $conn->real_escape_string($data['overview']);
        $popularity = $conn->real_escape_string($data['popularity']);
        $poster_path = $conn->real_escape_string($data['poster_path']);
        $release_date = $conn->real_escape_string($data['release_date']);
        $videoKey = $conn->real_escape_string($data['videoKey']);
        $vote_average = $conn->real_escape_string($data['vote_average']);
        $vote_count = $conn->real_escape_string($data['vote_count']);

        $stmt = $conn->prepare("
            INSERT INTO animes
                (userId, adult, backdrop_path, cast, genre_ids, tmdbId, media_type, name, original_language, 
                original_name, overview, popularity, poster_path, release_date, videoKey, vote_average, vote_count) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
        $stmt->bind_param("iisssissssssssssi", $userId, $adult, $backdrop_path, $cast, $genre_ids, $tmdbId, $media_type, $name, $original_language, $original_name, $overview, $popularity, $poster_path, $release_date, $videoKey, $vote_average, $vote_count);
        if ($stmt->execute()) {
            echo json_encode(["success" => "Anime added successfully"]);
        } else {
            echo json_encode(["error" => "Error: " . $stmt->error]);
        }
    }

$conn->close();
?>
