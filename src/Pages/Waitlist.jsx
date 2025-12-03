import React, { useState } from 'react';
// Import necessary Firebase tools
import { collection, addDoc, serverTimestamp } from "firebase/firestore"; 
import { txtdb } from '../firebase-config'; // <-- Make sure this path is correct
import { FaInstagram } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa6";
import { FaXTwitter } from "react-icons/fa6";
import { FaFacebookF } from "react-icons/fa";
import { NavLink } from 'react-router-dom';
// 1. Import Framer Motion
import { motion } from 'framer-motion';

export default function Waitlist() {
    const [email, setEmail] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [status, setStatus] = useState(''); 

    const handleSubscribe = async (e) => {
        e.preventDefault(); 
        
        if (!email || isSubmitting) return;

        setIsSubmitting(true);
        setStatus(''); 

        try {
            const waitlistRef = collection(txtdb, "waitlist");
            
            await addDoc(waitlistRef, {
                email: email,
                joinedAt: serverTimestamp()
            });

            setStatus('success');
            setEmail(''); 

        } catch (error) {
            console.error("Error saving to Firebase:", error);
            setStatus('error'); 
        } finally {
            setIsSubmitting(false);
        }
    };

    // 2. Define Animation Variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { 
            opacity: 1,
            transition: { 
                staggerChildren: 0.2, // Delays each child by 0.2s
                delayChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 }, // Start invisible and 30px down
        visible: { 
            opacity: 1, 
            y: 0, 
            transition: { duration: 0.6, ease: "easeOut" } 
        }
    };

    return (
        <div className="waitlist-container">

            {/* 3. Turn the main content wrapper into a motion.div */}
            <motion.div 
                className="waitlist-container-content"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >

                <motion.div className="join-head" variants={itemVariants}>
                    Join the Waitlist
                </motion.div>

                <motion.h1 variants={itemVariants}>
                    The Future of PR is Arriving.
                </motion.h1>

                <motion.p className="sub-text" variants={itemVariants}>
                    Stop guessing how to get featured. <strong>MediaPilot</strong> gives you the roadmap to dominate your niche. <br /> Get front-row access before we go public.
                </motion.p>

                <motion.form 
                    onSubmit={handleSubscribe} 
                    className="subscribe-block"
                    variants={itemVariants} // The form animates in as a block
                >
                    <div className="sub-button">
                        <input 
                            type="email" 
                            placeholder='yourmail@gmail.com' 
                            required 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            disabled={isSubmitting}
                        />
                        <motion.button 
                            type="submit" 
                            disabled={isSubmitting}
                            whileHover={{ scale: 1.05 }} // Added a subtle hover effect
                            whileTap={{ scale: 0.95 }}
                        >
                            {isSubmitting ? 'Subscribing...' : 'Subscribe'}
                        </motion.button>
                    </div>

                    <motion.div className="socials" variants={itemVariants}>
                        <NavLink><FaFacebookF /></NavLink>
                        <NavLink><FaXTwitter /></NavLink>
                        <NavLink><FaInstagram /></NavLink>
                        <NavLink><FaLinkedinIn /></NavLink>
                    </motion.div>
                    
                    {/* Feedback Messages */}
                    {status === 'success' && (
                        <motion.p 
                            className="status-message success"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                        >
                            🎉 Success! You're on the list.
                        </motion.p>
                    )}
                    {status === 'error' && (
                        <motion.p 
                            className="status-message error"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                        >
                            Oops! Something went wrong. Please check your email or try again.
                        </motion.p>
                    )}
                </motion.form>

            </motion.div>

        </div>
    );
}