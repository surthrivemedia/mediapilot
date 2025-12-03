import React, { useState, useEffect, useRef } from 'react';
import img1 from "../../src/stock/backgrounds/colleagues.jpg";
import img2 from "../../src/stock/backgrounds/showntell.jpg";
import img3 from "../../src/stock/backgrounds/workspace.jpg";

import { 
  FaBullhorn,
  FaChartLine,
  FaNewspaper,
  FaSearch,
  FaUsersCog
} from "react-icons/fa";

import {FaPenNib, FaBookOpen, FaCalendarAlt, FaChartBar, FaComments } from "react-icons/fa";
import { FiCheck, FiLock } from "react-icons/fi";
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();
  
const sections = [
  {
    id: 1,
    title: "Built for SMEs & Startups",
    description:
      "MediaPilot helps small businesses and early-stage companies build trust, improve visibility, and present themselves professionally across all media channels.",
    imagePath: img1,
    colorClass: "card-green",
  },
  {
    id: 2,
    title: "Perfect for NGOs",
    description:
      "Non-profits can use MediaPilot to share their impact clearly, manage communication materials, and build stronger public credibility.",
    imagePath: img2,
    colorClass: "card-blue",
  },
  {
    id: 3,
    title: "Made for Communications Officers",
    description:
      "MediaPilot gives comms teams the tools they need to plan campaigns, organise press materials, and manage messaging with ease.",
    imagePath: img3,
    colorClass: "card-orange",
  },
  {
    id: 4,
    title: "Useful for Consultants & Creators",
    description:
      "Consultants, creatives, and freelancers can use MediaPilot to shape their media identity, create simple strategy guides, and track the strength of their public presence.",
    imagePath: img1,
    colorClass: "card-green",
  },
];


const [activeSection, setActiveSection] = useState(1);
    const sectionRefs = useRef([]); // Ref to hold references to each section card

    useEffect(() => {
        // --- Scroll Logic ---
        const handleScroll = () => {
            // Get the position of the main wrapper
            // const wrapperTop = sectionRefs.current[0].closest('.content-wrapper').getBoundingClientRect().top;
            
            // Loop through each section card to determine which one is currently in view
            sections.forEach((section, index) => {
                const ref = sectionRefs.current[index];
                if (!ref) return;

                const { top, height } = ref.getBoundingClientRect();
                
                // Determine if the current section is roughly centered in the viewport
                // The factor (e.g., window.innerHeight / 3) determines the trigger point
                const triggerPoint = window.innerHeight * 0.4; // Trigger when section is 40% from top
                
                if (top <= triggerPoint && (top + height) > triggerPoint) {
                    setActiveSection(section.id);
                }
            });
        };

        window.addEventListener('scroll', handleScroll);
        // Initial check in case the component loads already scrolled
        handleScroll();

        return () => window.removeEventListener('scroll', handleScroll);
    },);
    
    // Find the currently active section object
    const currentSection = sections.find(s => s.id === activeSection) || sections[0];
  
const services = [
  {
    icon: <FaBullhorn />, 
    title: "Weak brand story",
    text: "MediaPilot gives clear guides to help you shape your brand voice.",
  },
  {
    icon: <FaChartLine />,
    title: "Wasted ad spend",
    text: "Plan smarter with simple data tools that show what works.",
  },
  {
    icon: <FaNewspaper />,
    title: "No access to trusted journalists",
    text: "Find and book verified media partners with ease.",
  },
  {
    icon: <FaSearch />,
    title: "No clear media data",
    text: "Track mentions, mood, and credibility in one clean dashboard.",
  },
  {
    icon: <FaUsersCog />,
    title: "Hard to manage media tasks",
    text: "Use our tools to stay organized and handle your media steps smoothly.",
  },
];

  const features = [
    { icon: <FaBullhorn />, title: "Campaign Planning" },
    { icon: <FaPenNib />, title: "Press Release Generator" },
    { icon: <FaBookOpen />, title: "Media Directory" },
    { icon: <FaCalendarAlt />, title: "Content Scheduling" },
    { icon: <FaChartBar />, title: "Analytics & Credibility Score" },
    { icon: <FaComments />, title: "Chat with Advisors" },
  ];

  //how it works scroll
    const lineRef = useRef(null);

useEffect(() => {
  const handleScroll = () => {
    if (!lineRef.current) return;

    const rect = lineRef.current.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    let progress = (windowHeight - rect.top) / rect.height;
    progress = Math.min(Math.max(progress, 0), 1);

    const line = lineRef.current.querySelector(".line-fill");
    if (line) line.style.height = `${progress * 100}%`;
  };

  window.addEventListener("scroll", handleScroll);
  handleScroll();

  return () => window.removeEventListener("scroll", handleScroll);
}, []);

