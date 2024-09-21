import React, { useEffect, useState } from 'react';
import '../../assets/css/ai.css'; // Make sure to create and import a CSS file for styling
import { BrightnessHigh, Gear, Moon, PatchQuestion, Stars, WindowSidebar } from 'react-bootstrap-icons';
import avatar from "../../assets/images/user (4).png";
import { useDispatch, useSelector } from 'react-redux';
import { setIsSidebarClosed } from '../../slices/query.js';
import { Link } from 'react-router-dom';

const SideBar = () => {
  // const [isSidebarClosed, setSidebarClosed] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const isSidebarClosed=useSelector((state)=> state.queryresponses.isSidebarClosed);
  const [theme, setTheme] = useState('dark');
  const authData=useSelector((state)=> state.authdata.authData);
  const dispatch=useDispatch();
  const toggleSidebar = () => {
    dispatch(setIsSidebarClosed(!isSidebarClosed));
  };

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const toggleTheme = () => {
    if (theme === 'light') {
      setTheme('dark');
      document.body.classList.remove('light-mode');
      document.body.classList.add('dark-mode');
    } else {
      setTheme('light');
      document.body.classList.remove('dark-mode');
      document.body.classList.add('light-mode');
    }
  };

  useEffect(() => {
    console.log(authData);
  
    
  }, [authData])
  
  return (
    <>
      <div id="sidebar" className={`sidebar ${isSidebarClosed ? 'closed' : ''}`}>
        {!isSidebarClosed && (
          <>
            <div className="section top-section">
              <div className="logo-container">
                <h2 style={{ fontFamily: 'denton', fontSize: '30px',color:'white' }}>
                  Search <b style={{ color: 'rgb(244, 54, 2)' }}>Patterns</b>
                </h2>
              </div>
              <span
                    id="toggle-btn"
                    className="toggle-btn"
                    onClick={toggleSidebar}
                    style={{
                      display: isSidebarClosed ? 'none' : 'inline',
                      
                    }}
                  >
                <WindowSidebar />
              </span>
              


            </div>
            <Link to="/searchAI/q=query">
            <button type="button" className="dropbtn">
              Home
            </button>
            </Link>
            <Link to="/searchAI/discover">
            <button type="button" className="dropbtn" >
              Discover
            </button>
            </Link>
            <div className="dropdown">
              <button className="dropbtn" onClick={toggleDropdown}>
                Main Menu
              </button>
              <div
                id="dropdown-content"
                className="dropdown-content"
                style={{ display: isDropdownOpen ? 'flex' : 'none' }}
              >
                <a href="#">Archive</a>
                <a href="#">Billing & Subscription</a>
              </div>
            </div>
            <div className="section bottom-section" style={{ borderTop: '1px solid #ffffff21' }}>
              <div className="faq-settings">
                <Link to="/searchAi/faq">
                  <PatchQuestion style={{ fontSize: '17px',marginRight:'10px' }} /> FAQ
                  </Link>
                {/* <a href="#">
                  <Gear style={{ fontSize: '17px',marginRight:'10px' }} /> Settings
                </a> */}
              </div>
          { authData ?
              <div className="profile">
                <div className="profile-info">
                  <img src={avatar} alt="Profile" className="profile-img" />
                  <div className="para" style={{ alignContent: 'center',marginLeft:"20px" }}>
                    <h2 className="name" style={{lineBreak:"anywhere",color:"white"}}>{authData?.given_name}</h2>
                    <p className="email" style={{lineBreak:"anywhere",color:"white"}}>{authData?.email}</p>
                  </div>
                  <div className="free-label">Free</div>
                </div>
                <div>
                  <button className="upgrade-btn">
                    <Stars /> Upgrade to pro
                  </button>
                </div>
              </div> : ""
        }
              <div className="theme-toggle">
                <button onClick={toggleTheme}>
                  {theme === 'light' ? (
                    <>
                      <Moon /> Dark
                    </>
                  ) : (
                    <>
                      <BrightnessHigh /> Light
                    </>
                  )}
                </button>
              </div>
            </div>
          </>
        )}
        <span
          id="open-btn"
          className="open-btn"
          onClick={toggleSidebar}
          style={{ display: isSidebarClosed ? 'inline' : 'none',color: (theme === 'dark' || theme === 'light' && !isSidebarClosed) ? 'white' : 'black'}}
           
         >
          <WindowSidebar />
        </span>
      </div>
    </>
  );
};

export default SideBar;
