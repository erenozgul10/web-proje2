const Workout = require('../models/Workout');

// Yeni antrenman kaydı oluşturma
const antrenmanEkle = async (req, res) => {
    try {
        const { kullaniciId, baslik, sure, notlar } = req.body;

        const yeniAntrenman = new Workout({
            kullaniciId,
            baslik,
            sure,
            notlar
        });

        await yeniAntrenman.save();
        res.status(201).json({ mesaj: 'Antrenman kaydi basariyla olusturuldu.', veri: yeniAntrenman });
    } catch (error) {
        res.status(500).json({ mesaj: 'Antrenman eklenirken sunucu hatasi olustu.', hata: error.message });
    }
};

// Kullanıcıya ait tüm antrenmanları listeleme
const antrenmanlariGetir = async (req, res) => {
    try {
        const { kullaniciId } = req.params;
        const antrenmanlar = await Workout.find({ kullaniciId }).sort({ createdAt: -1 });
        res.status(200).json(antrenmanlar);
    } catch (error) {
        res.status(500).json({ mesaj: 'Antrenmanlar getirilirken sunucu hatasi olustu.', hata: error.message });
    }
};

// Antrenman kaydı silme
const antrenmanSil = async (req, res) => {
    try {
        const { id } = req.params;
        await Workout.findByIdAndDelete(id);
        res.status(200).json({ mesaj: 'Antrenman kaydi basariyla silindi.' });
    } catch (error) {
        res.status(500).json({ mesaj: 'Antrenman silinirken sunucu hatasi olustu.', hata: error.message });
    }
};

module.exports = { antrenmanEkle, antrenmanlariGetir, antrenmanSil };