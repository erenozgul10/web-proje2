import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Measurements = () => {
  const [olcumler, setOlcumler] = useState({ boy: '', kilo: '', yag: '', bel: '', omuz: '', sirt: '' });

  // SAYFA AÇILINCA VERİLERİ ÇEK (GET)
  useEffect(() => {
    const token = localStorage.getItem('token');
    fetch('http://localhost:5000/api/data', {
      headers: { 'Authorization': `Bearer ${token}` }
    })
    .then(res => res.json())
    .then(data => { if(data && data.olcumler && Object.keys(data.olcumler).length > 0) setOlcumler(data.olcumler); })
    .catch(err => console.log(err));
  }, []);

  const handleChange = (e) => {
    setOlcumler({ ...olcumler, [e.target.name]: e.target.value });
  };

  // ÖLÇÜMLERİ GÜNCELLE (PUT) VE TOAST GÖSTER
  const olcumleriKaydet = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      const res = await fetch('http://localhost:5000/api/data/olcum', {
        method: 'PUT', 
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(olcumler)
      });
      
      if (res.ok) {
        const guncelOlcumler = await res.json();
        setOlcumler(guncelOlcumler);
        
        // İŞTE EFSANE TOAST MESAJI
        toast.success('Ölçümler başarıyla güncellendi! 💪', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "colored",
        });
      } else {
        toast.error('Güncelleme başarısız oldu!');
      }

    } catch (error) { 
      toast.error('Sunucu ile bağlantı kurulamadı!');
      console.error(error); 
    }
  };

  return (
    <div style={{ flex: '1', minWidth: '320px', backgroundColor: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}>
      
      {/* TOAST MESAJLARININ EKRANDA ÇIKMASINI SAĞLAYAN MOTOR */}
      <ToastContainer /> 
      
      <h3 style={{ color: '#212529', borderBottom: '2px solid #eee', paddingBottom: '10px', marginBottom: '15px' }}>📐 Vücut Ölçümleri</h3>
      <form onSubmit={olcumleriKaydet}>
        <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
          <input type="number" name="boy" placeholder="Boy (cm)" value={olcumler.boy || ''} onChange={handleChange} style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ced4da' }} />
          <input type="number" name="kilo" placeholder="Kilo (kg)" value={olcumler.kilo || ''} onChange={handleChange} style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ced4da' }} />
        </div>
        <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
          <input type="number" name="yag" placeholder="Yağ Oranı (%)" value={olcumler.yag || ''} onChange={handleChange} style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ced4da' }} />
          <input type="number" name="bel" placeholder="Bel Genişliği (cm)" value={olcumler.bel || ''} onChange={handleChange} style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ced4da' }} />
        </div>
        <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
          <input type="number" name="omuz" placeholder="Omuz Genişliği (cm)" value={olcumler.omuz || ''} onChange={handleChange} style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ced4da' }} />
          <input type="number" name="sirt" placeholder="Sırt Genişliği (cm)" value={olcumler.sirt || ''} onChange={handleChange} style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ced4da' }} />
        </div>
        
        <button type="submit" style={{ width: '100%', padding: '12px', backgroundColor: '#6f42c1', color: 'white', border: 'none', borderRadius: '5px', fontWeight: 'bold', cursor: 'pointer' }}>
          Ölçümleri Güncelle
        </button>
      </form>
    </div>
  );
};

export default Measurements;