//pricing

 const [billing, setBilling] = useState("monthly"); // "monthly" | "yearly"

  // Replace these with your real prices / currency formatting
  const prices = {
    basicPerCampaign: "₦20,000",   // one-off campaign price (example)
    proMonthly: "₦50,000",
    proYearly: "₦540,000" // example discounted annual (12 months - discount)
  };

  const proPriceDisplay = billing === "monthly" ? `${prices.proMonthly}/month` : `${prices.proYearly}/year`;

  const basicFeatures = [
    "Pay per campaign",
    "One-time consultation",
    "Upload press materials",
    "Book media slots (per request)"
  ];

  const proFeatures = [
    "Unlimited campaigns (within plan limits)",
    "Access to Media Directory",
    "Analytics & Credibility Score",
    "Chat with Surthrive advisors",
    "Scheduling & campaign management"
  ];

const startDemo = () => {
    navigate('/demo');
  };

const joinWaitlist = () =>{
  navigate("/waitlist")
}  

const goToWhatWeDo = () => {
  const section = document.getElementById("whatwedo");
  const sectionTop = section.getBoundingClientRect().top + window.scrollY;

  const offset = window.innerHeight / 1.8 - section.offsetHeight / 2;

  window.scrollTo({
    top: sectionTop - offset,
    behavior: "smooth",
  });
};

