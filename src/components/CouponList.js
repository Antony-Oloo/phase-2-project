import React, { useState, useEffect } from 'react';
import CouponCard from './CouponCard';

function CouponList() {
  const [coupons, setCoupons] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5555/coupons')
      .then((res) => res.json())
      .then((data) => setCoupons(data));
  }, []);

  return (
    <div className="coupon-list-container">
      <h2 className="centered-title">Available Coupons from Favorite Stores</h2>
      <div className="coupon-list-grid">
        {coupons.map((coupon) => (
          <CouponCard key={coupon.id} coupon={coupon} />
        ))}
      </div>
    </div>
  );
}

export default CouponList;

