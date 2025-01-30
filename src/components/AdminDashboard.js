import React, { useEffect, useState } from 'react';

function AdminDashboard() {
  const [coupons, setCoupons] = useState([]);
  const [newCoupon, setNewCoupon] = useState({
    code: '',
    discount: '',
    expiry: '',
    description: '',
    store_id: '',
  });

  useEffect(() => {
    fetch('http://localhost:5555/coupons')
      .then(res => res.json())
      .then(data => setCoupons(data))
      .catch(err => console.error("Failed to fetch coupons:", err));
  }, []);

  const handleAddCoupon = (e) => {
    e.preventDefault();
    fetch('http://localhost:5555/coupons', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newCoupon),
    })
      .then(res => res.json())
      .then(newCouponData => {
        setCoupons([...coupons, newCouponData]);
        setNewCoupon({ code: '', discount: '', expiry: '', description: '', store_id: '' });
      })
      .catch(err => console.error("Failed to add coupon:", err));
  };

  const handleDeleteCoupon = (id) => {
    fetch(`http://localhost:5555/coupons/${id}`, {
      method: 'DELETE',
    })
      .then(() => setCoupons(coupons.filter(coupon => coupon.id !== id)))
      .catch(err => console.error("Failed to delete coupon:", err));
  };

  return (
    <div className="admin-dashboard">
      <h2 className="dashboard-title">Admin Dashboard</h2>
      <div className="add-coupon-section">
        <form onSubmit={handleAddCoupon} className="coupon-form">
          <input type="text" placeholder="Code" value={newCoupon.code} onChange={(e) => setNewCoupon({ ...newCoupon, code: e.target.value })} />
          <input type="number" placeholder="Discount" value={newCoupon.discount} onChange={(e) => setNewCoupon({ ...newCoupon, discount: e.target.value })} />
          <input type="date" placeholder="Expiry Date" value={newCoupon.expiry} onChange={(e) => setNewCoupon({ ...newCoupon, expiry: e.target.value })} />
          <textarea placeholder="Description" value={newCoupon.description} onChange={(e) => setNewCoupon({ ...newCoupon, description: e.target.value })} />
          <input type="text" placeholder="Store ID" value={newCoupon.store_id} onChange={(e) => setNewCoupon({ ...newCoupon, store_id: e.target.value })} />
          <button type="submit">Add Coupon</button>
        </form>
      </div>
      <h3>Available Coupons</h3>
      <div className="coupon-list">
        {coupons.map(coupon => (
          <div key={coupon.id} className="coupon-card">
            <p><strong>Code:</strong> {coupon.code}</p>
            <p><strong>Discount:</strong> {coupon.discount}%</p>
            <p><strong>Expiry:</strong> {coupon.expiry}</p>
            <p><strong>Description:</strong> {coupon.description}</p>
            <p><strong>Store:</strong> {coupon.store?.name || 'N/A'}</p>
            <button onClick={() => handleDeleteCoupon(coupon.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminDashboard;

