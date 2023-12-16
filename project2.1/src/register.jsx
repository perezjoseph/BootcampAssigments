import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const registerUser = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        if (response.status === 401) {
          alert('Invalid credentials');
        } else {
          throw new Error('Network response was not ok');
        }
      }

      navigate('/');
    } catch (error) {
      alert('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="loginContainer"> {/* Use the same container style for consistency */}
      <h1>Create an Account</h1>
      <form onSubmit={registerUser} className="loginForm">
        <div>
          <label htmlFor="email" className="loginLabel">Email: </label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id="email"
            className="loginInput"
          />
        </div>
        <div>
          <label htmlFor="password" className="loginLabel">Password: </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            id="password"
            className="loginInput"
          />
        </div>
        <button type="submit" className="loginButton">
          Submit
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;
