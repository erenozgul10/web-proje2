import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import About from './pages/About';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Ana siteye girenleri direkt login'e at */}
        <Route path="/" element={<Navigate to="/login" />} />
        
        {/* Serbest giriş sayfaları */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* Güvenliği kendi içlerinde olan panellerimiz */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
};

export default App;