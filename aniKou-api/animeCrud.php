<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, PATCH");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

$conn = new mysqli("localhost", "root", "", "aniKouDb");

if ($conn->connect_error) {
    die(json_encode(["error" => "Connection failed: " . $conn->connect_error]));
}

$headers = getallheaders();
if (!isset($headers['Authorization'])) {
    echo json_encode(["error" => "No authorization header found"]);
    exit;
}

$accessToken = str_replace('Bearer ', '', $headers['Authorization']);

if ($accessToken !== 'valid_token') {
    echo json_encode(["error" => "Invalid token"]);
    exit;
}

$data = json_decode(file_get_contents("php://input"), true);

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
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

    $sql = "INSERT INTO animes (adult, backdrop_path, cast, genre_ids, tmdbId, media_type, name, original_language, 
            original_name, overview, popularity, poster_path, release_date, videoKey, vote_average, vote_count) 
            VALUES ('$adult', '$backdrop_path', '$cast', '$genre_ids', '$tmdbId', '$media_type', '$name', '$original_language', 
            '$original_name', '$overview', '$popularity', '$poster_path', '$release_date', '$videoKey', '$vote_average', '$vote_count')";

    if ($conn->query($sql) === TRUE) {
        echo json_encode(["success" => "Anime added successfully"]);
    } else {
        echo json_encode(["error" => "Error: " . $conn->error]);
    }
} elseif ($_SERVER['REQUEST_METHOD'] === 'PATCH') {
    $animeId = $conn->real_escape_string($data['id']);

    $updateFields = [];
    foreach ($data as $key => $value) {
        if ($value !== null) {
            $updateFields[] = "$key = '" . $conn->real_escape_string($value) . "'";
        }
    }

    $updateQuery = "UPDATE animes SET " . implode(", ", $updateFields) . " WHERE tmdbId = '$animeId'";

    if ($conn->query($updateQuery) === TRUE) {
        echo json_encode(["success" => "Anime updated successfully"]);
    } else {
        echo json_encode(["error" => "Error: " . $conn->error]);
    }
}

$conn->close();
?>
