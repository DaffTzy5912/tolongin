const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');

const app = express();
const PORT = 3000;

// Konfigurasi Telegram
const TELEGRAM_TOKEN = 'YOUR_TELEGRAM_BOT_TOKEN'; // Ganti dengan token bot Anda
const CHAT_ID = 'YOUR_TELEGRAM_CHAT_ID';         // Ganti dengan chat ID Anda

// Middleware untuk serve file statis (HTML)
app.use(express.static('public'));

// Middleware untuk parsing form data
app.use(bodyParser.urlencoded({ extended: false }));

// Route POST untuk menerima pesan dari form
app.post('/send', async (req, res) => {
    const { name, message } = req.body;

    const telegramMessage = `
📩 Ada Pesan Baru!

Nama: ${name}
Pesan: ${message}
    `;

    const url = `https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`;

    try {
        await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                chat_id: CHAT_ID,
                text: telegramMessage
            })
        });

        res.send("Pesan berhasil dikirim ke Telegram!");
    } catch (error) {
        console.error("Gagal kirim pesan:", error);
        res.status(500).send("Terjadi kesalahan saat mengirim pesan.");
    }
});

// Jalankan server
app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});
