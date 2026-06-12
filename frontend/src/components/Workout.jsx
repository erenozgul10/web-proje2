import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

const egzersizVerileri = {
  Kardiyo: [{ ad: 'Basketbol', carpan: 10 }, { ad: 'Koşu Bandı', carpan: 9 }, { ad: 'Bisiklet', carpan: 8 }, { ad: 'Merdiven', carpan: 11 }],
  Antrenman: [{ ad: 'Sırt Günü', carpan: 7 }, { ad: 'Bacak Günü', carpan: 8 }, { ad: 'Full Body', carpan: 9 }, { ad: 'Göğüs Günü', carpan: 6 }, { ad: 'Biceps Günü', carpan: 5 }, { ad: 'Arka Kol Günü', carpan: 5 }]
};

const Workout = () => {
  const [kategori, setKategori] = useState('Kardiyo');
  const [egzersiz, setEgzersiz] = useState('Basketbol');
  const [sure, setSure] = useState('');
  const [notlar, setNotlar] = useState('');
  const [kayitlar, setKayitlar] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    // 1. DEĞİŞEN YER (GET)
    fetch('https://web-proje2.onrender.com/api/data/antrenman', { headers: { 'Authorization': `Bearer ${token}` } })
      .then(res => res.json())
      .then(data => setKayitlar(data))
      .catch(err => console.log(err));
  }, []);

  const antrenmanKaydet = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const aktifEgzersiz = egzersizVerileri[kategori].find(e => e.ad === egzersiz);
    const yakilanKalori = sure ? (sure * aktifEgzersiz.carpan) : 0;
    
    try {
      // 2. DEĞİŞEN YER (POST)
      const res = await fetch('https://web-proje2.onrender.com/api/data/antrenman', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ tip: egzersiz, sure, kalori: yakilanKalori, notlar })
      });
      const eklenenData = await res.json();
      setKayitlar([eklenenData, ...kayitlar]);
      setSure(''); setNotlar('');
      toast.success('🏃‍♂️ Antrenman başarıyla eklendi!', { theme: "colored" });
    } catch (error) { toast.error('Hata oluştu!'); }
  };

  const antrenmanSil = async (id) => {
    if (!window.confirm("Bu kaydı silmek istediğinize emin misiniz?")) return;
    const token = localStorage.getItem('token');
    try {
      // 3. DEĞİŞEN YER (DELETE)
      await fetch(`https://web-proje2.onrender.com/api/data/antrenman/${id}`, { method: 'DELETE', headers: { 'Authorization': `Bearer ${token}` } });
      setKayitlar(kayitlar.filter(kayit => kayit._id !== id));
      toast.error('🗑️ Antrenman silindi!', { theme: "colored" });
    } catch (error) { console.error(error); }
  };

  return (
    <div style={{ flex: '1', minWidth: '320px', backgroundColor: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}>
      <h3 style={{ color: '#212529', borderBottom: '2px solid #eee', paddingBottom: '10px', marginBottom: '15px' }}>🏃‍♂️ Kardiyo ve Antrenmanlarım</h3>
      <form onSubmit={antrenmanKaydet}>
        <select value={kategori} onChange={(e) => { setKategori(e.target.value); setEgzersiz(egzersizVerileri[e.target.value][0].ad); }} style={{ width: '100%', padding: '10px', borderRadius: '5px', marginBottom: '10px' }}>
          <option value="Kardiyo">🏃 Kardiyo</option><option value="Antrenman">🏋️ Ağırlık Antrenmanı</option>
        </select>
        <select value={egzersiz} onChange={(e) => setEgzersiz(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '5px', marginBottom: '10px' }}>
          {egzersizVerileri[kategori].map((item, index) => <option key={index} value={item.ad}>{item.ad}</option>)}
        </select>
        <input type="number" placeholder="Süre (Dakika)" value={sure} onChange={(e) => setSure(e.target.value)} required style={{ width: '100%', padding: '10px', borderRadius: '5px', marginBottom: '10px' }} />
        <input type="text" placeholder="Notlar" value={notlar} onChange={(e) => setNotlar(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '5px', marginBottom: '15px' }} />
        <button type="submit" style={{ width: '100%', padding: '12px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px', fontWeight: 'bold', cursor: 'pointer' }}>Antrenmanı Kaydet</button>
      </form>
      {kayitlar.length > 0 && (
        <ul style={{ listStyleType: 'none', padding: 0, marginTop: '20px' }}>
          {kayitlar.map((kayit) => (
            <li key={kayit._id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 10px', backgroundColor: '#f8f9fa', borderLeft: '4px solid #28a745', marginBottom: '8px', borderRadius: '4px' }}>
              <div><strong>{kayit.tip}</strong> <small>({kayit.sure} dk)</small><br/><span style={{ color: '#dc3545', fontWeight: 'bold', fontSize: '12px' }}>🔥 {kayit.kalori} kcal</span></div>
              <button onClick={() => antrenmanSil(kayit._id)} style={{ backgroundColor: '#dc3545', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '5px', cursor: 'pointer' }}>🗑️ Sil</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
export default Workout;