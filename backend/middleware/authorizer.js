const jwt = require('jsonwebtoken');

const yetkiKontrol = (req, res, next) => {
    // İstek yapan kişinin beraberinde getirdiği token'ı alıyoruz
    const authHeader = req.header('Authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ mesaj: 'Erisim reddedildi. Yetkiniz yok.' });
    }

    const token = authHeader.split(' ')[1];

    try {
        // Token'ın sahte olup olmadığını bizim gizli şifremizle kontrol ediyoruz
        const dogrulanmis = jwt.verify(token, process.env.JWT_SECRET);
        req.kullanici = dogrulanmis; // Her şey yolundaysa kullanıcının kimliğini onayla
        next(); // İşleme (Controller'a) geçişine izin ver
    } catch (error) {
        res.status(400).json({ mesaj: 'Gecersiz veya suresi dolmus token.' });
    }
};

module.exports = yetkiKontrol;