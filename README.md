# ADT313 Project

# AniKou: Your Ultimate Anime Companion

AniKou is your go-to platform for exploring the vibrant world of anime movies and shows. Dive into a comprehensive database featuring detailed information on your favorite series and films, including synopses, character profiles, release dates, and ratings.

Stay updated on the latest releases, discover hidden gems, and connect with a community of anime enthusiasts. Whether you're a seasoned otaku or new to the anime universe, AniKou is designed to enhance your viewing experience and keep your love for anime alive.

# AniKou API Endpoints


| Method  | URL                                   | Payload                                                                               | Header | Description       |
|---------|---------------------------------------|---------------------------------------------------------------------------------------|--------|-------------------|
| POST    | localhost/anikou-api/registerUser.php         | {"email": "test@mail.com", "password": "password", "firstName": "string", "middleName": "string", "lastName": "string"} | N/A    | Register user     |
| POST    | localhost/anikou-api/loginUser.php            | {"email": "test@mail.com", "password": "password"}                                    | N/A    | Login user        |

| Anime API                                                                                                                            |
|---------|---------------------------------------|---------------------------------------------------------------------------------------|--------|-------------------|
| GET     | localhost/anikou-api/animeOnly.php            | N/A                                                                                   | N/A    | Get all animes    |
| GET     | localhost/anikou-api/animeOnly.php       | {"id": "number"}                                                                                   | N/A    | Get anime by id   |
| POST    | localhost/anikou-api/animeCrud.php            | {"tmdbId": "number", "name": "string", "overview": "string", "first_air_date": "date", ... } | N/A    | Add anime         |
| PATCH   | localhost/anikou-api/animeCrud.php       | {"id": "number", "name": "string", "overview": "string", ... }                                        | N/A    | Update anime      |
| DELETE  | localhost/anikou-api/animeCrud.php       | {"id": "number"}                                                                                   | N/A    | Delete anime      |

| Casts API                                                                                                                           |
|---------|---------------------------------------|---------------------------------------------------------------------------------------|--------|-------------------|
| GET     | localhost/anikou-api/castsCrud.php            | N/A                                                                                   | N/A    | Get all casts     |
| GET     | localhost/anikou-api/castsCrud.php       | {"id": "number"}                                                                                   | N/A    | Get cast by id    |
| POST    | localhost/anikou-api/castsCrud.php            | {"animeId": "number", "characterName": "string", "name": "string", ... }              | N/A    | Add cast          |
| PATCH   | localhost/anikou-api/castsCrud.php       | {"id": "number", "characterName": "string", "name": "string", ... }                                   | N/A    | Update cast       |
| DELETE  | localhost/anikou-api/castsCrud.php       | {"id": "number"}                                                                                   | N/A    | Delete cast       |

| Videos API                                                                                                                          |
|---------|---------------------------------------|---------------------------------------------------------------------------------------|--------|-------------------|
| GET     | localhost/anikou-api/videosCrud.php           | N/A                                                                                   | N/A    | Get all videos    |
| GET     | localhost/anikou-api/videosCrud.php      | {"id": "number"}                                                                                   | N/A    | Get video by id   |
| POST    | localhost/anikou-api/videosCrud.php           | {"animeId": "number", "name": "string", "key": "string", "site": "string", ... }      | N/A    | Add video         |
| PATCH   | localhost/anikou-api/videosCrud.php      | {"id": "number", "name": "string", "key": "string", ... }                                             | N/A    | Update video      |
| DELETE  | localhost/anikou-api/videosCrud.php      | {"id": "number"}                                                                                   | N/A    | Delete video      |

| Images API                                                                                                                          |
|---------|---------------------------------------|---------------------------------------------------------------------------------------|--------|-------------------|
| GET     | localhost/anikou-api/imagesCrud.php           | N/A                                                                                   | N/A    | Get all images    |
| GET     | localhost/anikou-api/imagesCrud.php      | {"id": "number"}                                                                                  | N/A    | Get image by id   |
| POST    | localhost/anikou-api/imagesCrud.php           | {"animeId": "number", "file_path": "string", "vote_average": "float"}                 | N/A    | Add image         |
| PATCH   | localhost/anikou-api/imagesCrud.php      | {"id": "number", "file_path": "string", "vote_average": "float"}                                      | N/A    | Update image      |
| DELETE  | localhost/anikou-api/imagesCrud.php      | {"id": "number"}                                                                                   | N/A    | Delete image      |

| Comments API                                                                                                                        |
|---------|---------------------------------------|---------------------------------------------------------------------------------------|--------|-------------------|
| GET     | localhost/anikou-api/getComments.php         | {"animeId": "number"}                                                                 | N/A    | Get comments      |
| POST    | localhost/anikou-api/commentsCrud.php         | {"animeId": "number", "userId": "number", "comment_text": "string"}                   | N/A    | Add comment       |
