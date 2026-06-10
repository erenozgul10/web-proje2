const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Workout = require('../models/Workout');
const Diet = require('../models/Diet');
const UserData = require('../models/UserData'); // Ölçümleri tuttuğumuz model

// Güvenlik Kapısı (Token Kontrolü)
const auth = (req, res, next) => {
  let token = req.header('Authorization');
  if (!token) return res.status(401).json({ msg: 'Token yok' });
  if (token.startsWith('Bearer ')) token = token.slice(7, token.length).trimLeft();
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'gizli_anahtar');
    req.kullaniciId = decoded.userId || decoded.id || decoded._id;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Geçersiz token' });
  }
};

// ==========================================
// 1. KARDİYO VE ANTRENMAN (WORKOUT)
// ==========================================

// GET İŞLEMİ (Verileri Çekme)
router.get('/antrenman', auth, async (req, res) => {
  try {
    const workouts = await Workout.find({ user: req.kullaniciId }).populate('user', 'email').sort({ createdAt: -1 });
    res.json(workouts);
  } catch (err) { res.status(500).send('Hata'); }
});

// POST İŞLEMİ (Yeni Veri Ekleme)
router.post('/antrenman', auth, async (req, res) => {
  try {
    const yeni = new Workout({ ...req.body, user: req.kullaniciId });
    await yeni.save();
    res.json(yeni);
  } catch (err) { res.status(500).send('Hata'); }
});

// DELETE İŞLEMİ (Veri Silme)
router.delete('/antrenman/:id', auth, async (req, res) => {
  try {
    await Workout.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Silindi' });
  } catch (err) { res.status(500).send('Hata'); }
});


// ==========================================
// 2. BESLENME VE DİYET (DIET)
// ==========================================

// GET İŞLEMİ
router.get('/diyet', auth, async (req, res) => {
  try {
    const diets = await Diet.find({ user: req.kullaniciId }).populate('user', 'email').sort({ createdAt: -1 });
    res.json(diets);
  } catch (err) { res.status(500).send('Hata'); }
});

// POST İŞLEMİ
router.post('/diyet', auth, async (req, res) => {
  try {
    const yeni = new Diet({ ...req.body, user: req.kullaniciId });
    await yeni.save();
    res.json(yeni);
  } catch (err) { res.status(500).send('Hata'); }
});

// DELETE İŞLEMİ
router.delete('/diyet/:id', auth, async (req, res) => {
  try {
    await Diet.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Silindi' });
  } catch (err) { res.status(500).send('Hata'); }
});


// ==========================================
// 3. VÜCUT ÖLÇÜMLERİ (MEASUREMENTS) - PUT ŞOVU!
// ==========================================

// GET İŞLEMİ (Sayfa açılınca ölçümleri getir)
router.get('/', auth, async (req, res) => {
  try {
    let data = await UserData.findOne({ kullaniciId: req.kullaniciId });
    if (!data) {
      data = await UserData.create({ kullaniciId: req.kullaniciId, olcumler: {} });
    }
    res.json(data);
  } catch (err) { res.status(500).send('Hata'); }
});

// PUT İŞLEMİ (Mevcut ölçümleri güncelleme - HOCANIN ARADIĞI 4. İŞLEM!)
router.put('/olcum', auth, async (req, res) => {
  try {
    let data = await UserData.findOne({ kullaniciId: req.kullaniciId });
    
    // Kullanıcının datası yoksa oluştur, varsa ölçümleri güncelle
    if (!data) {
      data = new UserData({ kullaniciId: req.kullaniciId, olcumler: req.body });
    } else {
      data.olcumler = req.body;
    }
    
    await data.save();
    res.json(data.olcumler);
  } catch (err) { res.status(500).send('Hata'); }
});

module.exports = router;