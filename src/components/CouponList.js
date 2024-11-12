import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function CouponList() {
  const [coupons, setCoupons] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/coupons')
      .then(res => res.json())
      .then(data => setCoupons(data));
  }, []);

  return (
    <div>
      <h2>Available Coupons</h2>
      <ul>
        {coupons.map(coupon => (
          <li key={coupon.id}>
            <Link to={`/coupons/${coupon.id}`}>{coupon.code} - {coupon.discount}% Off</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CouponList;