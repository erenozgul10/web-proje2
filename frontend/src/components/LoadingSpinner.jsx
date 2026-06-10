import React from 'react';

const LoadingSpinner = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px' }}>
      {/* CSS Animasyonu ile dönen çember */}
      <div style={{ 
        width: '50px', 
        height: '50px', 
        border: '5px solid #f3f3f3', 
        borderTop: '5px solid #007bff', 
        borderRadius: '50%', 
        animation: 'spin 1s linear infinite' 
      }}></div>
      <p style={{ marginTop: '15px', color: '#6c757d', fontWeight: 'bold' }}>Veriler Yükleniyor...</p>
      
      {/* Sayfaya ufak bir animasyon stili enjekte ediyoruz */}
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
};

export default LoadingSpinner;