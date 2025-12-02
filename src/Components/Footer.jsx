import React from 'react'
import { FaInstagram } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa6";
import { FaXTwitter } from "react-icons/fa6";
import { FaFacebookF } from "react-icons/fa";
import logo from "../stock/mediapilotlogo.png"
import { NavLink, useLocation } from "react-router-dom";


function Footer() {
  //hide nav at certain paths
    const location = useLocation();
  
    
    const hiddenPaths = [
      "/login",
      "/signup",
      "/onboarding"
    ];
  
    const allPaths = [
      "/", "/marketplace", "/store", "/address", "/userMasterclass", "/userDashboard",
      "/adminHome", "/adminNotifications", "/post", "/orders", "/cart", "/userProfile",
      "/notifications", "/uploads", "/onboarding", "/profilePic", "/editAddress",
      "/myorders", "/gethelp", "/editprofile", "/adminlog", '/login', '/signup', '/masterclass', '/about', '/contact','/reset', '/shop', '/shop/*', "/masterclass/enroll" 
    ];
  
    const shouldHideComponent =
    hiddenPaths.includes(location.pathname) ||
    (!allPaths.includes(location.pathname) && !location.pathname.startsWith("/shop/"));
  

  return (
    <div style={{ display: shouldHideComponent ? "none" : "block" }}>

    <div className='footer'>

      <div className="footer-container">

        <div className="footer-top">

            <div className="left">
              
              <div className="bar 1">
                <h3>Popular services</h3>
                <NavLink>Plan Media and Communication Strategy</NavLink>
                <NavLink>Manage PR Campaings</NavLink>
                <NavLink>Request Interviews</NavLink>
                <NavLink>Access Verified Media Directories</NavLink>
              </div>

              <div className="bar 2">
                <h3>Company</h3>
                <NavLink> About Us</NavLink>
                <NavLink>Careers</NavLink>
                <NavLink>Customer Support</NavLink>
                <NavLink>Contact Us</NavLink>
              </div>

            </div>

            <div className="right">
              <h2>Subscribe</h2>
              <p>Subscribe to get the latest upades from MediaPilot.</p>

              <div className="sub-button">
                <input type="text" placeholder='yourmail@gmail.com' required />
                <button>Subscribe</button>
              </div>

              <span>We only send useful emails that help your ideas grow.</span>
            </div>

        </div>

        <div className="footer-bottom">

          <div className="logo-container">
            <img src={logo} alt="Media pilot Logo" />

          <p>© MediaPilot — A Surthrive Media Initiative</p>
          </div>

          <div className="socials">
            <NavLink><FaFacebookF /></NavLink>
              <NavLink>  <FaXTwitter /></NavLink>
              <NavLink> <FaInstagram /></NavLink>
              <NavLink>  <FaLinkedinIn /></NavLink>
          </div>

        </div>


      </div>

    </div>
    </div>
  )
}

export default Footer
