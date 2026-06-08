const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const mongoose = require('mongoose');
const authRoute = require('./routes/authRoute');

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB veritabanina basariyla baglanildi.'))
    .catch((err) => console.log('MongoDB baglanti hatasi:', err));

app.use('/api/auth', authRoute);

app.get('/', (req, res) => {
    res.send('Spor Salonu Yonetim Sistemi Backend API Calisiyor.');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Sunucu ${PORT} portunda basariyla calisiyor.`);
});