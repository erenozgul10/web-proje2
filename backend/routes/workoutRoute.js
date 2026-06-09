const express = require('express');
const { antrenmanEkle, antrenmanlariGetir, antrenmanSil } = require('../controllers/workoutController');
const yetkiKontrol = require('../middleware/authorizer'); // Güvenlik görevlisini çağırdık

const router = express.Router();

// Araya 'yetkiKontrol' ekleyerek bu işlemleri sadece giriş yapanlara özel kıldık
router.post('/', yetkiKontrol, antrenmanEkle);
router.get('/:kullaniciId', yetkiKontrol, antrenmanlariGetir);
router.delete('/:id', yetkiKontrol, antrenmanSil);

module.exports = router;