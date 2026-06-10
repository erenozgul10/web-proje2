import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Navbar from '../components/Navbar';
import StatCard from '../components/StatCard';
import Workout from '../components/Workout';
import Diet from '../components/Diet';
import Measurements from '../components/Measurements';
import WaterTracker from '../components/WaterTracker';
import Footer from '../components/Footer';
import LoadingSpinner from '../components/LoadingSpinner';

const Dashboard = () => {
  const navigate = useNavigate();
  const [yukleniyor, setYukleniyor] = useState(true);

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/login');
    } else {
      setTimeout(() => setYukleniyor(false), 800);
    }
  }, [navigate]);

  if (yukleniyor) {
    return <div style={{ display: 'flex', height: '100vh', justifyContent: 'center', alignItems: 'center', backgroundColor: '#f4f7f6' }}><LoadingSpinner /></div>;
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#f4f7f6' }}>
      <Navbar />
      {/* ToastContainer'ı en tepeye koyduk ki tüm sayfalarda çalışsın */}
      <ToastContainer /> 
      
      <div style={{ flex: '1', padding: '20px', maxWidth: '1200px', margin: '0 auto', width: '100%', boxSizing: 'border-box' }}>
        <h2 style={{ marginBottom: '20px', color: '#333' }}>📊 Gelişim ve Takip Paneli</h2>
        
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px', marginBottom: '20px' }}>
          <StatCard baslik="Günlük Hedef" deger="2500 kcal" ikon="🎯" renk="#007bff" />
          <StatCard baslik="Sistem Durumu" deger="Aktif" ikon="🔥" renk="#28a745" />
          <StatCard baslik="Antrenman Puanı" deger="A+" ikon="⭐" renk="#ffc107" />
        </div>

        {/* 4 Kutu Olduğu İçin Grid Sistemi Şahane Duracak */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
          <Workout />
          <Diet />
          <Measurements />
          <WaterTracker />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Dashboard;