import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [sifre, setSifre] = useState('');
  const navigate = useNavigate();

  const girisYap = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, sifre })
      });
      const data = await res.json();
      
      if (data.token) {
        localStorage.setItem('token', data.token);
        navigate('/dashboard');
      } else {
        alert('Giriş başarısız: Bilgilerinizi kontrol edin.');
      }
    } catch (err) {
      console.log("Giriş Hatası:", err);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#1a1d20' }}>
      <div style={{ backgroundColor: 'white', padding: '40px', borderRadius: '15px', boxShadow: '0 10px 25px rgba(0,0,0,0.5)', width: '100%', maxWidth: '400px' }}>
        <h2 style={{ textAlign: 'center', color: '#333', marginBottom: '25px', fontSize: '28px' }}>🔐 Sisteme Giriş</h2>
        
        <form onSubmit={girisYap} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <input type="email" placeholder="Email Adresiniz" value={email} onChange={(e) => setEmail(e.target.value)} required style={{ padding: '15px', borderRadius: '8px', border: '1px solid #ced4da', fontSize: '16px' }} />
          <input type="password" placeholder="Şifreniz" value={sifre} onChange={(e) => setSifre(e.target.value)} required style={{ padding: '15px', borderRadius: '8px', border: '1px solid #ced4da', fontSize: '16px' }} />
          
          <button type="submit" style={{ padding: '15px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '8px', fontSize: '18px', fontWeight: 'bold', cursor: 'pointer', marginTop: '10px' }}>
            Giriş Yap
          </button>
        </form>
        
        <p style={{ textAlign: 'center', marginTop: '20px', color: '#6c757d', fontSize: '15px' }}>
          Hesabın yok mu? <Link to="/register" style={{ color: '#007bff', textDecoration: 'none', fontWeight: 'bold' }}>Hemen Kayıt Ol</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;