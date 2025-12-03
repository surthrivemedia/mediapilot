import { useState, useEffect } from "react";
import { FaInstagram, FaTwitter, FaLinkedin, FaWhatsapp } from "react-icons/fa";
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { txtdb } from "../firebase-config";


function Bookings() {
    const [showLinks, setShowLinks] = useState(false);

    const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [isForSelf, setIsForSelf] = useState(true);
  const [otherName, setOtherName] = useState('');
  const [venue, setVenue] = useState('Lagos, Nigeria');
  const [coverageType, setCoverageType] = useState('mobile');
  const [total, setTotal] = useState(20999);

  const dates = [];
  const today = new Date(2025, 11, 3); // December 03, 2025 (months are 0-indexed)
  for (let i = 0; i < 7; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    dates.push(date);
  }

  const times = [
    '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM'
  ];

  const coverageOptions = [
    { value: 'mobile', label: 'Mobile Coverage', available: true },
    { value: 'video', label: 'Video Coverage', available: true },
    { value: 'drone', label: 'Drone Coverage', available: false },
    { value: 'photography', label: 'Photography Coverage', available: false },
  ];

  useEffect(() => {
    // Update total if needed, but for now fixed per slot
    setTotal(20999);
  }, [coverageType]);

  const handleSubmit = async () => {
    try {
      const bookingData = {
        date: selectedDate?.toDateString(),
        time: selectedTime,
        name: isForSelf ? name : otherName,
        phone,
        forSelf: isForSelf,
        venue,
        coverageType,
        total,
        timestamp: new Date()
      };
      await addDoc(collection(txtdb, 'bookings'), bookingData);
      alert('Booking saved successfully!');
    } catch (error) {
      console.error('Error saving booking:', error);
      alert('Failed to save booking.');
    }
  };

  const handleCall = () => {
    window.location.href = 'tel:+1234567890'; // Replace with actual support number
  };

  return (
    <div className='bookings'>
        
          <div className="bookings-landing">

      <div className="bookings-landing-content">

      <h1>Book Media Coverage</h1>

      <p>
        Secure professional media support for your events, shows, and performances. <br />
        From journalists to videographers and photographers, get the right team to 
        capture your story, <br /> highlight key moments, and give your brand the attention it deserves.
      </p>

   <div className="next">
  <button>Get a reservation</button>

  <div className="call-box">
    <button onClick={() => setShowLinks(!showLinks)}>
      Call to book
    </button>

    <div className={`social-slide ${showLinks ? "show" : ""}`}>
      <a href="https://instagram.com/yourlink" target="_blank"><FaInstagram /></a>
      <a href="https://x.com/yourlink" target="_blank"><FaTwitter /></a>
      <a href="https://linkedin.com/yourlink" target="_blank"><FaLinkedin /></a>
      <a href="https://wa.me/yourNumber" target="_blank"><FaWhatsapp /></a>
    </div>
  </div>
</div>

    </div>

      </div>

     <div className="booking-container">

      <div className="left-panel">
        <h2>Select a Slot</h2>
        <div className="date-selector">
          <label>Select Date</label>
          <div className="dates">
            {dates.map((date, index) => (
              <button
                key={index}
                className={`date-btn ${selectedDate?.toDateString() === date.toDateString() ? 'selected' : ''}`}
                onClick={() => setSelectedDate(date)}
              >
                {date.toLocaleDateString('en-US', { weekday: 'short', day: 'numeric' })}
              </button>
            ))}
          </div>
        </div>
        <div className="time-selector">
          <label>Select Time</label>
          <div className="times">
            {times.map((time, index) => (
              <button
                key={index}
                className={`time-btn ${selectedTime === time ? 'selected' : ''}`}
                onClick={() => setSelectedTime(time)}
              >
                {time}
              </button>
            ))}
          </div>
        </div>
        <div className="booking-for">
          <label>Booking For</label>
          <div className="toggle">
            <button
              className={`toggle-btn ${isForSelf ? 'active' : ''}`}
              onClick={() => setIsForSelf(true)}
            >
              Self
            </button>
            <button
              className={`toggle-btn ${!isForSelf ? 'active' : ''}`}
              onClick={() => setIsForSelf(false)}
            >
              Somebody Else
            </button>
          </div>
          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {!isForSelf && (
            <input
              type="text"
              placeholder="Name of the Person"
              value={otherName}
              onChange={(e) => setOtherName(e.target.value)}
            />
          )}
          <input
            type="tel"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
      </div>

      <div className="right-panel">
        <h2>Booking Details</h2>
        <div className="coverage-selector">
          <label>Select Coverage Type</label>
          <select
            value={coverageType}
            onChange={(e) => setCoverageType(e.target.value)}
          >
            {coverageOptions.map((option) => (
              <option
                key={option.value}
                value={option.value}
                disabled={!option.available}
              >
                {option.label} {option.available ? '' : '(Unavailable)'}
              </option>
            ))}
          </select>
        </div>
        <div className="venue-editor">
          <label>Venue</label>
          <input
            type="text"
            value={venue}
            onChange={(e) => setVenue(e.target.value)}
          />
          <small>Currently available in Lagos only</small>
        </div>
        <div className="total">
          <span>Total Amount</span>
          <span>₦{total.toLocaleString()}</span>
        </div>
        <button className="proceed-btn" onClick={handleSubmit}>
          Proceed to Pay
        </button>
        <div className="call-section">
          <p>Or call to make the reservation</p>
          <button className="call-btn" onClick={handleCall}>
            Call Us: +234-806-157-7093
          </button>
        </div>
      </div>
    </div>

    </div>
  )
}

export default Bookings
