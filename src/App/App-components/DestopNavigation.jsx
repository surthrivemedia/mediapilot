import React, { useState, useEffect } from 'react'
import logo from "../../stock/mediapilotlogo.png"
import { NavLink } from 'react-router-dom'
import { MdOutlineDashboard } from "react-icons/md";
import { TbFileInvoice } from "react-icons/tb";
import { MdOutlineAccountBalance } from "react-icons/md";
import { GiSandsOfTime } from "react-icons/gi";
import { HiOutlineUsers } from "react-icons/hi2";
import { FiMenu, FiX } from "react-icons/fi";
import { useLocation } from 'react-router-dom';
import { MdOutlineCampaign  } from "react-icons/md";
import { FiHelpCircle } from "react-icons/fi";
import { IoSettingsOutline } from "react-icons/io5";

function DestopNavigation() {

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
    "/dashboard": "Dashboard",
    "/campaigns": "Campaigns",
    "/analytics-reports": "Analytics & Reports",
    "/my-business": "My Business",
    "/get-help": "Help & Support",
    "/settings": "Settings",
  };

  const currentTitle = routeTitles[location.pathname] || "Dashboard";


  return (
    <div className='invoice-navigation'>

    <div className="desktop-nav">

        <div className="logo">
            <img src={logo} alt="media-pilot-logo" />
        </div>

        <div className="pages">
            <NavLink to="/dashboard"><MdOutlineDashboard className='icon'/> Dashboard</NavLink>
            <NavLink to="/campaigns"><MdOutlineCampaign   className='icon'/> Campaigns</NavLink>
            <NavLink to="/analytics-reports"><TbFileInvoice className='icon'/> Analytics / Reports</NavLink>
            <NavLink to="/my-business"><HiOutlineUsers className='icon'/> My Business</NavLink>
         
        </div>

        <div className="account">
            <NavLink to="/get-help"><FiHelpCircle /> Help & Support</NavLink>
            <NavLink to="/settings"> <IoSettingsOutline /> Settings</NavLink>
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
            <NavLink to="/dashboard"><MdOutlineDashboard className='icon'/> Dashboard</NavLink>
            <NavLink to="/campaigns"><MdOutlineCampaign   className='icon'/> Campaigns</NavLink>
            <NavLink to="/analytics-reports"><TbFileInvoice className='icon'/> Analytics / Reports</NavLink>
            <NavLink to="/my-business"><HiOutlineUsers className='icon'/> My Businesses</NavLink>

        </div>

             <div className="account">
            <NavLink to="/get-help"><FiHelpCircle /> Help & Support</NavLink>
            <NavLink to="/settings"> <IoSettingsOutline /> Settings</NavLink>
            <span></span>
            <button>Logout</button>
        </div>


            </div>
      
      </div>


    </div>
  )
}

export default DestopNavigation
