const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const mongoose = require('mongoose');

// Route Tanımlamaları
const authRoute = require('./routes/authRoute');
const workoutRoute = require('./routes/workoutRoute');
const dietRoute = require('./routes/dietRoute');

dotenv.config();
const app = express();

// Middleware Yapılandırması
app.use(express.json());
app.use(cors());

// MongoDB Veritabanı Bağlantısı
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB veritabanina basariyla baglanildi.'))
    .catch((err) => console.log('MongoDB baglanti hatasi:', err));

// API Rotalarının Dağıtımı
app.use('/api/auth', authRoute);
app.use('/api/workouts', workoutRoute);
app.use('/api/diets', dietRoute);
app.use('/api/data', require('./routes/dataRoutes'));
// Test Endpoint'i
app.get('/', (req, res) => {
    res.send('Spor Salonu Yonetim Sistemi Backend API Calisiyor.');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Sunucu ${PORT} portunda basariyla calisiyor.`);
});