import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Workout = () => {
  const [workouts, setWorkouts] = useState([]);
  const [baslik, setBaslik] = useState('');
  const [sure, setSure] = useState('');
  const [notlar, setNotlar] = useState('');
  
  const kullaniciId = localStorage.getItem('kullaniciId');
  const token = localStorage.getItem('token');
  const config = { headers: { Authorization: `Bearer ${token}` } };

  // Veritabanından listeyi çeken fonksiyon
  const antrenmanlariGetir = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/workouts/${kullaniciId}`, config);
      setWorkouts(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => { antrenmanlariGetir(); }, []);

  // Yeni antrenman ekleme
  const ekle = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/workouts', { kullaniciId, baslik, sure, notlar }, config);
      setBaslik(''); setSure(''); setNotlar('');
      antrenmanlariGetir(); // Ekledikten sonra listeyi yenile
    } catch (err) { alert('Antrenman eklenirken hata olustu!'); }
  };

  // Antrenman silme
  const sil = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/workouts/${id}`, config);
      antrenmanlariGetir(); // Sildikten sonra listeyi yenile
    } catch (err) { alert('Silme isleminde hata!'); }
  };

  return (
    <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)', flex: 1, margin: '10px', minWidth: '300px' }}>
      <h3>🏃‍♂️ Kardiyo ve Antrenmanlarım</h3>
      <form onSubmit={ekle} style={{ marginTop: '15px' }}>
        <input placeholder="Örn: 45 Dk Koşu Bandı" required value={baslik} onChange={(e) => setBaslik(e.target.value)} style={{ width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '5px', border: '1px solid #ccc' }} />
        <input placeholder="Süre (Dakika)" type="number" required value={sure} onChange={(e) => setSure(e.target.value)} style={{ width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '5px', border: '1px solid #ccc' }} />
        <input placeholder="Notlar (Örn: Eğim seviyesi 5)" value={notlar} onChange={(e) => setNotlar(e.target.value)} style={{ width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '5px', border: '1px solid #ccc' }} />
        <button type="submit" style={{ backgroundColor: '#007bff' }}>Antrenmanı Kaydet</button>
      </form>
      
      <ul style={{ listStyle: 'none', padding: 0, marginTop: '20px' }}>
        {workouts.map(w => (
          <li key={w._id} style={{ borderBottom: '1px solid #eee', padding: '15px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <strong style={{ color: '#333' }}>{w.baslik}</strong> <span style={{ color: '#666' }}>({w.sure} dk)</span> <br/> 
              <small style={{ color: '#888' }}>{w.notlar}</small>
            </div>
            <button onClick={() => sil(w._id)} style={{ backgroundColor: '#dc3545', width: 'auto', padding: '5px 15px', marginTop: 0 }}>Sil</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Workout;