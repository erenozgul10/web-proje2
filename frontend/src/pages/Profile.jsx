import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Profile = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#f4f7f6' }}>
      <Navbar />
      
      <div style={{ flex: '1', padding: '40px 20px', maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
        <div style={{ backgroundColor: 'white', padding: '40px', borderRadius: '15px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}>
          <div style={{ fontSize: '60px', marginBottom: '10px' }}>👤</div>
          <h2 style={{ color: '#333', marginBottom: '10px' }}>Eren Özgül</h2>
          <p style={{ color: '#777', fontSize: '16px', marginBottom: '20px' }}>Öğrenci No: 231201041</p>
          <span style={{ display: 'inline-block', padding: '10px 20px', backgroundColor: '#28a745', color: 'white', borderRadius: '20px', fontWeight: 'bold' }}>
            Sistem Yöneticisi / Geliştirici
          </span>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Profile;