const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Kullanıcı Kayıt İşlemi (Register)
const register = async (req, res) => {
    try {
        const { kullaniciAdi, email, sifre } = req.body;

        const mevcutKullanici = await User.findOne({ email });
        if (mevcutKullanici) {
            return res.status(400).json({ mesaj: 'Bu email adresi sistemde zaten kayitli.' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashliSifre = await bcrypt.hash(sifre, salt);

        const yeniKullanici = new User({
            kullaniciAdi,
            email,
            sifre: hashliSifre
        });

        await yeniKullanici.save();
        res.status(201).json({ mesaj: 'Kullanici basariyla olusturuldu.' });

    } catch (error) {
        res.status(500).json({ mesaj: 'Sunucu hatasi', hata: error.message });
    }
};

// Kullanıcı Giriş İşlemi (Login)
const login = async (req, res) => {
    try {
        const { email, sifre } = req.body;

        const kullanici = await User.findOne({ email });
        if (!kullanici) {
            return res.status(404).json({ mesaj: 'Kullanici bulunamadi.' });
        }

        const sifreDogruMu = await bcrypt.compare(sifre, kullanici.sifre);
        if (!sifreDogruMu) {
            return res.status(400).json({ mesaj: 'Hatali sifre girdiniz.' });
        }

        const token = jwt.sign({ id: kullanici._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

        res.status(200).json({
            mesaj: 'Giris basarili',
            token,
            kullanici: {
                id: kullanici._id,
                kullaniciAdi: kullanici.kullaniciAdi,
                email: kullanici.email
            }
        });

    } catch (error) {
        res.status(500).json({ mesaj: 'Sunucu hatasi', hata: error.message });
    }
};

module.exports = { register, login };