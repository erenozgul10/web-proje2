import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const About = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#f4f7f6' }}>
      <Navbar />
      
      <div style={{ flex: '1', padding: '40px 20px', maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
        <h2 style={{ color: '#007bff', marginBottom: '20px' }}>🏢 Proje Hakkında</h2>
        <p style={{ fontSize: '18px', color: '#555', lineHeight: '1.6' }}>
          Bu proje, MERN Stack (MongoDB, Express, React, Node.js) kullanılarak geliştirilen kapsamlı bir Spor Salonu Yönetim Sistemidir.
        </p>
        
        <div style={{ marginTop: '30px', padding: '20px', backgroundColor: 'white', borderRadius: '10px', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}>
          <h4 style={{ marginBottom: '15px' }}>Geliştirici Bilgileri</h4>
          <p style={{ margin: '5px 0' }}><strong>İsim:</strong> Eren Özgül</p>
          <p style={{ margin: '5px 0' }}><strong>Öğrenci No:</strong> 231201041</p>
          <p style={{ margin: '5px 0' }}><strong>Üniversite:</strong> İstanbul Rumeli Üniversitesi - Bilgisayar Mühendisliği</p>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default About;