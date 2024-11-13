import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function CouponDetail() {
  const { id } = useParams();
  const [coupon, setCoupon] = useState(null);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    fetch(`http://localhost:5000/coupons/${id}`)
      .then(res => {
        if (!res.ok) {
          throw new Error(`Failed to fetch coupon: ${res.statusText}`);
        }
        return res.json();
      })
      .then(data => setCoupon(data))
      .catch(err => setError(err.message));
  }, [id]);

  // If there's an error, show it
  if (error) return <div>Error: {error}</div>;

  // Show loading message if coupon data is not yet fetched
  if (!coupon) return <div>Loading...</div>;

  // Show coupon details once fetched
  return (
    <div>
      <h3>{coupon.code}</h3>
      <p>{coupon.discount}% off</p>
      <p>Expiry: {coupon.expiry}</p>
    </div>
  );
}

export default CouponDetail;