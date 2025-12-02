import React from 'react'
import DestopNavigation from '../App-components/DestopNavigation'
import { NavLink } from 'react-router-dom'
import { IoIosNotificationsOutline } from "react-icons/io";

function Campaigns() {
  return (
    <div className='layout'>
      
      <DestopNavigation />

      <div className="campaigns">

        <div className="campaign-header header">
              <p>Campaigns</p>

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

export default Campaigns
