import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function AdminDashboard() {
  const [coupons, setCoupons] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is an admin by getting "isAdmin" from localStorage
    const isAdmin = localStorage.getItem('isAdmin');
    if (isAdmin !== 'true') {
      // If not an admin, redirect to login page
      navigate('/login');
    }

    // Fetch coupons for the admin if they're logged in
    fetch('https://phase-2-project-d3jv.onrender.com/coupons')
      .then(res => res.json())
      .then(data => setCoupons(data))
      .catch(err => setError(err.message));
  }, [navigate]);

  if (error) return <div>Error: {error}</div>;

  return (
    <div className="admin-dashboard">
      <h2>Manage Coupons</h2>
      <div className="coupon-list">
        {coupons.map((coupon) => (
          <div key={coupon.id} className="coupon-card">
            <h3>{coupon.code}</h3>
            <p>{coupon.discount}% off</p>
            <p>Expires: {coupon.expiry}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminDashboard;