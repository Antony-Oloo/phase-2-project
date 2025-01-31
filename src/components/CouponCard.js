import React from 'react';
import { Link } from 'react-router-dom';

function CouponCard({ coupon }) {
  return (
    <div className="coupon-card">
      <h3 className="coupon-code">{coupon.code}</h3>
      <p className="coupon-discount">{coupon.discount}% Off</p>
      <p className="coupon-expiry">Expires: {coupon.expiry}</p>
      <p className="coupon-description">{coupon.description}</p>
      <p className="coupon-store"><strong>Store:</strong> {coupon.store?.name || 'N/A'}</p>
      <Link to={`/coupons/${coupon.id}`} className="coupon-link">View Details</Link>
    </div>
  );
}

export default CouponCard;


