import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function CouponDetail() {
  const { id } = useParams();
  const [coupon, setCoupon] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5555/coupons/${id}`)
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch coupon details');
        return res.json();
      })
      .then(data => setCoupon(data))
      .catch(err => setError(err.message));
  }, [id]);

  if (error) return <div>Error: {error}</div>;
  if (!coupon) return <div>Loading...</div>;

  return (
    <div className="coupon-detail">
      <h3>{coupon.code}</h3>
      <p>{coupon.discount}% off</p>
      <p>Expires: {coupon.expiry}</p>
      <p>{coupon.description}</p>
      <p><strong>Store:</strong> {coupon.store?.name || 'N/A'}</p>
    </div>
  );
}

export default CouponDetail;
