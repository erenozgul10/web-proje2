import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  // Güvenlik: Eğer giriş yapmadan bu linke girmeye çalışan olursa, kapıdan çevir!
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  // Çıkış Yapma İşlemi
  const cikisYap = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('kullaniciId');
    navigate('/login'); // Çıkış yapınca tekrar giriş ekranına yolla
  };

  return (
    <div style={{ padding: '40px', maxWidth: '800px', margin: '0 auto', width: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}>
        <h2>🏋️‍♂️ Spor Salonu Ana Panel</h2>
        <button onClick={cikisYap} style={{ width: '120px', backgroundColor: '#dc3545', marginTop: '0' }}>Çıkış Yap</button>
      </div>
      
      <div style={{ marginTop: '30px', backgroundColor: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}>
        <h3>Hoş Geldin!</h3>
        <p style={{ marginTop: '10px', color: '#555' }}>
          Günlük antrenman programlarını ve beslenme/kalori takiplerini buradan yönetebilirsin. Modüller birazdan buraya eklenecek.
        </p>
      </div>
    </div>
  );
};

export default Dashboard;