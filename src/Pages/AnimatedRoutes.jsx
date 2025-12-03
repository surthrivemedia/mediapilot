import { React, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Home from "./Home";
import Contact from "./Contact";
import Faqs from "./Faqs";
import Pricing from "./Pricing";
import Services from "./Services";
import Signup from "../App/Auth/Signup";
import Login from "../App/Auth/Login";
import Onboarding from "../App/Auth/Onboarding";
import AdminDashboard from "../Admin/Admin-pages/AdminDashboard";
import ActiveCampaings from "../Admin/Admin-pages/ActiveCampaings";
import HelpDesk from "../Admin/Admin-pages/HelpDesk";
import AllUsers from "../Admin/Admin-pages/AllUsers";
import Careers from "./Careers";
import Dashboard from "../App/App-pages/Dashboard";
import Profile from "../App/App-pages/Profile";
import Analytics from "../App/App-pages/Analytics";
import Campaigns from "../App/App-pages/Campaigns";
import Settings from "../App/App-pages/Settings";
import Help from "../App/App-pages/Help";
import Businesses from "../Admin/Admin-pages/Businesses";
import Activity from "../App/App-components/Activity";
import DemoExperience from "./DemoExperience";
import Waitlist from "./Waitlist";

function AnimatedRoutes() {
      const location = useLocation();

  useEffect(() => {
    // Scroll to the top when the route changes
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>

        {/* website pages */}
        <Route path="/" element={<Home />}/>
        <Route path="/contact" element={<Contact />}/>
        <Route path="/faqs" element={<Faqs />}/>
        <Route path="/pricing" element={<Pricing />}/>
        <Route path="/services" element={<Services />}/>
        <Route path="/careers" element={<Careers />}/>
        <Route path="/demo" element={<DemoExperience />}/>
        <Route path="/waitlist" element={<Waitlist />}/>
        {/*  */}

        {/* auth pages */}
        <Route path="/login" element={<Login />}/>
        <Route path="/signup" element={<Signup />}/>
        <Route path="/onboarding" element={<Onboarding />}/>
        {/*  */}

        {/* App pages */}
        <Route path="/dashboard" element={<Dashboard />}/>
        <Route path="/profile" element={<Profile />}/>
        <Route path="/analytics-reports" element={<Analytics />}/>
        <Route path="/campaigns" element={<Campaigns />}/>
        <Route path="/my-business" element={<Profile />}/>
        <Route path="/settings" element={<Settings />}/>
        <Route path="/get-help" element={<Help />}/>
        {/* <Route path="/activity" element={<Activity />}/> */}
        {/*  */}

        {/* Admin pages */}
        <Route path="/admin" element={<AdminDashboard />}/>
        <Route path="/all-campaigns" element={<ActiveCampaings />}/>
        <Route path="/help-support" element={<HelpDesk />}/>
        <Route path="/users-data" element={<AllUsers />} /> 
        <Route path="/all-businesses" element={<Businesses />} />
        {/*  */}

      </Routes>
    </AnimatePresence>
  )
}

export default AnimatedRoutes
