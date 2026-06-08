const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

// .env dosyasındaki değişkenleri aktif et
dotenv.config();

const app = express();

// Middleware ayarları (Gelen verileri JSON formatında okumak ve dış isteklere izin vermek için)
app.use(express.json());
app.use(cors());

// Test için basit bir endpoint
app.get('/', (req, res) => {
    res.send('Spor Salonu Yonetim Sistemi Backend API Calisiyor!');
});

// Sunucuyu ayağa kaldır
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Sunucu ${PORT} portunda basariyla calisiyor.`);
});