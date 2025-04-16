import React, { useState } from 'react';
import './App.css';
import solarPanelImage from './assets/solar_panel_home.jpg';
import savings from './assets/saving.png';
import maintenance from './assets/maintenance.png';
import equipment from './assets/equipment.png';
import price from './assets/bestprice.png';
import partner from './assets/partner_logo.png';
import solarPanelImage1 from './assets/solar1.jpg';
import solarPanelImage2 from './assets/solar2.jpg';
import solarPanelImage3 from './assets/solar3.jpg';
import mainlogo from './assets/implogo.png';
import headerlogo from './assets/header_logo.png';
import backgroundimage2 from './assets/backgroundimage2.png';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useNavigate, useParams } from 'react-router-dom';
// import Chat from './components/chats/chat';
// import InitialPage from './components/InitialPage/InitialPage';
import Assessment from './components/Assesment/Assesment';
import ChatBox from './components/ChatBox/ChatBox';
import { UIProvider } from './context/UiContext';

function App() {
  return (
    <UIProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<HomePage />} />
          {/* <Route path="/chat/:userId" element={<ChatPage />} /> */}
          <Route path="/InitialAssesment/:userId" element={<InitialAssesment/>} />
        </Routes>
      </BrowserRouter>
    </UIProvider>
  );
}

