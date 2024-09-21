import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'
import SearchBox from '../components/SearchBox.jsx'
import Login from '../pages/Login.jsx'
import '../assets/css/search.css'
import { useDispatch, useSelector } from 'react-redux'
import { setAuthData } from '../slices/auth.js'
import { SignIn } from '@clerk/clerk-react'
import Signin from '../components/Signin.jsx'

export default function Search() {

  const [isLoginVisible, setIsLoginVisible] = useState(false);
  const authdata = useSelector((state) => state.authdata.authData);
  const dispatch=useDispatch();
  const handleLoginClick = () => {
    setIsLoginVisible(true);
  };
  useEffect(()=>{
    let er= localStorage.getItem('tokener');
    
  },[])

  const handleCloseModal = () => {
    setIsLoginVisible(false);
  };
  useEffect(() => {
    const storedAuthData = JSON.parse(localStorage.getItem('authData')); 
    if (storedAuthData) {
      dispatch(setAuthData(storedAuthData));
    }
  }, []);
  return (
    <>
    <Navbar onLoginClick={handleLoginClick}/>
        <SearchBox onLoginClick={handleLoginClick}/>
        {isLoginVisible && (
                    <div className="modal-overlay" style={{
                      position: 'fixed',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      backgroundColor: 'rgba(0, 0, 0, 0.5)',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      zIndex: 1000
                  }}>
                      <div className="modal-content" style={{
                          backgroundColor: 'white',
                          padding: '20px',
                          borderRadius: '8px',
                          width: '90%',
                          maxWidth: '500px',
                          maxHeight: '90vh',
                          overflow: 'auto',
                          position: 'relative'
                      }}>
                          <button onClick={handleCloseModal} className="close-modal" style={{
                              position: 'absolute',
                              top: '10px',
                              right: '10px',
                              background: 'none',
                              border: 'none',
                              fontSize: '1.5rem',
                              cursor: 'pointer'
                          }}>×</button>
                          <Signin handleCloseModal={handleCloseModal} />
                      </div>
                  </div>
                )}
    <Footer />
    </>
  )
}
