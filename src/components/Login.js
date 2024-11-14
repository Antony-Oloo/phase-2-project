import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login({ setIsAdmin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Simple hardcoded credentials for now
    if (username === 'admin' && password === 'password') {
      setIsAdmin(true); // Set the admin state to true
      navigate('/admin-dashboard'); // Redirect to the Admin Dashboard page after login
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <div className="login-form">
      <h2 className="centered-title"> Admin Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
