import React, { useState, useEffect } from 'react'
import logo from "../../stock/mediapilotlogo.png"
import { NavLink } from 'react-router-dom'
import { MdOutlineDashboard } from "react-icons/md";
import { HiOutlineUsers } from "react-icons/hi2";
import { FiMenu, FiX } from "react-icons/fi";
import { useLocation } from 'react-router-dom';
import { MdOutlineCampaign  } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";
import { MdOutlineBusinessCenter } from "react-icons/md";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { BiSupport } from "react-icons/bi";

function AdminNavigation() {

      const [isOpen, setIsOpen] = useState(false);

     useEffect(() => {
  const body = document.body;

  if (isOpen) {
    const scrollY = window.scrollY;
    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.left = "0";
    body.style.right = "0";
    body.style.overflow = "hidden";
  } else {
    const scrollY = body.style.top;
    body.style.position = "";
    body.style.top = "";
    body.style.overflow = "";
    window.scrollTo(0, parseInt(scrollY || "0") * -1);
  }
}, [isOpen]);

//route
 const location = useLocation();

  const routeTitles = {
    "/admin": "Admin Dashboard",
    "/all-campaigns": "Campaign Control",
    "/help-support": "Help & Support",
    "/users-data": "Users & Data",
    "/all-businesses": "Businesses",
  };

  const currentTitle = routeTitles[location.pathname] || "Dashboard";


  return (
    <div className='invoice-navigation'>

    <div className="desktop-nav">

        <div className="logo">
            <img src={logo} alt="media-pilot-logo" />
        </div>

        <div className="pages">
            <NavLink to="/admin"><MdOutlineDashboard className='icon'/>Admin Dashboard</NavLink>
            <NavLink to="/all-campaigns"><MdOutlineCampaign   className='icon'/>Campaign Control</NavLink>
            <NavLink to="/users-data"><HiOutlineUsers className='icon'/>Users & Data</NavLink>
            <NavLink to="/all-businesses"><MdOutlineBusinessCenter  className='icon'/>Businesses</NavLink>
         
        </div>

        <div className="account">
           <NavLink to="/help-support"><BiSupport  className='icon'/>Help & Support</NavLink>
            <NavLink className="admin-loggedin"><MdOutlineAdminPanelSettings  /> Logged in as Admin</NavLink>
            <span></span>
            <button>Logout</button>
        </div>

    </div>

       <div className="mobile-nav" onClick={() => setIsOpen(!isOpen)}>

        <div className="logo-page">

        <img src={logo} alt="media pilot logo" className=''/>

        <span></span>

       <h3>{currentTitle}</h3>

        </div>

        
        {isOpen ? <FiX className='menu-btn' /> : <FiMenu className='menu-btn'/>}


      </div>

         <div className={`mobile-navigation ${isOpen ? "show" : "hidden"}`} onClick={() => setIsOpen(false)}>

              <div className="mobile-menu" onClick={(e) => e.stopPropagation()}>

        <img src={logo} alt="media pilot logo" className='mobile logo'/>
    
        <div className="pages">
             <NavLink to="/admin"><MdOutlineDashboard className='icon'/>Admin Dashboard</NavLink>
            <NavLink to="/all-campaigns"><MdOutlineCampaign   className='icon'/>Campaign Control</NavLink>
            <NavLink to="/users-data"><HiOutlineUsers className='icon'/>Users & Data</NavLink>
            <NavLink to="/all-businesses"><MdOutlineBusinessCenter  className='icon'/>Businesses</NavLink>
        </div>

             <div className="account">
            <NavLink to="/help-support"><BiSupport  className='icon'/>Help & Support</NavLink>
            <NavLink className="admin-loggedin"><MdOutlineAdminPanelSettings  /> Logged in as Admin</NavLink>
            <span></span>
            <button>Logout</button>
        </div>


            </div>
      
      </div>


    </div>
  )
}

export default AdminNavigation
