import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { QRCodeSVG } from 'qrcode.react'; // Correct import

function CouponDetail() {
  const { id } = useParams();
  const [coupon, setCoupon] = useState(null);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false); // To show or hide the modal
  const [qrCode, setQrCode] = useState(""); // Store the generated QR code

  useEffect(() => {
    fetch(`http://localhost:5000/coupons/${id}`)
      .then(res => {
        if (!res.ok) {
          throw new Error(`Failed to fetch coupon: ${res.statusText}`);
        }
        return res.json();
      })
      .then(data => setCoupon(data))
      .catch(err => setError(err.message));
  }, [id]);

  // If there's an error, show it
  if (error) return <div>Error: {error}</div>;

  // Show loading message if coupon data is not yet fetched
  if (!coupon) return <div>Loading...</div>;

  // Function to generate a random code for the QR
  const generateRandomCode = () => {
    const randomCode = Math.random().toString(36).substring(2, 15); // Generates a random alphanumeric code
    setQrCode(randomCode);
    setShowModal(true); // Show the modal with the QR code
  };

  return (
    <div>
      <h3>{coupon.code}</h3>
      <p>{coupon.discount}% off</p>
      <p>Expires: {coupon.expiry}</p>
      <p>{coupon.description}</p>

      <button onClick={generateRandomCode}>Get Coupon</button>

      {/* Modal to display the QR Code */}
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setShowModal(false)}>&times;</span>
            <h4>Scan to Claim Discount</h4>
            <QRCodeSVG value={qrCode} size={256} />
            <p>Your unique code: {qrCode}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default CouponDetail;
