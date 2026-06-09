import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Diet = () => {
  const [diets, setDiets] = useState([]);
  const [ogunAdi, setOgunAdi] = useState('');
  const [kalori, setKalori] = useState('');
  
  const kullaniciId = localStorage.getItem('kullaniciId');
  const token = localStorage.getItem('token');
  const config = { headers: { Authorization: `Bearer ${token}` } };

  const ogunleriGetir = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/diets/${kullaniciId}`, config);
      setDiets(res.data);
    } catch (err) { console.error(err); }
  };

  useEffect(() => { ogunleriGetir(); }, []);

  const ekle = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/diets', { kullaniciId, ogunAdi, kalori }, config);
      setOgunAdi(''); setKalori('');
      ogunleriGetir();
    } catch (err) { alert('Öğün eklenirken hata olustu!'); }
  };

  const sil = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/diets/${id}`, config);
      ogunleriGetir();
    } catch (err) { alert('Silme isleminde hata!'); }
  };

  return (
    <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)', flex: 1, margin: '10px', minWidth: '300px' }}>
      <h3>🥗 Günlük Kalori ve Beslenme</h3>
      <form onSubmit={ekle} style={{ marginTop: '15px' }}>
        <input placeholder="Öğün Adı (Örn: Yulaf Ezmesi)" required value={ogunAdi} onChange={(e) => setOgunAdi(e.target.value)} style={{ width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '5px', border: '1px solid #ccc' }} />
        <input placeholder="Alınan Kalori (kcal)" type="number" required value={kalori} onChange={(e) => setKalori(e.target.value)} style={{ width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '5px', border: '1px solid #ccc' }} />
        <button type="submit" style={{ backgroundColor: '#ffc107', color: '#333', fontWeight: 'bold' }}>Öğünü Ekle</button>
      </form>
      
      <ul style={{ listStyle: 'none', padding: 0, marginTop: '20px' }}>
        {diets.map(d => (
          <li key={d._id} style={{ borderBottom: '1px solid #eee', padding: '15px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <strong style={{ color: '#333' }}>{d.ogunAdi}</strong> <br/> 
              <small style={{ color: '#888', fontWeight: 'bold' }}>{d.kalori} kcal</small>
            </div>
            <button onClick={() => sil(d._id)} style={{ backgroundColor: '#dc3545', width: 'auto', padding: '5px 15px', marginTop: 0 }}>Sil</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Diet;