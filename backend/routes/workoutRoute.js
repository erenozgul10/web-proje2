const express = require('express');
const { antrenmanEkle, antrenmanlariGetir, antrenmanSil } = require('../controllers/workoutController');
const router = express.Router();

router.post('/', antrenmanEkle);
router.get('/:kullaniciId', antrenmanlariGetir);
router.delete('/:id', antrenmanSil);

module.exports = router;