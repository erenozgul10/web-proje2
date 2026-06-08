const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const mongoose = require('mongoose');

// .env dosyasındaki değişkenleri aktif et
dotenv.config();

const app = express();

// Middleware ayarları
app.use(express.json());
app.use(cors());

// MongoDB Veritabanı Bağlantısı
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB veritabanina basariyla baglanildi.'))
    .catch((err) => console.log('MongoDB baglanti hatasi:', err));

// Test Endpoint'i
app.get('/', (req, res) => {
    res.send('Spor Salonu Yonetim Sistemi Backend API Calisiyor.');
});

// Sunucuyu ayağa kaldır
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Sunucu ${PORT} portunda basariyla calisiyor.`);
});