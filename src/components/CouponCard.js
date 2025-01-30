import React from 'react';
import { Link } from 'react-router-dom';

function CouponCard({ coupon }) {
  return (
    <div className="coupon-card">
      <h3>{coupon.code}</h3>
      <p>{coupon.discount}% Off</p>
      <p>Expires: {coupon.expiry}</p>
      <p>Store: {coupon.store?.name || 'N/A'}</p>
      <Link to={`/coupons/${coupon.id}`}>View Details</Link>
    </div>
  );
}

export default CouponCard;
