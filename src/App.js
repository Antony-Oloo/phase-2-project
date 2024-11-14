import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import CouponList from './components/CouponList';
import CouponForm from './components/CouponForm';
import CouponDetail from './components/CouponDetail';
import About from './components/About';
import Login from './components/Login';
import AdminDashboard from './components/AdminDashboard'; // Import AdminDashboard
import './App.css'; 

function App() {
  const [isAdmin, setIsAdmin] = useState(false); // Admin login state

  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<CouponList />} /> 
          <Route path="/coupons/:id" element={<CouponDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login setIsAdmin={setIsAdmin} />} />

          {/* Admin-Only Routes */}
          <Route 
            path="/add" 
            element={isAdmin ? <CouponForm /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/admin-dashboard" 
            element={isAdmin ? <AdminDashboard /> : <Navigate to="/login" />} 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
