import React, { useState } from 'react';
import { toast } from 'react-toastify';

const WaterTracker = () => {
  const [water, setWater] = useState(0);
  const goal = 2500; // Günlük 2.5 Litre Hedef

  const addWater = (amount) => {
    const newWater = water + amount;
    setWater(newWater);
    
    toast.info(`💧 +${amount} ml su eklendi!`, { theme: "colored" });
    
    if (newWater >= goal && water < goal) {
      toast.success("🏆 Tebrikler! Günlük su hedefine ulaştın!", { theme: "colored" });
    }
  };

  return (
    <div style={{ flex: '1', minWidth: '320px', backgroundColor: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}>
      <h3 style={{ color: '#212529', borderBottom: '2px solid #eee', paddingBottom: '10px', marginBottom: '15px' }}>💧 Günlük Su Takibi</h3>
      
      <div style={{ textAlign: 'center' }}>
        <h2 style={{ color: '#007bff', fontSize: '32px', margin: '10px 0' }}>{water} / {goal} ml</h2>
        
        {/* İlerleme Çubuğu (Progress Bar) */}
        <div style={{ backgroundColor: '#e9ecef', borderRadius: '10px', height: '20px', width: '100%', marginBottom: '20px', overflow: 'hidden' }}>
          <div style={{ backgroundColor: '#007bff', width: `${Math.min((water / goal) * 100, 100)}%`, height: '100%', transition: 'width 0.5s ease-in-out' }}></div>
        </div>
        
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button onClick={() => addWater(250)} style={{ padding: '10px', backgroundColor: '#e0f7fa', color: '#007bff', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold', flex: '1' }}>+ 1 Bardak</button>
          <button onClick={() => addWater(500)} style={{ padding: '10px', backgroundColor: '#b2ebf2', color: '#007bff', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold', flex: '1' }}>+ 1 Şişe</button>
          <button onClick={() => setWater(0)} style={{ padding: '10px', backgroundColor: '#ffebee', color: '#dc3545', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}>Sıfırla</button>
        </div>
      </div>
    </div>
  );
};

export default WaterTracker;