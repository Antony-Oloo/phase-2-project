import React from 'react';
import { Link } from 'react-router-dom';

export function CouponCard({ coupon }) {
  return (
    <div className="coupon-card">
      <h3 className="coupon-code">{coupon.code}</h3>
      <p className="coupon-discount">{coupon.discount}% Off</p>
      <p className="coupon-expiry">Expires: {coupon.expiry}</p>
      <Link to={`/coupons/${coupon.id}`} className="coupon-link">View Details</Link>
    </div>
  );
}