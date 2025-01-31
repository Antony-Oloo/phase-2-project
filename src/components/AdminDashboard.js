import React, { useEffect, useState } from 'react';

function AdminDashboard() {
    const [coupons, setCoupons] = useState([]);
    const [formData, setFormData] = useState({ code: '', discount: '', expiry: '', description: '', store_id: '' });
    const [editCoupon, setEditCoupon] = useState(null);

    useEffect(() => {
        fetchCoupons();
    }, []);

    // Fetch coupons from the backend
    const fetchCoupons = () => {
        fetch('http://localhost:5555/coupons')
            .then((res) => res.json())
            .then((data) => setCoupons(data));
    };

    // Handle input changes for both add and edit forms
    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    // Handle adding a new coupon
    const handleAddCoupon = (e) => {
        e.preventDefault();

        fetch('http://localhost:5555/coupons', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
            .then((res) => {
                if (!res.ok) {
                    return res.json().then((error) => {
                        throw new Error(error.message || 'Failed to add coupon');
                    });
                }
                return res.json();
            })
            .then((newCoupon) => {
                setCoupons([...coupons, newCoupon]);  // Update the list with the new coupon
                setFormData({ code: '', discount: '', expiry: '', description: '', store_id: '' });  // Reset form
            })
            .catch((error) => console.error('Add error:', error));
    };

    // Handle editing an existing coupon
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

    // Handle updating an edited coupon
    const handleEditSubmit = (e) => {
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

    // Handle deleting a coupon
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

    return (
        <div className="admin-dashboard">
            <h2>Admin Dashboard</h2>

            {/* Add Coupon Form */}
            <form onSubmit={editCoupon ? handleEditSubmit : handleAddCoupon}>
                <h3>{editCoupon ? 'Edit Coupon' : 'Add New Coupon'}</h3>
                <input
                    type="text"
                    name="code"
                    value={formData.code}
                    onChange={handleFormChange}
                    placeholder="Coupon Code"
                    required
                />
                <input
                    type="number"
                    name="discount"
                    value={formData.discount}
                    onChange={handleFormChange}
                    placeholder="Discount Percentage"
                    required
                />
                <input
                    type="date"
                    name="expiry"
                    value={formData.expiry}
                    onChange={handleFormChange}
                    required
                />
                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleFormChange}
                    placeholder="Description"
                />
                <input
                    type="number"
                    name="store_id"
                    value={formData.store_id}
                    onChange={handleFormChange}
                    placeholder="Store ID"
                    required
                />
                <button type="submit">{editCoupon ? 'Save Changes' : 'Add Coupon'}</button>
            </form>

            {/* Coupons Display */}
            <div className="coupon-list">
                <h3>Available Coupons</h3>
                {coupons.map((coupon) => (
                    <div key={coupon.id} className="coupon-card">
                        <h4>{coupon.code}</h4>
                        <p>Discount: {coupon.discount}%</p>
                        <p>Expiry: {coupon.expiry}</p>
                        <p>Description: {coupon.description}</p>
                        <button onClick={() => handleEdit(coupon)}>Edit</button>
                        <button onClick={() => handleDelete(coupon.id)}>Delete</button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default AdminDashboard;
