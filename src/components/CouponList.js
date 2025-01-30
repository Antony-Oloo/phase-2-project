import React, { useState, useEffect } from 'react';
import CouponCard from './CouponCard';  // Import CouponCard component

function CouponList() {
  const [coupons, setCoupons] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5555/coupons')
      .then((res) => res.json())
      .then((data) => {
        console.log('Fetched coupons:', data);  // Debugging log to ensure data is fetched
        setCoupons(data);
      })
      .catch((err) => console.error('Error fetching coupons:', err));
  }, []);

  return (
    <div className="centered-page">
      <div className="container">
        <h2 className="centered-title">Available Coupons from Favorite Brands</h2>
        <div className="coupon-list">
          {coupons.length === 0 ? (
            <p className="no-coupons-text">No coupons available</p>
          ) : (
            coupons.map((coupon) => (
              <CouponCard key={coupon.id} coupon={coupon} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default CouponList;

