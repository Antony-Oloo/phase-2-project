import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { QRCodeCanvas } from 'qrcode.react'; // Use the named export

function CouponDetail() {
  const { id } = useParams();
  const [coupon, setCoupon] = useState(null);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [qrCode, setQrCode] = useState("");

  useEffect(() => {
    fetch(`https://phase-2-project-d3jv.onrender.com/coupons/${id}`)
      .then(res => {
        if (!res.ok) {
          throw new Error(`Failed to fetch coupon: ${res.statusText}`);
        }
        return res.json();
      })
      .then(data => setCoupon(data))
      .catch(err => setError(err.message));
  }, [id]);

  if (error) return <div>Error: {error}</div>;
  if (!coupon) return <div>Loading...</div>;

  const generateRandomCode = () => {
    const randomCode = Math.random().toString(36).substring(2, 15);
    setQrCode(randomCode);
    setShowModal(true);
  };

  return (
    <div>
      <h3>{coupon.code}</h3>
      <p>{coupon.discount}% off</p>
      <p>Expires: {coupon.expiry}</p>
      <p>{coupon.description}</p>

      <button onClick={generateRandomCode}>Get Coupon</button>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setShowModal(false)}>&times;</span>
            <h4>Scan to Claim Discount</h4>
            <QRCodeCanvas value={qrCode} size={256} /> {/* Updated to QRCodeCanvas */}
            <p>Your unique code: {qrCode}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default CouponDetail;
