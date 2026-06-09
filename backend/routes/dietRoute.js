const express = require('express');
const { ogunEkle, ogunleriGetir, ogunSil } = require('../controllers/dietController');
const router = express.Router();

router.post('/', ogunEkle);
router.get('/:kullaniciId', ogunleriGetir);
router.delete('/:id', ogunSil);

module.exports = router;