const express = require('express');
const { antrenmanEkle, antrenmanlariGetir, antrenmanSil, antrenmanGuncelle } = require('../controllers/workoutController');
const yetkiKontrol = require('../middleware/authorizer');

const router = express.Router();

router.post('/', yetkiKontrol, antrenmanEkle);
router.get('/:kullaniciId', yetkiKontrol, antrenmanlariGetir);
router.delete('/:id', yetkiKontrol, antrenmanSil);
router.put('/:id', yetkiKontrol, antrenmanGuncelle); // PUT Rotası eklendi

module.exports = router;