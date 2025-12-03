import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
// --- FIREBASE IMPORTS ---
import { collection, addDoc, serverTimestamp } from "firebase/firestore"; 
import { txtdb } from '../firebase-config'; // Make sure this path points to your firebase.js file
// ------------------------
import {
  Building2, Camera, Star, Landmark, Briefcase, Heart, HelpCircle,
  Newspaper, Trophy, BarChart3, Megaphone, Shield,
  Check, CheckCircle, ArrowRight, Zap, Mail, X,
  Calendar, Mic2, FileText, Users, PieChart, MessageCircle
} from "lucide-react";

// --- Configuration Data ---

const steps = ['welcome', 'userType', 'goals', 'assessment', 'result'];

const userTypes = [
  { id: "brand", label: "Brand / Company", icon: <Building2 size={20} /> },
  { id: "creator", label: "Creator/Influencer", icon: <Camera size={20} /> },
  { id: "personal", label: "Personal Brand", icon: <Star size={20} /> },
  { id: "political", label: "Political Figure", icon: <Landmark size={20} /> },
  { id: "agency", label: "PR Agency", icon: <Briefcase size={20} /> },
  { id: "nonprofit", label: "Non-Profit", icon: <Heart size={20} /> },
  { id: "other", label: "Other", icon: <HelpCircle size={20} /> },
];

const goals = [
  { id: 'featured', label: 'Get featured in press', icon: <Newspaper size={18} /> },
  { id: 'build-credibility', label: 'Build credibility', icon: <Trophy size={18} /> },
  { id: 'grow-audience', label: 'Grow audience', icon: <BarChart3 size={18} /> },
  { id: 'manage-pr', label: 'Run PR campaigns', icon: <Megaphone size={18} /> },
  { id: 'crisis', label: 'Crisis management', icon: <Shield size={18} /> },
];

const quizQuestions = [
  { id: 1, question: "Do you have an updated press kit (bio, photos, brand story)?", yes: 15, no: 0 },
  { id: 2, question: "Have you been featured in any media (newspaper, blog, podcast)?", yes: 20, no: 0 },
  { id: 3, question: "Do you have a clear, consistent brand message across platforms?", yes: 12, no: 0 },
  { id: 4, question: "Are you actively pitching journalists or influencers monthly?", yes: 18, no: 0 },
  { id: 5, question: "Do you track media mentions or credibility signals?", yes: 10, no: 0 },
  { id: 6, question: "Do you have professional photos and a media-ready one-pager?", yes: 10, no: 0 },
  { id: 7, question: "Have you ever run a structured PR or media campaign?", yes: 15, no: 0 },
];

const features = [
  { icon: <Megaphone size={20} />, title: "Campaign Management", desc: "Plan strategies from start to finish." },
  { icon: <Mic2 size={20} />, title: "Book Media Slots", desc: "Request Radio/TV ads & interviews." },
  { icon: <FileText size={20} />, title: "Press Generator", desc: "AI-guided releases, jingles & briefs." },
  { icon: <Users size={20} />, title: "Verified Directory", desc: "Access journalists & influencers." },
  { icon: <PieChart size={20} />, title: "Impact Analytics", desc: "Track credibility & campaign results." },
  { icon: <MessageCircle size={20} />, title: "Advisor Support", desc: "Chat with Surthrive Media experts." },
];

