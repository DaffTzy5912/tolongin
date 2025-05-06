<?php
// Konfigurasi
$telegram_token = "8037110552:AAH3tnFaa0olHkOWND7scRhUJ3UG0ojZMEw"; // Contoh: '123456789:AABBCCDDEEFFGGHHIIJJ'
$chat_id = "7341190291"; // Contoh: '123456789'

// Ambil data dari form
$name = htmlspecialchars($_POST['name']);
$message = htmlspecialchars($_POST['message']);

// Format pesan
$telegram_message = urlencode("📩 Ada Pesan Baru!\n\nNama: $name\nPesan: $message");

// URL API Telegram
$url = "https://api.telegram.org/bot$telegram_token/sendMessage?chat_id=$chat_id&text=$telegram_message";

// Kirim permintaan
$response = file_get_contents($url);

if ($response) {
    echo "Pesan berhasil terkirim!";
} else {
    echo "Gagal mengirim pesan.";
}
?>
