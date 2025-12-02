import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '../../stock/mediapilotlogo.png';
import {
  Building2,
  Camera,
  Star,
  Landmark,
  Briefcase,
  Heart,
  HelpCircle,
  Check
} from "lucide-react";
import {
  Newspaper,
  Trophy,
  BarChart3,
  Megaphone,
  CheckCircle, 
  Shield
} from "lucide-react";


const steps = ['welcome', 'userType', 'goals', 'done'];

const userTypes = [
  { id: "brand", label: "Brand / Company", icon: <Building2 size={20} /> },
  { id: "creator", label: "Creator/Influencer", icon: <Camera size={20} /> },
  { id: "personal", label: "Personal Brand", icon: <Star size={20} /> },
  { id: "political", label: "Political Figure", icon: <Landmark size={20} /> },
  { id: "agency", label: "PR Agency / Consultant", icon: <Briefcase size={20} /> },
  { id: "nonprofit", label: "Non-Profit / NGO", icon: <Heart size={20} /> },
  { id: "other", label: "Other", icon: <HelpCircle size={20} /> },
];

const goals = [
  { id: 'featured', label: 'Get featured in press', icon: <Newspaper size={18} /> },
  { id: 'build-credibility', label: 'Build credibility & authority', icon: <Trophy size={18} /> },
  { id: 'grow-audience', label: 'Grow my audience', icon: <BarChart3 size={18} /> },
  { id: 'manage-pr', label: 'Run PR campaigns', icon: <Megaphone size={18} /> },
  { id: 'crisis', label: 'Crisis & reputation management', icon: <Shield size={18} /> },
];

function Onboarding() {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedType, setSelectedType] = useState('');
  const [selectedGoals, setSelectedGoals] = useState([]);

  const navigate = useNavigate();

  const next = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      localStorage.setItem('onboarding', JSON.stringify({ type: selectedType, goals: selectedGoals }));
      navigate('/dashboard');
    }
  };

  const prev = () => setCurrentStep(Math.max(0, currentStep - 1));

  return (
    <div className="onboarding-wrapper">
      {/* Floating Background Decor */}
      <div className="floating-bg">
        <div className="coffee-cup" />
      </div>

      <div className="onboarding-content">
        {/* Logo + Progress */}
        <header className="onboarding-header">
          <img src={logo} alt="MediaPilot" className="logo-small" />
          <div className="progress-bar">
            {steps.map((_, i) => (
              <div
                key={i}
                className={`progress-dot ${i <= currentStep ? 'active' : ''}`}
              />
            ))}
          </div>
        </header>

        <AnimatePresence mode="wait">
          {/* Step 1: Welcome */}
          {currentStep === 0 && (
            <motion.div
              key="welcome"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="step-card large"
            >
              <h1>Let’s get you set up</h1>
              <p className="subtitle">
                Takes less than a minute. Then you can start getting featured.
              </p>
              <button onClick={next} className="btn-primary">
                Get Started →
              </button>
            </motion.div>
          )}

          {/* Step 2: Who are you? */}
          {currentStep === 1 && (
            <motion.div
              key="type"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="step-card"
            >
              <h2>Who are you?</h2>
              <p className="subtitle">This helps us personalize your experience</p>

              <div className="options-grid">
                {userTypes.map((type) => (
                    <button
            key={type.id}
            onClick={() => setSelectedType(type.id)}
            className={`option-chip ${selectedType === type.id ? 'selected' : ''}`}
          >
            <span className="chip-icon">{type.icon}</span>
            {type.label}

            {selectedType === type.id && (
              <span className="check">
                <Check size={18} strokeWidth={3} />
              </span>
            )}
          </button>

                ))}
              </div>

              <div className="step-actions">
                <button onClick={prev} className="btn-text">Back</button>
                <button
                  onClick={next}
                  disabled={!selectedType}
                  className="btn-primary"
                >
                  Continue
                </button>
              </div>
            </motion.div>
          )}

          {/* Step 3: Your Goals */}
          {currentStep === 2 && (
            <motion.div
              key="goals"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="step-card"
            >
              <h2>What do you want to achieve?</h2>
              <p className="subtitle">Select all that apply</p>

              <div className="options-grid">
                {goals.map((goal) => (
                  <button
                key={goal.id}
                onClick={() =>
                  setSelectedGoals((prev) =>
                    prev.includes(goal.id)
                      ? prev.filter((g) => g !== goal.id)
                      : [...prev, goal.id]
                  )
                }
                className={`option-chip ${selectedGoals.includes(goal.id) ? 'selected' : ''}`}
              >
                <span className="chip-icon">{goal.icon}</span>
                {goal.label}

                {selectedGoals.includes(goal.id) && (
                  <span className="check">
                    <Check size={18} strokeWidth={3} />
                  </span>
                )}
              </button>

                ))}
              </div>

              <div className="step-actions">
                <button onClick={prev} className="btn-text">Back</button>
                <button
                  onClick={next}
                  disabled={selectedGoals.length === 0}
                  className="btn-primary"
                >
                  {selectedGoals.length > 0 ? 'Finish Setup →' : 'Skip for now'}
                </button>
              </div>
            </motion.div>
          )}

          {/* Step 4: All Done! */}
          {currentStep === 3 && (
           <motion.div
          key="done"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="step-card large"
        >
          <div className="success-icon">
            <CheckCircle size={48} />
          </div>

          <h1>You're all set!</h1>

          <p className="subtitle">
            Your MediaPilot workspace is ready.  
         You’re ready to begin building your story.
          </p>

          <button onClick={next} className="btn-primary">
            Start Your Dashboard →
          </button>
        </motion.div>

          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default Onboarding;