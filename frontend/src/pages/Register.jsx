import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
  const [ad, setAd] = useState('');
  const [email, setEmail] = useState('');
  const [sifre, setSifre] = useState('');
  const navigate = useNavigate();

  const kayitOl = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ad, email, sifre })
      });
      
      if (res.ok) {
        alert('Kayıt başarılı! Şimdi giriş yapabilirsiniz.');
        navigate('/login');
      } else {
        alert('Kayıt başarısız, bu email zaten kullanılıyor olabilir.');
      }
    } catch (err) {
      console.log("Kayıt Hatası:", err);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#1a1d20' }}>
      <div style={{ backgroundColor: 'white', padding: '40px', borderRadius: '15px', boxShadow: '0 10px 25px rgba(0,0,0,0.5)', width: '100%', maxWidth: '400px' }}>
        <h2 style={{ textAlign: 'center', color: '#28a745', marginBottom: '25px', fontSize: '28px' }}>📝 Yeni Hesap Aç</h2>
        
        <form onSubmit={kayitOl} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <input type="text" placeholder="Adınız Soyadınız" value={ad} onChange={(e) => setAd(e.target.value)} required style={{ padding: '15px', borderRadius: '8px', border: '1px solid #ced4da', fontSize: '16px' }} />
          <input type="email" placeholder="Email Adresiniz" value={email} onChange={(e) => setEmail(e.target.value)} required style={{ padding: '15px', borderRadius: '8px', border: '1px solid #ced4da', fontSize: '16px' }} />
          <input type="password" placeholder="Şifreniz" value={sifre} onChange={(e) => setSifre(e.target.value)} required style={{ padding: '15px', borderRadius: '8px', border: '1px solid #ced4da', fontSize: '16px' }} />
          
          <button type="submit" style={{ padding: '15px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '8px', fontSize: '18px', fontWeight: 'bold', cursor: 'pointer', marginTop: '10px' }}>
            Kayıt Ol
          </button>
        </form>
        
        <p style={{ textAlign: 'center', marginTop: '20px', color: '#6c757d', fontSize: '15px' }}>
          Zaten hesabın var mı? <Link to="/login" style={{ color: '#007bff', textDecoration: 'none', fontWeight: 'bold' }}>Giriş Yap</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;