import React, { useState, useRef, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import logo from '../assets/images/search petterns logo1.png';
import { useDispatch, useSelector } from 'react-redux';
import { googleLogout } from '@react-oauth/google';
import { setAuthData } from '../slices/auth.js';
import { SignedIn, UserButton, useUser } from '@clerk/clerk-react';
import { motion } from 'framer-motion';

function Navbar({ onLoginClick }) {
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [showHistory, setShowHistory] = useState(false);
  const historyPopupRef = useRef(null);
  const authdata = useSelector((state) => state.authdata.authData);
  const dispatch = useDispatch();
const {isSignedIn,user}=useUser();
const navigate=useNavigate();
  useEffect(() => {
    function handleClickOutside(event) {
      if (historyPopupRef.current && !historyPopupRef.current.contains(event.target)) {
        setShowHistory(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  const visible = { opacity: 1, y: 0, transition: { duration: 0.5 } };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible
  };
  return (
    <>
      <motion.nav  className="navbar navbar-expand-lg navbar-dark bg-dark" id="navbar"
      initial="hidden"
      animate="visible"
      exit={{ opacity: 0, transition: { duration: 1 } }}
      variants={{ visible: { transition: { staggerChildren: 0.3 }}} }
      >
        <div className="container-fluid">
          <motion.NavLink variants={itemVariants} className="navbar-brand" to="/">
            <img src={logo} alt="" style={{ width: "300px", paddingTop: '13px' }} />
          </motion.NavLink>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <motion.li  variants={itemVariants} className="nav-item">
                <NavLink className={({ isActive }) => "nav-link" + (isActive ? " isactive" : "")} to="/">Home</NavLink>
              </motion.li>
              <li className="nav-item dropdown">
                <motion.NavLink variants={itemVariants} className="nav-link dropdown-toggle" to="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Use Cases
                </motion.NavLink>
                <ul className="dropdown-menu custom-dropdown" aria-labelledby="navbarDropdown">
                  <li variants={itemVariants}><NavLink className={({ isActive }) => "dropdown-item" + (isActive ? " isactive" : "")} to="/seo"><i className="bi bi-search me-3"></i>SEO</NavLink></li>
                  <li variants={itemVariants}><NavLink className={({ isActive }) => "dropdown-item" + (isActive ? " isactive" : "")} to="/content_marketing"><i className="bi bi-file-earmark-medical me-3"></i>Content Marketing</NavLink></li>
                  <li variants={itemVariants}><NavLink className={({ isActive }) => "dropdown-item" + (isActive ? " isactive" : "")} to="/consumer_research"><i className="bi bi-people-fill me-3"></i>Consumer Research</NavLink></li>
                </ul>
              </li>
              <motion.li  variants={itemVariants} className="nav-item">
                <NavLink className={({ isActive }) => "nav-link" + (isActive ? " isactive" : "")} to="/feature">Features</NavLink>
              </motion.li>
              <motion.li  variants={itemVariants} className="nav-item">
                <NavLink className={({ isActive }) => "nav-link" + (isActive ? " isactive" : "")} to="/pricing">Pricing</NavLink>
              </motion.li>
              <motion.li  variants={itemVariants} className="nav-item">
                <NavLink className={({ isActive }) => "nav-link" + (isActive ? " isactive" : "")} to="/consulting">Consulting</NavLink>
              </motion.li>
            </ul>
            <form className="d-flex" style={{ paddingTop: '13px' }}>
              {!isSignedIn ? (
                <>
                  <button type="button" className="btn btn-outline-light me-2" onClick={onLoginClick}>Login</button>
                  {/* <button type="button" className="btn btn-outline-light me-2">Upgrade to Pro</button> */}
                </>
              ) : (
                <SignedIn>
                  <UserButton />
                </SignedIn>
              )}
            </form>
          </div>
        </div>
      </motion.nav>

      {/* History Popup */}
      {/* {showHistory && (
        <div id="history-search" ref={historyPopupRef}>
          The rest of your History Popup code
        </div>
      )} */}
    </>
  );
}

export default Navbar;
