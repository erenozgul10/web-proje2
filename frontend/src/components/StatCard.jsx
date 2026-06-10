import React from 'react';

// Dışarıdan başlık, değer, ikon ve renk alan dinamik component!
const StatCard = ({ baslik, deger, ikon, renk }) => {
  return (
    <div style={{ 
      flex: 1, 
      minWidth: '220px', 
      backgroundColor: 'white', 
      padding: '20px', 
      borderRadius: '10px', 
      boxShadow: '0 4px 10px rgba(0,0,0,0.1)', 
      display: 'flex', 
      alignItems: 'center', 
      gap: '20px',
      borderLeft: `5px solid ${renk}` // Sol tarafa jilet gibi renkli çizgi
    }}>
      <div style={{ fontSize: '40px' }}>
        {ikon}
      </div>
      <div>
        <h4 style={{ margin: 0, color: '#6c757d', fontSize: '14px', fontWeight: 'normal' }}>{baslik}</h4>
        <h2 style={{ margin: '5px 0 0 0', color: '#212529', fontSize: '24px' }}>{deger}</h2>
      </div>
    </div>
  );
};

export default StatCard;