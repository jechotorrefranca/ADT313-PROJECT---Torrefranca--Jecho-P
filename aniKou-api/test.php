<?php
$randomString = bin2hex(openssl_random_pseudo_bytes(32)); // 32 bytes = 64 hex characters

// Hash the string using SHA-256
$secretKey = hash('sha256', $randomString);

echo $secretKey;
?>