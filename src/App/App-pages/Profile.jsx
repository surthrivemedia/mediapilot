import React from 'react'
import DesktopNavigation from "../App-components/DestopNavigation"
import { NavLink } from 'react-router-dom'
import { IoIosNotificationsOutline } from "react-icons/io";

function Profile() {
  return (
    <div className='layout'>

      <DesktopNavigation />

      <div className="profile">

          <div className="profile-header header">
                <p>My Businesses</p>
                    <NavLink to="/my-business" className="user-brand">
        
                    <div className="activity">
                      <div className="notification-container">
                    <IoIosNotificationsOutline className='icon' />
                      </div>
                    </div>
                    
                        <img src="https://api.dicebear.com/9.x/adventurer/svg?seed=Ruhter" alt="Active Brand" />
                        <span>Active Business</span>
        
                    </NavLink>

          </div>

      </div>
      
    </div>
  )
}

export default Profile
