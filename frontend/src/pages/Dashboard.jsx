import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Workout from '../components/Workout';
import Diet from '../components/Diet';

const Dashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  const cikisYap = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('kullaniciId');
    navigate('/login');
  };

  return (
    <div style={{ padding: '40px 20px', maxWidth: '1100px', margin: '0 auto', width: '100%' }}>
      {/* Üst Menü Barı */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}>
        <h2>🏋️‍♂️ Gelişim ve Takip Paneli</h2>
        <button onClick={cikisYap} style={{ width: '120px', backgroundColor: '#dc3545', marginTop: '0' }}>Çıkış Yap</button>
      </div>
      
      {/* Alt Modüller (Yanyana dizmek için flex kullanıyoruz) */}
      <div style={{ display: 'flex', flexWrap: 'wrap', marginTop: '20px', margin: '20px -10px' }}>
        <Workout />
        <Diet />
      </div>
    </div>
  );
};

export default Dashboard;