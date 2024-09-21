import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../assets/css/login.css'; // Include any required CSS
import ggl from "../assets/images/search_281764.png";
import { GoogleLogin, googleLogout, useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import auth, { setAuthData } from '../slices/auth.js';
import { endpoints } from '../services/api.js';

function App({ handleCloseModal }) {
  const [showOTP, setShowOTP] = useState(false);
  const [phone, setPhone] = useState('');
  const [otp, setOTP] = useState('');
  const [error, setError] = useState('');
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [timer, setTimer] = useState(30);
  const [count, setCount] = useState('');
  const authdata = useSelector((state) => state.authdata.authData);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(()=>{
    console.log(phone,"phone");
  },[phone])
  useEffect(() => {
    const storedAuthData = JSON.parse(localStorage.getItem('authData'));
    if (storedAuthData) {
      dispatch(setAuthData(storedAuthData));
    }
  }, [dispatch]);

  useEffect(() => {
    let interval;
    if (showOTP && timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else if (timer === 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [showOTP, timer]);

  const showOTPSection = () => {
    if (phone.trim().length !== 10 || isNaN(phone.trim())) {
      setError('Please enter a valid phone number');
    } else {
      setError('');
      fetch(`${endpoints.SENDOTP_API}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phone: phone.trim() }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Failed to send OTP');
          }
          setShowOTP(true); // Show OTP input field after sending OTP
          setTimer(30); // Reset the timer
        })
        .catch(() => {
          setError('Failed to send OTP');
        });
    }
  };

  const verifyOTP = () => {
    fetch(  `${endpoints.VERIFYOTP_API}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ phone: phone.trim(), otp: otp.trim() }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Invalid OTP');
        }
        return response.json();
      })
      .then((data) => {
        dispatch(setAuthData({ given_name: 'Guest', email: '' }));

        handleCloseModal();
        setToken(data.token);
        localStorage.setItem('token', data.token); // Save token in local storage
        localStorage.setItem('authData', JSON.stringify({ given_name: 'Guest', email: '' }));
        
      })
      .catch(() => {
        setError('Invalid OTP');
      });
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('authData');
    googleLogout();
    setToken('');
    dispatch(setAuthData(null));
  };

  const handleOtpChange = (element, index) => {
    const newOtp = [...otp];
    if (/^\d?$/.test(element.value)) {
      newOtp[index] = element.value;
      setOTP(newOtp.join(''));

      if (element.value !== '' && index < 5) {
        document.getElementById(`otpBox-${index + 1}`).focus();
      } else if (element.value === '' && index > 0) {
        document.getElementById(`otpBox-${index - 1}`).focus();
      }
    }
  };

  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      setToken(tokenResponse.access_token);
      const userInfo = await axios
        .get('https://www.googleapis.com/oauth2/v3/userinfo', {
          headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
        })
        .then(res => res.data);

      dispatch(setAuthData(userInfo));
      localStorage.setItem('authData', JSON.stringify(userInfo));
      localStorage.setItem('token', tokenResponse.access_token);
      handleCloseModal();
    },
  });

  return (
    <section className="vh-100">
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <div className="card shadow-2-strong" style={{ borderRadius: '1rem' }}>
              <button onClick={handleCloseModal} type="button" className="btn-close close-modal" aria-label="Close" style={{ position: 'absolute', top: '10px', right: '10px' }}> X</button>
              <div className="card-body text-center" style={{ padding: '20px 40px' }}>
                <div className="top-header d-flex">
                  <h3 className="mb-3 fw-bold mt-0 d-flex text-left brand-name" style={{ fontSize: '23px', paddingRight: '28px', alignItems: 'center',color:'black' }}>
                    Search <span style={{ color: 'rgb(251, 38, 1)' }}>Patterns</span>
                  </h3>
                  <div className="top-right">
                    <h4 className="d-flex" style={{ marginBottom: '2px' }}>Welcome</h4>
                    <p>Login for a seamless experience</p>
                  </div>
                </div>
                <div id="mobileNumberSection" style={{ display: showOTP ? 'none' : 'block' }}>
                  <div className="form-outline mb-4">
                    <input
                      type="tel"
                      id="mobileNumber"
                      className="form-control form-control-lg"
                      placeholder="Enter mobile number"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      style={{ border: '2px solid rgba(0, 0, 0, 0.313)', fontSize: '16px', letterSpacing: '.5px' }}
                    />
                  </div>
                  <button
                    onClick={showOTPSection}
                    className="btn btn-login btn-lg btn-block"
                    style={{ width: '100%', backgroundColor: 'rgb(251, 38, 1)', color: 'white', fontSize: '16px', letterSpacing: '.5px' }}
                  >
                    Login with OTP
                  </button>
                  <p style={{ textAlign: 'center', marginTop: '10px' }}>OR</p>
                  <button
                    className="btn btn-google btn-lg btn-block" onClick={() => login()}
                    style={{ width: '100%', border: '2px solid rgba(0, 0, 0, 0.313)', fontSize: '16px', letterSpacing: '.5px' }}
                  >
                    <img src={ggl} width="20px" alt="Google" /> Google
                  </button>
                </div>
                <div id="otpSection" style={{ display: showOTP ? 'block' : 'none' }}>
                  <p style={{ fontSize: '24px', display: 'flex' }}>
                    Enter the code sent to +91 - <span id="displayPhoneNumber">{phone}</span>
                  </p>
                  <div className="otp-container">
                    {Array.from({ length: 6 }).map((_, index) => (
                      <input
                        key={index}
                        type="text"
                        id={`otpBox-${index}`}
                        className="otp-box"
                        maxLength="1"
                        placeholder="-"
                        value={otp[index] || ''}
                        onChange={(e) => handleOtpChange(e.target, index)}
                      />
                    ))}
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>Didn't Receive the OTP? </span>
                    <span className="resend-link" onClick={showOTPSection} style={{ cursor: timer === 0 ? 'pointer' : 'not-allowed', color: timer === 0 ? 'blue' : 'gray' }}>
                      {timer === 0 ? 'Resend OTP' : `Resend in ${timer}s`}
                    </span>
                  </div>
                  <button
                    onClick={verifyOTP}
                    className="btn btn-login btn-lg btn-block mt-3"
                    style={{ width: '100%', backgroundColor: 'rgb(251, 38, 1)', color: 'white', fontSize: '16px', letterSpacing: '.5px' }}
                  >
                    Continue
                  </button>
                </div>
                {error && <div className="alert alert-danger mt-3">{error}</div>}
                {authdata && token ? (
                  <div>
                    <div>Welcome, {authdata?.given_name}</div>
                    <button onClick={logout} className="btn btn-primary btn-lg btn-block mt-3" style={{ width: '100%' }}>
                      Logout
                    </button>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default App;
