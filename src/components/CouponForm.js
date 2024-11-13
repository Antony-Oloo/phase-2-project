import React, { useState } from 'react';

function CouponForm({ addCoupon }) {
  const [coupon, setCoupon] = useState({ code: '', discount: '', expiry: '', brand: '' });

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
      .then((res) => res.json())
      .then((data) => {
        addCoupon(data); // Update the parent state to show the new coupon
        setCoupon({ code: '', discount: '', expiry: '', brand: '' }); // Reset form
      })
      .catch((error) => console.error('Error adding coupon:', error));
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="code"
        value={coupon.code}
        onChange={handleChange}
        placeholder="Coupon Code"
        required
      />
      <input
        type="number"
        name="discount"
        value={coupon.discount}
        onChange={handleChange}
        placeholder="Discount %"
        required
      />
      <input
        type="date"
        name="expiry"
        value={coupon.expiry}
        onChange={handleChange}
        placeholder="Expiry Date"
        required
      />
      <input
        type="text"
        name="brand"
        value={coupon.brand}
        onChange={handleChange}
        placeholder="Brand Name"
        required
      />
      <button type="submit">Add Coupon</button>
    </form>
  );
}

export default CouponForm;