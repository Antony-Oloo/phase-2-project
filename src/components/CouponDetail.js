import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function CouponDetail() {
  const { id } = useParams(); // Get the coupon ID from the URL
  const [coupon, setCoupon] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Ensure the ID is a string to avoid issues with numeric IDs
    const fetchId = id.toString();

    // Use the coupon ID to fetch data from the API
    fetch(`http://localhost:5000/coupons/${fetchId}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Failed to fetch coupon: ${res.statusText}`);
        }
        return res.json();
      })
      .then((data) => {
        setCoupon(data); // Set coupon data if fetch is successful
      })
      .catch((err) => {
        setError(err.message); // Set error if something goes wrong
      });
  }, [id]); // Re-fetch when the ID changes

  // Show error if there is an issue
  if (error) return <div>Error: {error}</div>;

  // Show loading message if coupon data hasn't been fetched yet
  if (!coupon) return <div>Loading...</div>;

  // Show coupon details if data is successfully fetched
  return (
    <div>
      <h3>{coupon.code}</h3>
      <p>{coupon.discount}% off</p>
      <p>Expiry: {coupon.expiry}</p>
      <p>Brand: {coupon.brand}</p>
      <p>{coupon.description}</p>
      <img src={coupon.image} alt={`${coupon.brand} coupon`} />
    </div>
  );
}

export default CouponDetail;