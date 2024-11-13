import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import CouponList from './components/CouponList';
import CouponForm from './components/CouponForm';
import CouponDetail from './components/CouponDetail';
import About from './components/About';
import Login from './components/Login';
import './App.css'; 

function App() {
  const [isAdmin, setIsAdmin] = useState(false); // Admin login state

  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<CouponList />} /> 
          {/* Only allow access to /add if the user is an admin */}
          <Route path="/add" element={isAdmin ? <CouponForm /> : <Login setIsAdmin={setIsAdmin} />} />
          <Route path="/coupons/:id" element={<CouponDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login setIsAdmin={setIsAdmin} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;