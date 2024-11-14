import React, { useState, useEffect } from 'react';
import CouponCard from './CouponCard';  // Now importing the default export

function CouponList() {
  const [coupons, setCoupons] = useState([]);

  useEffect(() => {
    fetch('https://phase-2-project-d3jv.onrender.com/coupons')
      .then((res) => res.json())
      .then((data) => setCoupons(data));
  }, []);
  
  return (
    <div>
      <h2>Available Coupons</h2>
      <div className="coupon-list">
        {coupons.map((coupon) => (
          <CouponCard key={coupon.id} coupon={coupon} />
        ))}
      </div>
    </div>
  );
}

export default CouponList;
