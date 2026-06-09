const express = require('express');
const { ogunEkle, ogunleriGetir, ogunSil } = require('../controllers/dietController');
const yetkiKontrol = require('../middleware/authorizer');

const router = express.Router();

router.post('/', yetkiKontrol, ogunEkle);
router.get('/:kullaniciId', yetkiKontrol, ogunleriGetir);
router.delete('/:id', yetkiKontrol, ogunSil);

module.exports = router;