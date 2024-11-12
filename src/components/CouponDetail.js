import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function CouponDetail() {
  const { id } = useParams();
  const [coupon, setCoupon] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/coupons/${id}`)
      .then(res => res.json())
      .then(data => setCoupon(data));
  }, [id]);

  if (!coupon) return <div>Loading...</div>;

  return (
    <div>
      <h3>{coupon.code}</h3>
      <p>{coupon.discount}% off</p>
      <p>Expiry: {coupon.expiry}</p>
    </div>
  );
}

export default CouponDetail;