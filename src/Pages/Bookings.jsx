import { useState, useEffect } from "react";
import { FaInstagram, FaLinkedin, FaWhatsapp } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { txtdb } from "../firebase-config";
import emailjs from "emailjs-com";


function Bookings() {
    const [showLinks, setShowLinks] = useState(false);

    const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [isForSelf, setIsForSelf] = useState(true);
  const [otherName, setOtherName] = useState('');
  const [venue, setVenue] = useState('');
  const [coverageType, setCoverageType] = useState('mobile');
  const [total, setTotal] = useState(20999);

  const [packageType, setPackageType] = useState("basic");


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

  const packageOptions = [
  {
    value: "basic",
    label: "₦50,000 — Basic Package (Good)",
    price: 50000,
    details: [
      "3 hours shoot",
      "Mobile video + photos",
      "1 highlight video (30–45s)",
      "10–15 edited photos",
      "Basic color correction",
      "Delivery in 48 hours"
    ]
  },
  {
    value: "standard",
    label: "₦75,000 — Standard Package (Better)",
    price: 75000,
    details: [
      "Up to 5 hours / half-day shoot",
      "Mobile video + photos",
      "Highlight video (45–60s)",
      "1 extra social clip (10–15s)",
      "20–30 edited photos",
      "Better color grading",
      "48–72 hours delivery",
      "One free revision"
    ]
  },
  {
    value: "premium",
    label: "₦100,000 — Premium Package (Best)",
    price: 100000,
    details: [
      "Full-day shoot",
      "Mobile video + photos",
      "1 highlight video (1min+)",
      "2 short videos (Reels/TikTok)",
      "30–40 edited photos",
      "Advanced color grading",
      "Smooth transitions",
      "24–48 hours delivery",
      "Two revisions",
      "Priority editing"
    ]
  }
];


  const coverageOptions = [
    { value: 'mobile', label: 'Mobile Coverage (Pictures & Videos) + Highlight Reel (Short Recap Video)', available: true },
    { value: 'drone', label: 'Drone Coverage', available: false },
    { value: 'photography', label: 'Pro Photography Coverage', available: false },
    { value: 'social_content', label: 'Social Media Content (Reels, Clips, BTS)', available: true },
    { value: 'video', label: 'Pro Video Coverage', available: false },



  ];

useEffect(() => {
  const selectedPkg = packageOptions.find(pkg => pkg.value === packageType);
  setTotal(selectedPkg.price);
}, [packageType]);


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

  const isFormValid = () => {
  if (!selectedDate) return false;
  if (!selectedTime) return false;
  if (!name.trim()) return false;
  if (!email.trim()) return false;
  if (!phone.trim()) return false;

  // If booking for someone else, otherName must be filled
  if (!isForSelf && !otherName.trim()) return false;

  if (!venue.trim()) return false;
  if (!coverageType.trim()) return false;

  return true;
};


  const handlePaystackPayment = () => {
      if (!isFormValid()) {
    alert("Please fill all fields before making payment.");
    return;
  }
  const paystackPublicKey = "pk_live_6b6b34b728c2107403298995f0b342599ea6358f";

  const handler = window.PaystackPop.setup({
    key: paystackPublicKey,
    email: email,             // user email
    amount: total * 100,      // total already calculated
    currency: 'NGN',
    callback: function(response) {
      // payment successful
      handleCheckout(response.reference);
    },
    onClose: function() {
      alert("Payment was not completed");
    }
  });

  handler.openIframe();
};

const handleCheckout = async (reference) => {
      try {
      const bookingData = {
      date: selectedDate?.toDateString(),
      time: selectedTime,
      name: isForSelf ? name : otherName,
      phone,
      email,
      forSelf: isForSelf,
      venue,
      coverageType,
      packageType,
      packageDetails: packageOptions.find(pkg => pkg.value === packageType)?.details,
      total,
      paid: true,
      reference,
      timestamp: new Date()
    };


    await addDoc(collection(txtdb, 'bookings'), bookingData);

    // ---- SEND EMAIL RECEIPT ----
    emailjs.send(
      "service_ycbpbtj",
      "template_ge0j6wt",
      {
        name: bookingData.name,
        email: bookingData.email,
        date: bookingData.date,
        time: bookingData.time,
        coverageType: bookingData.coverageType,
        venue: bookingData.venue,
        packageType: bookingData.packageType,
        packageDetails: bookingData.packageDetails.join(", "),
        total: bookingData.total.toLocaleString(),
        reference: bookingData.reference
      },
      "_PonQ_5Hbas6gVfNq"
    );


    alert('Payment successful! Your booking receipt has been emailed.');
  } catch (error) {
    console.error('Error saving booking:', error);
    alert('Failed to save booking.');
  }
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
        <a href="https://www.instagram.com/chiomaezenwafor?igsh=MWZyYjhyaHVzZ2J6eA%3D%3D&utm_source=qr" target="_blank" rel="noopener noreferrer">
          <FaInstagram />
        </a>

        <a href="https://x.com/chiomaezenwafo?s=21" target="_blank" rel="noopener noreferrer">
          <FaXTwitter  />
        </a>

        <a href="https://www.linkedin.com/in/chiomaezenwafor?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app" target="_blank" rel="noopener noreferrer">
          <FaLinkedin />
        </a>

        <a href="https://wa.me/message/RJTA5DU4I2HEG1" target="_blank" rel="noopener noreferrer">
          <FaWhatsapp />
        </a>
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
            <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
        <label>Select Package</label>
        <select
          value={packageType}
          onChange={(e) => setPackageType(e.target.value)}
        >
          {packageOptions.map((pkg) => (
            <option key={pkg.value} value={pkg.value}>
              {pkg.label}
            </option>
          ))}
        </select>
      </div>

      {packageOptions.find(pkg => pkg.value === packageType) && (
      <div className="package-details">
        <h3>Package Details</h3>
        <ul>
          {packageOptions
            .find(pkg => pkg.value === packageType)
            .details.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
        </ul>
      </div>
    )}



{/*  */}
        {/* <div className="coverage-selector">
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
        </div> */}
        {/*  */}
        <div className="venue-editor">
          <label>Venue</label>
          <input
            type="text"
            value={venue}
            onChange={(e) => setVenue(e.target.value)}
         placeholder="Enter the exact location, city, and state"
          />
          {/* <small>Currently available in Lagos only</small> */}
        </div>
        <div className="total">
          <span>Total Amount</span>
          <span>₦{total.toLocaleString()}</span>
        </div>
        <button className="proceed-btn" onClick={handlePaystackPayment}>
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
