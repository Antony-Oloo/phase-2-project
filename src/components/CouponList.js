import React, { useState, useEffect } from 'react';
import CouponCard from './CouponCard';

function CouponList() {
  const [coupons, setCoupons] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/coupons')
      .then(res => res.json())
      .then(data => setCoupons(data));
  }, []);

  return (
    <div className="coupon-list">
      <h2>Available Coupons</h2>
      <div className="coupon-cards">
        {coupons.map(coupon => (
          <CouponCard key={coupon.id} coupon={coupon} />
        ))}
      </div>
    </div>
  );
}

export default CouponList;