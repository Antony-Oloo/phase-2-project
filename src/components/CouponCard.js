import React from 'react';
import { Link } from 'react-router-dom';

function CouponCard({ coupon }) {
  const logoUrl = `/images/${coupon.brand}-logo.png`;

  return (
    <div className="coupon-card">
      <img src={logoUrl} alt={`${coupon.brand} logo`} className="coupon-logo" />
      <h3 className="coupon-code">{coupon.code}</h3>
      <p className="coupon-discount">{coupon.discount}% Off</p>
      <p className="coupon-expiry">Expires: {coupon.expiry}</p>
      <Link to={`/coupons/${coupon.id}`} className="coupon-link">View Details</Link>
    </div>
  );
}

export default CouponCard; 