function HomePage() {
  const [formData, setFormData] = useState({
    address: '',
    electricBill: 200
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showAssessment, setShowAssessment] = useState(false);

  const handleSubmit = async (e) => {
    console.log('Form submitted:', formData);
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/register_user`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          address: formData.address,
          monthly_bill: formData.electricBill
        })
      });

      const result = await response.json();
      if (result.status === true) {
        const userId = result.user_id;
        console.log("result", result);
        console.log("userId :", userId);
        // console.log("now we can go to chat page")
        // navigate('/chat/' + userId);
        // navigate('/InitialAssesment/' + userId);
        setShowAssessment(true);
      } else {
        console.log("Something went wrong!");
        console.error(result.message);
      }
    } catch (error) {
      console.log("Something went wrong!");
      console.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const navigate = useNavigate();

  return (
    <div className="app">
      <header className="header">
        <div className="logo">
          <img src={headerlogo} alt="SunnyAI" style={{ height: '20px', width: 'auto' }} />
        </div>
        <nav>
          <a href="/" className="nav-link">Home</a>
          <a href="/about" className="nav-link">About Us</a>
        </nav>
      </header>

      <main className="hero">
        <h1 className="hero-title">Choose Sunny.</h1>
        <h2 className="hero-subtitle">Because solar shouldn't be shady.</h2>
        <p className="hero-text">Get a complete, free solar offer in less than 5 mins!</p>
        <p className="hero-cta">Get started below!</p>

        <form className="solar-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group half-width">
              <label>Property Address</label>
              <div className="input-wrapper">
                <span className="input-icon">📍</span>
                <input
                  type="text"
                  placeholder="123 Fontana St. etc"
                  value={formData.address}
                  onChange={(e) => setFormData({...formData, address: e.target.value})}
                  required
                />
              </div>
            </div>

            <div className="form-group half-width">
              <label>Last Month Electric Bill</label>
              <div className="input-wrapper">
                <span className="input-icon">$</span>
                <input
                  type="number"
                  value={formData.electricBill}
                  onChange={(e) => setFormData({...formData, electricBill: e.target.value})}
                  required
                />
              </div>
            </div>
          </div>

          <button 
            type="submit" 
            disabled={isLoading}
            className="submit-button"
          >
            {isLoading ? (
              <span className="spinner">Loading...</span>
            ) : (
              'See My Savings Now'
            )}
          </button>
        </form>

        {showAssessment && (
          <div className="assessment-page">
            <Assessment />
          </div>
        )}
      </main>
      
      <div className="banner">
        <div className="carousel-container">
          <div className="carousel-slide">
            Act fast to get your $3,000 sign up bonus!
          </div>
          <div className="carousel-slide">
            Act fast to get your $3,000 sign up bonus!
          </div>
          <div className="carousel-slide">
            Act fast to get your $3,000 sign up bonus!
          </div>
        </div>
      </div>
      <section className="benefits">
        <h2 className="timeline-title">In the next 5 mins</h2>
        
        <div className="benefits-container">
          <div className="benefits-image">
            <img src={solarPanelImage} alt="House with solar panels" />
          </div>
          
          <div className="benefits-cards">
            <div className="benefit-card card-1">
              <div className="benefit-icon">
              <h4><span role="img" aria-label="sun">🌞</span> Finalize your entire solar design</h4>
              </div>
              <div className="benefit-content">     
                <p>
                  With just your address and monthly bill, Sunny's team of AI-experts create a custom solar plan in minutes—
                  <span className="highlight">no endless sales calls, no surprise changes down the road.</span>
                </p>
              </div>
            
              <div className="benefit-icon">
                <h4><span role="img" aria-label="sun">🌞</span> Secure your lowest-cost financing</h4>
              </div>
              <div className="benefit-content">
                <p>
                  You start saving in month one. Our AI finds the lowest-cost lease option, ensuring your new solar bill is always lower than your current electricity bill— plus 
                  <span className="highlight">no upfront payment required.</span>
                </p>
              </div>
            
              <div className="benefit-icon">
                <h4><span role="img" aria-label="sun">🌞</span> Schedule your installation survey!</h4>
              </div>
              <div className="benefit-content">
                <p>
                  We only work with installation partners who prioritize customer service and efficiency as much as we do. That means 
                  <span className="highlight">clear availability and quick turnarounds to getting your system up and running.</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="comparison">
        <h1 className="comparison-title text-center">
          A brand <span className="highlight">new day</span> in solar
        </h1>
        <h2 className="comparison-subtitle text-center">Always on your side</h2>
        
        <div className="comparison-card">
          <h3 className="timeline-heading text-center">Solar on your timeline, not a salesperson's</h3>
          
          <div className="comparison-content">
            <div className="comparison-side">
              <div className="comparison-boxes-row">
                <div className="comparison-box sunny" >
                  <p className="text-center">Other solar companies take 2-4 weeks and 3-6 calls to gather piecemeal information and revise your proposal</p>
                </div>
                
                <div className="vs-circle">VS </div>
                
                <div className="comparison-box sunny" >
                  <p className="text-center">
                    <span className="highlight">With Sunny</span>, you instantly get your entire proposal, pricing, and final contract—all on demand, fully transparent, and online.
                  </p>
                </div>
              </div>
            </div>
          </div>
        
          <h2 className="timeline-heading text-center">Solar without shadowy fees</h2>
      
          <div className="comparison-content">
            <div className="comparison-side">
              <div className="comparison-boxes-row">
                <div className="comparison-box">
                  <p className="text-center">Traditional solar companies stuff middlemen into your process so that they can bake hefty sales commissions into your price.</p>
                </div>
                
                <div className="vs-circle">VS</div>
                
                <div className="comparison-box sunny">
                  <p className="text-center">
                    <span className="highlight">With Sunny</span>, there are no middlemen—just the lowest possible price for you, on-demand and all online.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <h2 className="timeline-heading text-center">24/7 Personalized Support</h2>
      
          <div className="comparison-content">
            <div className="comparison-side">
              <div className="comparison-boxes-row">
                <div className="comparison-box">
                  <p className="text-center">Other companies hassle you non-stop with phone calls and text messages as they try to meet their sales quotas.</p>
                </div>
                
                <div className="vs-circle">VS</div>
                
                <div className="comparison-box sunny">
                  <p className="text-center">
                    <span className="highlight">With Sunny</span>, our team is always online and available to meet when you want to connect. We work for you - not for commissions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section className="hero-form" style={{ backgroundImage: `url(${backgroundimage2})` }}>
        
        <div className="hero-form-content">
          <h2>Get a complete, free solar offer in less than 5 mins!</h2>
          <p className="hero-form-subtitle">Get started below!</p>
          
          <div className="form-container">
            <div className="sun-icon">
              <svg viewBox="0 0 100 100" width="80" height="80">
                <circle cx="50" cy="50" r="25" fill="#FFD700" />
                <g fill="none" stroke="#FFD700" strokeWidth="4">
                  {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle) => (
                    <line
                      key={angle}
                      x1={50 + Math.cos((angle * Math.PI) / 180) * 30}
                      y1={50 + Math.sin((angle * Math.PI) / 180) * 30}
                      x2={50 + Math.cos((angle * Math.PI) / 180) * 40}
                      y2={50 + Math.sin((angle * Math.PI) / 180) * 40}
                    />
                  ))}
                </g>
              </svg>
            </div>
            
            <form className="quick-form">
              <div className="form-fields">
                <div className="input-group">
                  <label>Property Address.</label>
                  <div className="input-with-icon">
                    <span className="location-icon">📍</span>
                    <input type="text" placeholder="123 Fontana St. etc" />
                  </div>
                </div>
                
                <div className="input-group">
                  <label>Last Month Electric Bill</label>
                  <div className="input-with-icon">
                    <span className="dollar-icon">$</span>
                    <input type="number" placeholder="200" />
                  </div>
                </div>
              </div>
              
              <button className="savings-button">See My Savings Now</button>
            </form>
          </div>
        </div>
      </section>
      <div className="wave-divider">
          {/* You might want to add an SVG wave here */}
      </div>  
      <section className="guarantee">
        <h1 className="guarantee-title">Our SunnyAI Guarantee</h1>
        <p className="guarantee-subtitle">
          From design to installation to performance,
          we'll always do what's right and guarantee your satisfaction
        </p>

        <div className="guarantee-grid">
          <div className="guarantee-row">
            <div className="guarantee-card">
              <div className="guarantee-icon">
                <img src={savings} alt="Savings Guarantee" />
              </div>
              <h3>Savings Guarantee</h3>
              <p>
                Your system will generate the contracted 
                <span className="highlight-teal">savings for the lifetime of your lease.</span>
              </p>
            </div>

            <div className="guarantee-card">
              <div className="guarantee-icon">
                <img src={maintenance} alt="Maintenance Guarantee" />
              </div>
              <h3>Maintenance Guarantee</h3>
              <p>
                You focus on enjoying solar and savings. Our partners handle all
                <span className="highlight-teal">maintenance, repairs, and cleaning at no additional cost.</span>
              </p>
            </div>
          </div>

          <div className="guarantee-row">
            <div className="guarantee-card">
              <div className="guarantee-icon">
                <img src={equipment} alt="Equipment Guarantee" />
              </div>
              <h3>Equipment Guarantee</h3>
              <p>
                We only use the highest-quality solar panels and installers—backed by
                <span className="highlight"> a full 25-year warranty.</span>
              </p>
            </div>

            <div className="guarantee-card">
              <div className="guarantee-icon">
                <img src={price} alt="Best Price Guarantee" />
              </div>
              <h3>Best Price Guarantee</h3>
              <p>
                We design our programs to give you the lowest costs possible, and if you find anything lower
                <span className="highlight"> we match it.</span>
              </p>
            </div>
          </div>
        </div>
      </section>
    
      <section className="partners">
        <h1 className="partners-title">We team up with the best,</h1>
        <h1 className="partners-title">so <span className="highlight-teal">you get the most.</span></h1>
        
        <p className="partners-description highlight-teal">
          We carefully choose top pros who make going solar easy.<br />
          From permits to installation, we've got you covered.
        </p>

        <div className="partner-card">
          <div className="partner-logo">
            <img src={partner} alt="Castaways Energy LLC Logo" className="partner-icon" />
          </div>
          <div className="partner-info">
            <h3>Castaways Energy LLC.</h3>
            <div className="partner-rating">
              <span className="rating">5.0 ⭐</span>
              <span  >• 165 Google Reviews</span>
            </div>
          </div>
        </div>
      </section>

      <section className="reviews">
        <h2 className="reviews-title">What Our Customers Say</h2>
        <div className="reviews-container">
          <div className="review-card">
            <img src={solarPanelImage1} alt="Solar installation" className="review-image" />
            <div className="review-content">
              <div className="review-header">
                <div className="review-rating">5.0 ⭐⭐⭐⭐⭐</div>
                <div className="review-date">4 months ago</div>
              </div>
              <p className="review-text">
                "Very professional crew. The Aquaman crew knocked out the installation in just a few hours without sacrificing quality. Job very well done."
              </p>
            </div>
          </div>
          
          <div className="review-card">
            <img src={solarPanelImage2} alt="Solar installation" className="review-image" />
            <div className="review-content">
              <div className="review-header">
                <div className="review-rating">5.0 ⭐⭐⭐⭐⭐</div>
                <div className="review-date">4 months ago</div>
              </div>
              <p className="review-text">
                "The drago crew did a great job, and the attention to detail was a plus. Communicate with us to let us know how everything works. Did a great job cleaning after themselves, professionals, and friendly. Give them 10 out of 10. Recommended 100%. Thanks."
              </p>
            </div>
          </div>
          
          <div className="review-card">
            <img src={solarPanelImage3} alt="Solar installation" className="review-image" />
            <div className="review-content">
              <div className="review-header">
                <div className="review-rating">5.0 ⭐⭐⭐⭐⭐</div>
                <div className="review-date">9 months ago</div>
              </div>
              <p className="review-text">
                "Nice and clean work crew!"
              </p>
            </div>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="footer-content">
          <div className="footer-left">
            <div className="logo">
              <img src={mainlogo} alt="SunnyAI" style={{ height: '30px', width: 'auto', marginRight: '180px' }} />
            </div>
            <p>© SunnyAI LLC. 2025 • Privacy & Legal</p>
          </div>
          <div className="footer-right">
            <a href="/home">Home </a>
            <a href="/about">About Us</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

// function AboutPage() {
//   return (
//     <div>About Page</div>
//   );
// }

// function ChatPage() {
//   const { userId } = useParams();

//   return (
//     <div>
//       <div className="chat-page">
//         <Chat userId={userId} />
//       </div>
//       {/* <div>
//       <Chats />
//     </div> */}
//       {/* <div>
//       <ChatBox />
//     </div> */}
//     </div>
//   );
// }
function InitialAssesment() {
  const { userId } = useParams();
  
  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <div style={{ flex: '2', borderRight: '1px solid #ccc' }}>
        <Assessment userId={userId} />
      </div>
      <div style={{ flex: '1' }}>
        {/* <Chat userId={userId} /> */}
        <ChatBox />
      </div>
    </div>
  );
}

// export default App;
// ... existing code ...

// function Chats() {
//   const [messages, setMessages] = useState([]);
//   const [inputMessage, setInputMessage] = useState('');
//   const { userId } = useParams();

//   const handleSendMessage = async (e) => {
//     e.preventDefault();
//     if (!inputMessage.trim()) return;

//     // Add user message to chat
//     const newMessage = {
//       text: inputMessage,
//       sender: 'user',
//       timestamp: new Date().toISOString()
//     };
//     setMessages(prev => [...prev, newMessage]);
//     setInputMessage('');

//     try {
//       const response = await fetch(`${process.env.REACT_APP_BASE_URL}/save_chat`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           user_id: userId,
//           message: inputMessage
//         })
//       });

//       const result = await response.json();
//       if (result.status === true) {
//         // Add AI response to chat
//         setMessages(prev => [...prev, {
//           text: result.message,
//           sender: 'ai',
//           timestamp: new Date().toISOString()
//         }]);
//       }
//     } catch (error) {
//       console.error('Error sending message:', error);
//     }
//   };

//   return (
//     <div className="chat-container">
//       <div className="chat-messages">
//         {messages.map((message, index) => (
//           <div key={index} className={`message ${message.sender}`}>
//             <p>{message.text}</p>
//             <span className="timestamp">
//               {new Date(message.timestamp).toLocaleTimeString()}
//             </span>
//           </div>
//         ))}
//       </div>
//       <form className="chat-input-form" onSubmit={handleSendMessage}>
//         <input
//           type="text"
//           value={inputMessage}
//           onChange={(e) => setInputMessage(e.target.value)}
//           placeholder="Type your message..."
//         />
//         <button type="submit">Send</button>
//       </form>
//     </div>
//   );
// }

export default App;
