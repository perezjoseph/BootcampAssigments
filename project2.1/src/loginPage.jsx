import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const logInUser = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('/login', {
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
          throw new Error('Network response was not ok.');
        }
      }

      navigate('/');
    } catch (error) {
      alert('An error occurred. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="loginContainer">
      <h1>Log Into Your Account</h1>
      <form onSubmit={logInUser} className="loginForm">
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
        <button 
          type="submit" 
          disabled={isLoading} 
          className={`loginButton ${isLoading ? 'loginButtonDisabled' : ''}`}
        >
          {isLoading ? 'Logging in...' : 'Submit'}
        </button>
      </form>
    </div>
  );
};

export default LoginPage;