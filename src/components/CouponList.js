import React, { useEffect, useState } from 'react';

function CouponList() {
    const [coupons, setCoupons] = useState([]);
    const [editCoupon, setEditCoupon] = useState(null);
    const [formData, setFormData] = useState({ code: '', discount: '', expiry: '', description: '', store_id: '' });

    useEffect(() => {
        fetchCoupons();
    }, []);

    const fetchCoupons = () => {
        fetch('http://localhost:5555/coupons')
            .then((res) => res.json())
            .then((data) => setCoupons(data));
    };

    const handleDelete = (id) => {
        fetch(`http://localhost:5555/coupons/${id}`, { method: 'DELETE' })
            .then((res) => {
                if (res.ok) {
                    setCoupons(coupons.filter((coupon) => coupon.id !== id));
                } else {
                    console.error('Failed to delete coupon');
                }
            })
            .catch((error) => console.error('Delete error:', error));
    };

    const handleEdit = (coupon) => {
        setEditCoupon(coupon);
        setFormData({
            code: coupon.code,
            discount: coupon.discount,
            expiry: coupon.expiry,
            description: coupon.description,
            store_id: coupon.store_id
        });
    };

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();

        fetch(`http://localhost:5555/coupons/${editCoupon.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
            .then((res) => {
                if (!res.ok) {
                    return res.json().then((error) => {
                        throw new Error(error.message || 'Failed to update coupon');
                    });
                }
                return res.json();
            })
            .then((updatedCoupon) => {
                setCoupons(coupons.map((coupon) => (coupon.id === updatedCoupon.id ? updatedCoupon : coupon)));
                setEditCoupon(null);
                setFormData({ code: '', discount: '', expiry: '', description: '', store_id: '' });
            })
            .catch((error) => console.error('Update error:', error));
    };

    return (
        <div className="coupon-list">
            <h2>Available Coupons</h2>

            {editCoupon && (
                <form onSubmit={handleFormSubmit}>
                    <h3>Edit Coupon</h3>
                    <input type="text" name="code" value={formData.code} onChange={handleFormChange} required />
                    <input type="number" name="discount" value={formData.discount} onChange={handleFormChange} required />
                    <input type="date" name="expiry" value={formData.expiry} onChange={handleFormChange} required />
                    <textarea name="description" value={formData.description} onChange={handleFormChange} />
                    <input type="number" name="store_id" value={formData.store_id} onChange={handleFormChange} required />
                    <button type="submit">Save Changes</button>
                </form>
            )}

            {coupons.map((coupon) => (
                <div key={coupon.id} className="coupon-card">
                    <h3>{coupon.code}</h3>
                    <p>Discount: {coupon.discount}%</p>
                    <p>Expiry: {coupon.expiry}</p>
                    <p>Description: {coupon.description}</p>
                    <button onClick={() => handleEdit(coupon)}>Edit</button>
                    <button onClick={() => handleDelete(coupon.id)}>Delete</button>
                </div>
            ))}
        </div>
    );
}

export default CouponList;
