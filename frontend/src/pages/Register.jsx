import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
  const [kullaniciAdi, setKullaniciAdi] = useState('');
  const [email, setEmail] = useState('');
  const [sifre, setSifre] = useState('');
  const navigate = useNavigate();

  const kayitIslemi = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/auth/register', {
        kullaniciAdi,
        email,
        sifre
      });
      alert('Kayit basarili! Lutfen giris yapin.');
      navigate('/login');
    } catch (error) {
      alert(error.response?.data?.mesaj || 'Kayit sirasinda bir hata olustu.');
    }
  };

  return (
    <div className="form-container">
      <h2>Yeni Kayit Olustur</h2>
      <form onSubmit={kayitIslemi}>
        <div className="form-group">
          <label>Kullanici Adi</label>
          <input type="text" required value={kullaniciAdi} onChange={(e) => setKullaniciAdi(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Sifre</label>
          <input type="password" required value={sifre} onChange={(e) => setSifre(e.target.value)} />
        </div>
        <button type="submit">Kayit Ol</button>
      </form>
      <p className="link-text">Zaten hesabin var mi? <Link to="/login">Giris Yap</Link></p>
    </div>
  );
};

export default Register;