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
        $userId = $decoded->data->user_id;

        $adult = $data['adult'];
        $backdrop_path = $data['backdrop_path'];
        $cast = json_encode($data['cast']);
        $genre_ids = json_encode($data['genre_ids']);
        $tmdbId = $data['tmdbId'];
        $media_type = $data['media_type'];
        $name = $data['name'];
        $original_language = $data['original_language'];
        $original_name = $data['original_name'];
        $overview = $data['overview'];
        $popularity = $data['popularity'];
        $poster_path = $data['poster_path'];
        $release_date = $data['release_date'];
        $videoKey = $data['videoKey'];
        $vote_average = $data['vote_average'];
        $vote_count = $data['vote_count'];

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
