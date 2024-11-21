<?php
$randomString = bin2hex(openssl_random_pseudo_bytes(32));

$secretKey = hash('sha256', $randomString);

echo $secretKey;
?>