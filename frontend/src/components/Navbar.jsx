import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  const cikisYap = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div style={{ backgroundColor: '#1a1d20', padding: '15px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <Link to="/dashboard" style={{ color: 'white', textDecoration: 'none', fontSize: '22px', fontWeight: 'bold' }}>🏋️‍♂️ Rumeli Fitness</Link>
      <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
        <Link to="/dashboard" style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold' }}>Ana Panel</Link>
        <Link to="/about" style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold' }}>Hakkımızda</Link>
        <Link to="/profile" style={{ color: '#f8d7da', textDecoration: 'none', fontWeight: 'bold' }}>👤 Profil</Link>
        <button onClick={cikisYap} style={{ backgroundColor: '#dc3545', color: 'white', border: 'none', padding: '8px 12px', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}>Çıkış</button>
      </div>
    </div>
  );
};

export default Navbar;