import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

const Diet = () => {
  const [ogunAdi, setOgunAdi] = useState('');
  const [kalori, setKalori] = useState('');
  const [kayitlar, setKayitlar] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    fetch('http://localhost:5000/api/data/diyet', { headers: { 'Authorization': `Bearer ${token}` } })
      .then(res => res.json())
      .then(data => setKayitlar(data))
      .catch(err => console.log(err));
  }, []);

  const ogunEkle = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      const res = await fetch('http://localhost:5000/api/data/diyet', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ ad: ogunAdi, kalori: parseInt(kalori) })
      });
      const eklenenData = await res.json();
      setKayitlar([eklenenData, ...kayitlar]);
      setOgunAdi(''); setKalori('');
      toast.success('🥗 Öğün başarıyla eklendi!', { theme: "colored" });
    } catch (error) { toast.error('Hata oluştu!'); }
  };

  const diyetSil = async (id) => {
    if (!window.confirm("Bu kaydı silmek istediğinize emin misiniz?")) return;
    const token = localStorage.getItem('token');
    try {
      await fetch(`http://localhost:5000/api/data/diyet/${id}`, { method: 'DELETE', headers: { 'Authorization': `Bearer ${token}` } });
      setKayitlar(kayitlar.filter(kayit => kayit._id !== id));
      toast.error('🗑️ Öğün silindi!', { theme: "colored" });
    } catch (error) { console.error(error); }
  };

  return (
    <div style={{ flex: '1', minWidth: '320px', backgroundColor: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}>
      <h3 style={{ color: '#212529', borderBottom: '2px solid #eee', paddingBottom: '10px', marginBottom: '15px' }}>🥗 Günlük Kalori ve Beslenme</h3>
      <form onSubmit={ogunEkle}>
        <input type="text" placeholder="Öğün Adı" value={ogunAdi} onChange={(e) => setOgunAdi(e.target.value)} required style={{ width: '100%', padding: '10px', borderRadius: '5px', marginBottom: '10px' }} />
        <input type="number" placeholder="Alınan Kalori (kcal)" value={kalori} onChange={(e) => setKalori(e.target.value)} required style={{ width: '100%', padding: '10px', borderRadius: '5px', marginBottom: '15px' }} />
        <button type="submit" style={{ width: '100%', padding: '12px', backgroundColor: '#ffc107', color: '#212529', border: 'none', borderRadius: '5px', fontWeight: 'bold', cursor: 'pointer' }}>Öğünü Ekle</button>
      </form>
      {kayitlar.length > 0 && (
        <ul style={{ listStyleType: 'none', padding: 0, marginTop: '20px' }}>
          {kayitlar.map((kayit) => (
            <li key={kayit._id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 10px', backgroundColor: '#f8f9fa', borderLeft: '4px solid #ffc107', marginBottom: '8px', borderRadius: '4px' }}>
              <span style={{ fontWeight: 'bold' }}>{kayit.ad}</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ color: '#28a745', fontWeight: 'bold', fontSize: '14px' }}>+ {kayit.kalori} kcal</span>
                <button onClick={() => diyetSil(kayit._id)} style={{ backgroundColor: '#dc3545', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '5px', cursor: 'pointer' }}>🗑️ Sil</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
export default Diet;