const goToServices = () => {
  const section = document.getElementById("services");
  const sectionTop = section.getBoundingClientRect().top + window.scrollY;

  const offset = window.innerHeight / 1.8 - section.offsetHeight / 2;

  window.scrollTo({
    top: sectionTop - offset,
    behavior: "smooth",
  });
};



  return (
    <div className='home'>

      <div className="landing">

        <div className="landing-content">

          <h1>Your Media Consultant in Your Pocket.</h1>

        <p>
        Get simple, affordable, and data-driven media support built for African businesses. <br />
        Plan your campaigns, share your story, and grow your visibility with tools that help you stand out and thrive.
      </p>

          <div className="next">
          <button  onClick={startDemo}>Get a demo</button>
          <button onClick={goToWhatWeDo}>Learn More</button>
          </div>


        </div>

      </div>



        <section className="what-we-do" id="whatwedo">

          <div className="left">

             <div className="media-grid">
            <div className="shape shape-orange"></div>

            <div className="grid">
              <img src={img1} alt="preview" className="img img-1" />
              <img src={img2} alt="preview" className="img img-2" />
              <img src={img3} alt="preview" className="img img-3" />
            </div>

            <div className="shape shape-blue"></div>
          </div>

          </div>

          <div className="right">

                <div className="top">
                    <h1>What we do</h1>

                    <p>MediaPilot helps you plan your media strategy, create your press materials, manage your campaigns, and track your credibility all in one place.</p>

                    <button onClick={goToServices}>View Services</button>
                </div>

                <div className="bottom">
            <div className="brag1">
              <h1>1000+</h1>
              <p>Brands and Businesses Served</p>
            </div>

            <div className="brag2">
              <h1>13+</h1>
              <p>Years of Experience and Serving</p>
            </div>

            <div className="brag3">
              <h1>200+</h1>
              <p>Media Partners and Communication Resources</p>
            </div>
          </div>


          </div>

        </section>

        <section className="services-section" id='services'>
    

          <div className="services-grid">
              <div className="services-left">
            <p className="label">Our Services</p>
            <h2>The Problems<br />African Businesses Face</h2>
            <p className="subtitle">
            And how MediaPilot helps solve them.  
            </p>
          </div>

            {services.map((item, index) => (
              <div className="service-card" key={index}>
                <div className="icon">{item.icon}</div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
                <button>
                  Learn More <span>›</span>
                </button>
              </div>
            ))}
          </div>
        </section>

        <section className="why-edufor-section">
            <div className="why-edufor-container">
            <header className="why-edufor-header">
                <h2>Who It's For</h2>
                <p>Built for people who want better media results</p>
            </header>

                
                <div className="content-wrapper">
                    {/* LEFT SIDE: Image Container (Sticky) */}
                    <div className="image-column">
                        <div className="image-sticky-wrapper">
                            {/* The image changes based on the activeSection state */}
                            <img 
                                key={currentSection.id} // Use key to force component re-render/transition
                                src={currentSection.imagePath} 
                                alt={currentSection.title} 
                            />
                        </div>
                    </div>

                    {/* RIGHT SIDE: Accordion/Tab Content (Scrollable Trigger) */}
                    <div className="text-column">
                        {sections.map((section, index) => (
                            <div 
                                key={section.id} 
                                ref={el => sectionRefs.current[index] = el} // Assign ref
                              className={`section-card ${section.colorClass} ${activeSection === section.id ? 'active' : ''}`}
                            >
                                <h3 className="card-title">
                                    {section.title}
                                </h3>
                                
                                <div className="card-details">
                                    <p>{section.description}</p>
                                    <a href="/services" className="view-services-link">
                                        View Services <span className="arrow">→</span>
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>

        <section className="features">
          <div className="features-left">
            <h1>Powerful Tools<br/>To Grow Your Visibility.</h1>
            <button>Get Started</button>
          </div>

          <div className="features-right">
            <h3 className="label">Features</h3>

            <div className="features-grid">
              {features.map((item, i) => (
                <div className="feature-card" key={i}>
                  <div className="icon">{item.icon}</div>
                  <div className="details">
                    <h4>{item.title}</h4>
                    <p>Simple tools that help you plan, manage and track your media work.</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>


  <section className="howitworks">
      <h2>How MediaPilot Works</h2>
      <p className="subtitle">
        Simple steps to plan, publish and track your media presence.
      </p>

      <div className="timeline" ref={lineRef}>
         <div className="line-fill"></div>

        <div className="step step-right">
          <div className="number number-blue">1</div>
          <div className="card">
            <h3>Create your profile & brand story</h3>
            <p>Set up your brand details, goals and message.</p>
          </div>
        </div>

        <div className="step step-left">
          <div className="number number-orange">2</div>
          <div className="card">
            <h3>Plan and generate your media content</h3>
            <p>Use built-in tools to plan, write and organize media.</p>
          </div>
        </div>

        <div className="step step-right">
          <div className="number number-green">3</div>
          <div className="card">
            <h3>Launch campaigns & track credibility</h3>
            <p>Publish and track your visibility & credibility score.</p>
          </div>
        </div>

      </div>
    </section>

  <section className="pricing-section">

      {/* <p className="head">PRICING</p> */}
      <h2 className="pricing-title">Be one of the first to try MediaPilot</h2>

      <p className="pricing-sub">
        The full platform is almost ready. For now, try the free demo.
      </p>

      <div className="cards demo-layout">

        {/* FREE DEMO — ACTIVE */}
        <article className="cardd demo-cardd">
          <div className="badge demo-badge"  onClick={startDemo}>Free Demo</div>

          <h3 className="demo--title">
            Try the demo for free, see what the hype is about
          </h3>

          <p className="demo-description">
            Answer short questions every business owner faces.  
            Get your MediaPilot Credibility Score + a personalized report based on your answers.
          </p>

          <ul className="feature-list">
            <li><FiCheck /> Interactive business assessment</li>
            <li><FiCheck /> Instant credibility score</li>
            <li><FiCheck /> Personalized report + insights</li>
            <li><FiCheck /> Email added to waitlist for updates</li>
          </ul>

          <button className="btnn btnn-primary" onClick={startDemo}>
            Start Free Demo
          </button>
        </article>


        {/* LOCKED PLAN 1 */}
        <div className="cardd card-blurred">
          <div className="locked-overlay">
            <FiLock className="lock-icon" />
            <p>Coming Soon</p>
          </div>

          <div className="badge badge-dark">Basic</div>
          <h3 className="plan-title">Basic Plan</h3>
          <ul className="feature-list">
            <li><FiCheck /> Basic campaign support</li>
            <li><FiCheck /> Standard reporting</li>
            <li><FiCheck /> Essential tools</li>
          </ul>
        </div>


        {/* LOCKED PLAN 2 */}
        <div className="cardd card-blurred">
          <div className="locked-overlay">
            <FiLock className="lock-icon" />
            <p>Coming Soon</p>
          </div>

          <div className="badge badge-dark">Pro</div>
          <h3 className="plan-title">Pro Plan</h3>
          <ul className="feature-list">
            <li><FiCheck /> Full automation tools</li>
            <li><FiCheck /> Deep analytics</li>
            <li><FiCheck /> Everything unlimited</li>
          </ul>
        </div>

      </div>
    </section>

      <div className="sign-off">

            <h1>Skip the hassle, <br /> Let MediaPilot take care of it</h1>

           <div className="app">
              <button  onClick={startDemo}>Get a demo</button>
              <button onClick={joinWaitlist} >Join the waitlist</button>
          </div>

      </div>
      
    </div>
  )
}

export default Home