export default function Onboarding() {
  const navigate = useNavigate();
  
  // --- State ---
  const [currentStep, setCurrentStep] = useState(0); 
  const [selectedType, setSelectedType] = useState('');
  const [selectedGoals, setSelectedGoals] = useState([]);
  
  const [quizIndex, setQuizIndex] = useState(0);
  const [score, setScore] = useState(0);
  // NEW: Store specific answers to save to DB
  const [quizAnswers, setQuizAnswers] = useState([]); 
  
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasJoined, setHasJoined] = useState(false);

  // --- Logic ---

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, steps.length - 1));
  const prevStep = () => setCurrentStep(prev => Math.max(0, prev - 1));

  const handleQuizAnswer = (isYes) => {
    // 1. Calculate Score
    const points = isYes ? quizQuestions[quizIndex].yes : quizQuestions[quizIndex].no;
    setScore(prev => prev + points);

    // 2. Record the specific answer
    setQuizAnswers(prev => [
      ...prev, 
      { 
        question: quizQuestions[quizIndex].question, 
        answer: isYes ? "Yes" : "No",
        pointsAwarded: points 
      }
    ]);

    // 3. Move to next
    if (quizIndex < quizQuestions.length - 1) {
      setQuizIndex(prev => prev + 1);
    } else {
      nextStep();
    }
  };

  const handleWaitlistSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;
    setIsSubmitting(true);
    
    try {
      // --- FIREBASE SAVE LOGIC ---
      
      // 1. Save detailed assessment data
      const assessmentRef = collection(txtdb, "assessments");
      const assessmentPromise = addDoc(assessmentRef, {
        email: email,
        userType: selectedType,
        goals: selectedGoals,
        finalScore: score,
        detailedAnswers: quizAnswers,
        submittedAt: serverTimestamp(),
        deviceInfo: navigator.userAgent // Optional: good for debugging
      });

      // 2. Save just the email to a clean waitlist
      const waitlistRef = collection(txtdb, "waitlist");
      const waitlistPromise = addDoc(waitlistRef, {
        email: email,
        score: score, // Useful to know if they are high value
        joinedAt: serverTimestamp()
      });

      // Execute both saves in parallel
      await Promise.all([assessmentPromise, waitlistPromise]);

      setHasJoined(true);
    } catch (error) {
      console.error("Error saving to Firebase:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const getScoreDetails = () => {
    if (score >= 80) return { level: "Media Darling", color: "text-emerald-500", icon: "👑" };
    if (score >= 60) return { level: "Rising Star", color: "text-blue-500", icon: "🌟" };
    if (score >= 40) return { level: "Hidden Gem", color: "text-purple-500", icon: "💎" };
    return { level: "Fresh Starter", color: "text-orange-500", icon: "🌱" };
  };

  const { level, color, icon } = getScoreDetails();

  return (
    <div className="onboarding-wrapper">
      <div className="floating-bg">
        <div className="coffee-cup" />
      </div>

      <div className="onboarding-content">
        {/* Header */}
        <header className="onboarding-header">
          <div className="logo-text">MediaPilot</div>
          {currentStep < 4 && (
            <div className="progress-bar">
              {steps.slice(0, 4).map((_, i) => (
                <div key={i} className={`progress-dot ${i <= currentStep ? 'active' : ''}`} />
              ))}
            </div>
          )}
        </header>

        <AnimatePresence mode="wait">
          
          {/* STEP 1: WELCOME */}
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
                Customize your workspace and get your baseline Media Credibility Score in under 60 seconds.
              </p>
              <button onClick={nextStep} className="btn-primary">
                Get Started <ArrowRight size={18} />
              </button>
            </motion.div>
          )}

          {/* STEP 2: USER TYPE */}
          {currentStep === 1 && (
            <motion.div
              key="type"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="step-card"
            >
              <h2>Who are you?</h2>
              <p className="subtitle">This helps us personalize your PR strategy.</p>
              <div className="options-grid">
                {userTypes.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setSelectedType(type.id)}
                    className={`option-chip ${selectedType === type.id ? 'selected' : ''}`}
                  >
                    <span className="chip-icon">{type.icon}</span>
                    {type.label}
                    {selectedType === type.id && <span className="check"><Check size={12} /></span>}
                  </button>
                ))}
              </div>
              <div className="step-actions">
                <button onClick={prevStep} className="btn-text">Back</button>
                <button onClick={nextStep} disabled={!selectedType} className="btn-primary">Continue</button>
              </div>
            </motion.div>
          )}

          {/* STEP 3: GOALS */}
          {currentStep === 2 && (
            <motion.div
              key="goals"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="step-card"
            >
              <h2>What are your goals?</h2>
              <p className="subtitle">Select all that apply.</p>
              <div className="options-grid">
                {goals.map((goal) => (
                  <button
                    key={goal.id}
                    onClick={() =>
                      setSelectedGoals((prev) =>
                        prev.includes(goal.id) ? prev.filter((g) => g !== goal.id) : [...prev, goal.id]
                      )
                    }
                    className={`option-chip ${selectedGoals.includes(goal.id) ? 'selected' : ''}`}
                  >
                    <span className="chip-icon">{goal.icon}</span>
                    {goal.label}
                    {selectedGoals.includes(goal.id) && <span className="check"><Check size={12} /></span>}
                  </button>
                ))}
              </div>
              <div className="step-actions">
                <button onClick={prevStep} className="btn-text">Back</button>
                <button onClick={nextStep} disabled={selectedGoals.length === 0} className="btn-primary">
                  Take Assessment <Zap size={18} />
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 4: QUIZ */}
          {currentStep === 3 && (
            <motion.div
              key="quiz"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              className="step-card large"
            >
              <div className="quiz-progress">
                <span>Question {quizIndex + 1} of {quizQuestions.length}</span>
                <div className="bar-bg">
                  <div className="bar-fill" style={{ width: `${((quizIndex + 1) / quizQuestions.length) * 100}%` }} />
                </div>
              </div>
              <h2 className="quiz-question">{quizQuestions[quizIndex].question}</h2>
              <div className="quiz-actions">
                <button onClick={() => handleQuizAnswer(true)} className="btn-option yes">
                  <CheckCircle size={20} /> Yes
                </button>
                <button onClick={() => handleQuizAnswer(false)} className="btn-option no">
                  <X size={20} /> Not yet
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 5: WAITLIST / RESULT */}
          {currentStep === 4 && (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="step-card extra-large"
            >
              {hasJoined ? (
                <div className="success-message">
                  <div className="icon-pulse"><Star size={40} /></div>
                  <h1>You're on the list!</h1>
                  <p>We've saved your score of <strong>{score}/100</strong>.</p>
                  <p>Keep an eye on your inbox—we'll notify you the moment you can start building your legacy.</p>
                </div>
              ) : (
                <>
                  {/* Top Section: Score */}
                  <div className="result-header">
                    <div className="score-badge-container">
                      <div className={`score-ring ${color}`}>
                        <span className="score-val">{score}</span>
                        <span className="score-max">/100</span>
                      </div>
                      <div className="score-details">
                        <span className="score-label">{icon} {level}</span>
                        <p>Great start. Now let's get you to 100.</p>
                      </div>
                    </div>
                  </div>

                  {/* Middle Section: The Future */}
                  <div className="future-section">
                    <h3>With MediaPilot, you will:</h3>
                    <div className="features-grid">
                      {features.map((f, i) => (
                        <motion.div 
                          key={i} 
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.1 }}
                          className="feature-item"
                        >
                          <div className="feature-icon">{f.icon}</div>
                          <div className="feature-text">
                            <strong>{f.title}</strong>
                            <span>{f.desc}</span>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Bottom Section: CTA */}
                  <div className="waitlist-section">
                    <p className="waitlist-text">
                      We are currently in private beta. Join the list to secure your spot.
                    </p>
                    <form onSubmit={handleWaitlistSubmit} className="waitlist-form">
                      <div className="input-wrapper">
                        <Mail className="input-icon" size={18} />
                        <input
                          type="email"
                          placeholder="Enter your email address"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                      </div>
                      <button type="submit" disabled={isSubmitting} className="btn-primary front-row">
                        {isSubmitting ? "Joining..." : "Get Front Row Access →"}
                      </button>
                    </form>
                  </div>
                </>
              )}
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
}