const Diet = require('../models/Diet');

// Yeni beslenme/öğün kaydı oluşturma
const ogunEkle = async (req, res) => {
    try {
        const { kullaniciId, ogunAdi, kalori } = req.body;

        const yeniOgun = new Diet({
            kullaniciId,
            ogunAdi,
            kalori
        });

        await yeniOgun.save();
        res.status(201).json({ mesaj: 'Beslenme kaydi basariyla olusturuldu.', veri: yeniOgun });
    } catch (error) {
        res.status(500).json({ mesaj: 'Beslenme kaydi eklenirken sunucu hatasi olustu.', hata: error.message });
    }
};

// Kullanıcıya ait tüm öğünleri listeleme
const ogunleriGetir = async (req, res) => {
    try {
        const { kullaniciId } = req.params;
        const ogunler = await Diet.find({ kullaniciId }).sort({ createdAt: -1 });
        res.status(200).json(ogunler);
    } catch (error) {
        res.status(500).json({ mesaj: 'Beslenme kayitlari getirilirken sunucu hatasi olustu.', hata: error.message });
    }
};

// Öğün kaydı silme
const ogunSil = async (req, res) => {
    try {
        const { id } = req.params;
        await Diet.findByIdAndDelete(id);
        res.status(200).json({ mesaj: 'Beslenme kaydi basariyla silindi.' });
    } catch (error) {
        res.status(500).json({ mesaj: 'Beslenme kaydi silinirken sunucu hatasi olustu.', hata: error.message });
    }
};

module.exports = { ogunEkle, ogunleriGetir, ogunSil };