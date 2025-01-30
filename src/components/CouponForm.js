import React, { useState } from 'react';

function CouponForm({ addCoupon }) {
  const [coupon, setCoupon] = useState({ code: '', discount: '', expiry: '', description: '', brand: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCoupon({ ...coupon, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch('http://localhost:5555/coupons', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(coupon),
    })
      .then((res) => res.json())
      .then((data) => {
        addCoupon(data);
        setCoupon({ code: '', discount: '', expiry: '', description: '', brand: '' });
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
      <textarea
        name="description"
        value={coupon.description}
        onChange={handleChange}
        placeholder="Description"
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
