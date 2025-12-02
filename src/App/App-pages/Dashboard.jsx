import React, { useState } from 'react';
import DesktopNavigation from "../App-components/DestopNavigation"
import Activity from '../App-components/Activity';
import { NavLink } from 'react-router-dom'
import { IoIosNotificationsOutline } from "react-icons/io";

function Dashboard() {
  const [showActivity, setShowActivity] = useState(false);

 const handleCloseActivity = () => {
    setShowActivity(false);
    // change herw
  };

  return (
    <div className='layout'>
      
        <DesktopNavigation />

        <div className="dashboard">

              <div className="dashboard-header header">

            <p>Dashboard</p>

            <div className="user-brand">

                  <div 
              className="activity"
              onClick={() => setShowActivity(true)}
            >
              <div className="notification-container">
                <IoIosNotificationsOutline className='icon' />
              </div>
            </div>

           {showActivity && <Activity onClose={handleCloseActivity} />}

            <NavLink className="active-business" to="/my-business">
                <img src="https://api.dicebear.com/9.x/adventurer/svg?seed=Ruhter" alt="Active Brand" />
                <span>Active Business</span>
            </NavLink>


            </div>

            </div>

            <div className="dashboard-container">
              
              <div className="campaings">

                <div className="campaign">
                    <p>Campaigns</p>

                      <div className="active">
                      <h1>0</h1>
                        <p>Active Campaings</p>
                      </div>

                    <div className="campaign-more">
                      <span>0 Drafts</span> <NavLink to="/campaigns">See More</NavLink>
                    </div>

                </div>

                <div className="campaign">
                    <p>Events</p>

                      <div className="active">
                      <h1>0</h1>
                        <p>Upcoming Events</p>
                      </div>

                    <div className="campaign-more">
                      <span>0 Reservations</span> <NavLink to="/campaigns">See More</NavLink>
                    </div>

                </div>

           <div className="campaign">
              <p>My Business</p>
              <div className="active">
                <h1>75%</h1> {/* Example: Profile completeness or credibility score */}
                <p>Credibility Score</p> {/* Or "Credibility Score" if that fits your tracking feature */}
              </div>
              <div className="campaign-more">
                <span>2 Media Mentions</span> {/* Tie into media mentions tracking */}
                <NavLink to="/my-business">Manage</NavLink>
              </div>
            </div>
              </div>


            </div>


            
        </div>

    </div>
  )
}

export default Dashboard
