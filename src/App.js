import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import CouponList from './components/CouponList';
import CouponForm from './components/CouponForm';
import CouponDetail from './components/CouponDetail';
import About from './components/About';
import './App.css';  


function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<CouponList />} /> 
          <Route path="/add" element={<CouponForm />} /> 
          <Route path="/coupons/:id" element={<CouponDetail />} /> |
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;