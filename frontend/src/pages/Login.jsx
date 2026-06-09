import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [sifre, setSifre] = useState('');
  const navigate = useNavigate();

  const girisIslemi = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        sifre
      });
      
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('kullaniciId', response.data.kullanici.id);
      
      alert('Giris basarili!');
      navigate('/dashboard'); 
    } catch (error) {
      alert(error.response?.data?.mesaj || 'Giris yapilamadi. Bilgilerinizi kontrol edin.');
    }
  };

  return (
    <div className="form-container">
      <h2>Sisteme Giris Yap</h2>
      <form onSubmit={girisIslemi}>
        <div className="form-group">
          <label>Email</label>
          <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Sifre</label>
          <input type="password" required value={sifre} onChange={(e) => setSifre(e.target.value)} />
        </div>
        <button type="submit">Giris Yap</button>
      </form>
      <p className="link-text">Hesabin yok mu? <Link to="/register">Kayit Ol</Link></p>
    </div>
  );
};

export default Login;