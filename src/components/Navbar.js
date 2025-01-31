import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar({ isAdmin, setIsAdmin }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsAdmin(false); // Log out the admin
    navigate('/'); // Redirect to home page
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="logo">
          <Link to="/">CouponApp</Link>
        </div>
        <ul className="nav-links">
          <li>
            <Link to="/" className="nav-link">Home</Link>
          </li>
          <li>
            <Link to="/about" className="nav-link">About</Link>
          </li>
          {isAdmin ? (
            <>
              <li>
                <Link to="/add" className="nav-link">Add Coupon</Link>
              </li>
              <li>
                <button onClick={handleLogout} className="nav-link logout-button">Logout</button>
              </li>
            </>
          ) : (
            <li>
              <Link to="/login" className="nav-link">Admin Login</Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
