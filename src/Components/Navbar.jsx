import React, { useState, useEffect } from 'react';
import { IoIosArrowDown } from "react-icons/io";
import logo from "../stock/mediapilotlogo.png"
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { CiMenuBurger } from "react-icons/ci";
import { IoClose } from "react-icons/io5";

function Navbar() {

  const navigate = useNavigate()

  const [scrolled, setScrolled] = useState(false);
   const [showMenu, setShowMenu] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 100) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []); 

    const openMenu = () => {
    setShowMenu(true);
    document.body.style.overflow = "hidden";   // stop scroll
  };

  const closeMenu = () => {
    setShowMenu(false);
    document.body.style.overflow = "auto";     // restore scroll
  };

const goToHome = () => navigate("/");



  //hide nav at certain paths
  const location = useLocation();

  const startDemo = () => {
    navigate('/demo');
  };
  
const joinWaitlist = () =>{
  navigate("/waitlist")
}  

  const hiddenPaths = [
    "/login",
    "/signup",
      "/onboarding"
  ];

  const allPaths = [
    "/", "/marketplace", "/store", "/address", "/userMasterclass", "/userDashboard",
    "/adminHome", "/adminNotifications", "/post", "/orders", "/cart", "/userProfile",
    "/notifications", "/uploads", "/onboarding", "/profilePic", "/editAddress",
    "/myorders", "/gethelp", "/editprofile", "/adminlog", '/login', '/signup', '/masterclass', '/about', '/contact','/reset', '/shop', '/shop/*', "/masterclass/enroll" , "/waitlist", "/bookings"
  ];

  const shouldHideComponent =
  hiddenPaths.includes(location.pathname) ||
  (!allPaths.includes(location.pathname) && !location.pathname.startsWith("/shop/"));

   const isWaitlistPage = location.pathname === "/waitlist";

  return (
    <div style={{ display: shouldHideComponent ? "none" : "block" }}>

   <div  className={`navbar 
        ${scrolled ? "navbar-scrolled" : ""} 
        ${isWaitlistPage ? "navbar-waitlist" : ""}
      `}>
      
      <div className="navbar-container">


        <div className="logo-links">

         <div className="logo-container" onClick={goToHome}>

            <img src={logo} alt="Media Pilot Logo" />
          </div>

          <div className="links">
            <NavLink> <p>Services</p> <IoIosArrowDown/> </NavLink>
            <NavLink> <p>Contact Us</p> </NavLink>
            <NavLink> <p>Pricing</p>  </NavLink>
            <NavLink> <p>Careers</p></NavLink>
            <NavLink to="/bookings"> <p>Bookings</p></NavLink>
          </div>

        </div>

          <div className="app">
              <button  onClick={startDemo}>Get a demo</button>
              <NavLink to="/waitlist">Join the waitlist</NavLink>
          </div>

          <div className="mobile-app">
              <button  onClick={startDemo}>Get a demo</button>
              <CiMenuBurger className='menu-btn' onClick={openMenu} />
          </div>

      </div>

    </div>

 <div
        className={`slide-menu ${showMenu ? "open" : ""}`}
        onClick={closeMenu}
      >
        <div
          className="slide-menu-content"
          onClick={(e) => e.stopPropagation()}
        >

          {/* CLOSE BUTTON */}
          <IoClose
            className="close-btn"
            onClick={closeMenu}
          />

          <NavLink to="/services">Services</NavLink>
          <NavLink to="/contact">Contact</NavLink>
          <NavLink to="/pricing">Pricing</NavLink>
          <NavLink to="/careers">Careers</NavLink>
          <NavLink to="/bookings"> <p>Bookings</p></NavLink>

          <div className="navbar-app">
            <button  onClick={startDemo}>Try the demo</button>

            <NavLink  to="/waitlist"  onClick={closeMenu}>Join the Waitlist</NavLink>
          </div>

        </div>
      </div>

    </div>
  )
}

export default Navbar
