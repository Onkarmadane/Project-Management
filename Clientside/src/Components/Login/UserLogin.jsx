import React, { useEffect, useState } from 'react';
import './Login.css';
import logo from '../../imgs/Logo.svg';
import axios from 'axios';
import { Link } from 'react-router-dom';

const UserLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [invalidCredentials, setInvalidCredentials] = useState(false);

  // Fetch prefilled credentials from the database on component mount
  useEffect(() => {
    const fetchCredentials = async () => {
      try {
        const response = await axios.get('http://localhost:3001/GetPrefilledCredentials');
        if (response.data.success) {
          setEmail(response.data.email);
          setPassword(response.data.password);
        } else {
          console.error('Error fetching credentials:', response.data.message);
        }
      } catch (error) {
        console.error('Error fetching credentials:', error.message);
      }
    };

    fetchCredentials();
  }, []); // Run only once on component mount

  const validateForm = () => {
    const newErrors = {};
    if (!email) {
      newErrors.email = 'Email is required';
    }
    if (!password) {
      newErrors.password = 'Password is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
        try {
            const response = await axios.post('http://localhost:3001/LoginPage', {
                email,
                password
            });

            if (response.data.Success === "true") {
                console.log('Login successful:', response.data);
                setInvalidCredentials(false);
                // Handle successful login (e.g., redirect or store token)
            } else {
                setInvalidCredentials(true);
                console.error('Invalid credentials:', response.data.Message);
            }
        } catch (error) {
            setInvalidCredentials(true);
            console.error('Login error:', error.response ? error.response.data.Message : error.message);
            if (error.response) {
                // Log specific details from the response
                console.log('Response data:', error.response.data);
                console.log('Response status:', error.response.status);
            }
        }
    }
};


  return (
    <div className="login-page">
      <div className="login-header">
        <img src={logo} alt="Logo" className="mt-5 loginlogo" data-aos="zoom-in" />
        <h5 className="mt-4 text-white loginhead">Online Project Management</h5>
      </div>
      <div className="login-container mx-auto" data-aos="zoom-in">
        <h6 className="mb-5 loginhead">Login to get started</h6>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="text-left">Email</label>
            <input
              type="email"
              className={`form-control ${errors.email ? 'is-invalid' : ''}`}
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && (
              <div className="invalid-feedback fade-in">{errors.email}</div>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="text">Password</label>
            <div className="input-group">
              <input
                type="text"
                className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span className="input-group-text">
                <i className="fa fa bi-eye-slash"></i>
              </span>
            </div>
            {errors.password && (
              <div className="invalid-feedback fade-in">{errors.password}</div>
            )}
          </div>

          <div className="forgot-link mt-2">
            <a href="#">Forgot password?</a>
          </div>

          <button type="submit" className="btn btn-primary login-btn w-50 hvr-buzz">
          <Link to="/DashboardPage" ></Link>
          Login</button>

          {invalidCredentials && (
            <div className="text-danger fade-in mt-3">Invalid credentials</div>
          )}
        </form>
      </div>
    </div>
  );
};

export default UserLogin;
