import React, { useState } from 'react';

function CouponForm({ addCoupon }) {
  const [coupon, setCoupon] = useState({ code: '', discount: '', expiry: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCoupon({ ...coupon, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newCoupon = { ...coupon };
    fetch('http://localhost:5000/coupons', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newCoupon),
    })
      .then(res => res.json())
      .then(data => {
        addCoupon(data);  // Update state in parent component
        setCoupon({ code: '', discount: '', expiry: '' }); // Reset form
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="code"
        value={coupon.code}
        onChange={handleChange}
        placeholder="Coupon Code"
      />
      <input
        type="number"
        name="discount"
        value={coupon.discount}
        onChange={handleChange}
        placeholder="Discount %"
      />
      <input
        type="date"
        name="expiry"
        value={coupon.expiry}
        onChange={handleChange}
        placeholder="Expiry Date"
      />
      <button type="submit">Add Coupon</button>
    </form>
  );
}

export default CouponForm;