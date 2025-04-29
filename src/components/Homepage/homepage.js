import React, { useState } from 'react';
import Assessment from '../Assesment/Assesment';
import ChatBox from '../ChatBox/ChatBox';
import solarPanelImage from '../../assets/solar_panel_home.jpg';
import savings from '../../assets/saving.png';
import maintenance from '../../assets/maintenance.png';
import equipment from '../../assets/equipment.png';
import price from '../../assets/bestprice.png';
import solarPanelImage1 from '../../assets/solar1.jpg';
import solarPanelImage2 from '../../assets/solar2.jpg';
import solarPanelImage3 from '../../assets/solar3.jpg';
import logo from '../../assets/logo.png';
import Theomano from '../../assets/theomano.png';
import hawaMahal from '../../assets/Hawa_mahal2.jpeg';
import './homepage.css';

function HomePage() {
    const [formData, setFormData] = useState({
      electricBill: 200
    });
    const [isLoading, setIsLoading] = useState(false);
    const [showAssessment, setShowAssessment] = useState(false);
    const [showChatWidget, setShowChatWidget] = useState(false);
  
    const handleSubmit = async (e) => {
      console.log('Form submitted:', formData);
      setShowAssessment(true);
      console.log("Monthly bill :", formData.electricBill);
      e.preventDefault();
    //   setIsLoading(true);
    //   try {
    //     const response = await fetch(`${process.env.REACT_APP_BASE_URL}/register_user`, {
    //       method: 'POST',
    //       headers: {
    //         'Content-Type': 'application/json',
    //       },
    //       body: JSON.stringify({
    //         monthly_bill: formData.electricBill
    //       })
    //     });
  
    //     const result = await response.json();
    //     if (result.status === true) {
    //       const userId = result.user_id;
    //       console.log("result", result);
    //       console.log("userId :", userId);
    //       // console.log("now we can go to chat page")
    //       // navigate('/chat/' + userId);
    //       // navigate('/InitialAssesment/' + userId);
    //       setShowAssessment(true);
    //     } else {
    //       console.log("Something went wrong!");
    //       console.error(result.message);
    //     }
    //   } catch (error) {
    //     console.log("Something went wrong!");
    //     console.error(error.message);
    //   } finally {
    //     setIsLoading(false);
    //   }
    };
  
  
    return (
      <div className="app">
        <header className="header">
          <div className="logo">
            <img
              src={Theomano}
              alt="Theomano"
              style={{ height: "40px", width: "auto" }}
            />
          </div>
          <nav>
            <a href="/" className="nav-link">
              Home
            </a>
            <a href="/" className="nav-link">
              About Us
            </a>
          </nav>
        </header>

        <main className="hero" style={{
          paddingTop: '2rem',
          background: `linear-gradient(to bottom, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.1)), url(${hawaMahal}) center 30%/cover`
        }}>
          <h1 className="hero-title">Choose Solar</h1>
          <h2 className="hero-subtitle">Because solar shouldn't be shady.</h2>
          <p className="hero-text">
            Get Details of solar offer in less than 5 mins!
          </p>
          <p className="hero-cta">Get started below!</p>

          <form className="solar-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Last Month Electric Bill</label>
              <div className="input-button-wrapper">
                <div className="input-container">
                  <span className="input-icon"></span>
                  <input
                    type="number"
                    value={formData.electricBill}
                    onChange={(e) =>
                      setFormData({ ...formData, electricBill: e.target.value })
                    }
                    required
                    className="bill-input"
                  />
                </div>
                <button type="submit" disabled={isLoading} className="submit-button">
                  {isLoading ? <span className="spinner">Loading...</span> : "See My Savings"}
                </button>
              </div>
            </div>
          </form>

          {showAssessment && (
            <div className="assessment-page">
              <Assessment onClose={() => setShowAssessment(false)} />
            </div>
          )}
        </main>

        <div className="banner">
          <div className="carousel-container">
            <div className="carousel-slide">
            Turn sunshine into savings — power your life with the sun!
            </div>
            <div className="carousel-slide">
            Turn sunshine into savings — power your life with the sun!
            </div>
            <div className="carousel-slide">
            Turn sunshine into savings — power your life with the sun!
            </div>
          </div>
        </div>
        <section className="benefits">
          <h2 className="timeline-title">Solar Benifits in next 5 mins</h2>

          <div className="benefits-container">
            <div className="benefits-image">
              <img src={solarPanelImage} alt="House with solar panels" />
            </div>

            <div className="benefits-cards">
              <div className="benefit-card card-1">
                <div className="benefit-item">
                  <div className="benefit-icon">
                    <h4>
                      <span role="img" aria-label="sun">
                        🌞
                      </span>{" "}
                       Lower Electricity Bills
                    </h4>
                  </div>
                  <div className="benefit-content">
                    <p>
                    Solar panels allow you to generate your own electricity, significantly reducing or even eliminating your monthly utility bills.
                     With net metering, you can also send excess power back to the grid and earn credits, 
                      <span className="highlight"> maximizing your savings over time.</span>
                    </p>
                  </div>
                </div>

                <div className="benefit-item">
                  <div className="benefit-icon">
                    <h4>
                      <span role="img" aria-label="sun">
                        🌍
                      </span>{" "}
                      Environmentally Friendly
                    </h4>
                  </div>
                  <div className="benefit-content">
                    <p>
                    Solar energy is clean, renewable, and sustainable. It helps reduce greenhouse gas emissions, air pollution,
                    and our dependence on fossil fuels, making it a powerful way to 
                      <span className="highlight"> fight climate change and protect the planet for future generations.</span>
                    </p>
                  </div>
                </div>

                <div className="benefit-item">
                  <div className="benefit-icon">
                    <h4>
                      <span role="img" aria-label="sun">
                       💰
                      </span>{" "}
                      Long-Term Investment
                    </h4>
                  </div>
                  <div className="benefit-content">
                    <p>
                    Installing solar adds value to your property and protects you from rising energy costs. With government incentives, tax credits, 
                    and low maintenance requirements, solar systems typically pay for themselves within a few years and 
                      <span className="highlight"> continue generating savings for decades to come.</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="comparison">
          <h1 className="comparison-title text-center">
            A brand <span className="highlight">new day</span> in solar
          </h1>
          <h2 className="comparison-subtitle text-center">
            Always on your side
          </h2>

          <div className="comparison-card">
            <h3 className="timeline-heading text-center">
              Benifits of solar panel
            </h3>

            <div className="comparison-content">
              <div className="comparison-side">
                <div className="comparison-boxes-row">
                  <div className="comparison-box">
                    <p className="text-center">
                    Wallet friendly one time investment for 25 Years. Installing a solar power system will bring dividends through reduced electricity bills.

                    </p>
                  </div>

                  {/* <div className="vs-circle">VS </div> */}

                  <div className="comparison-box sunny">
                    <p className="text-center">
                      Sustainable carbon-free energy solutions such as solar are crucial in achieving our climate goals and the sustainable development agenda.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <h2 className="timeline-heading text-center">
              Better Grid Security
            </h2>

            <div className="comparison-content">
              <div className="comparison-side">
                <div className="comparison-boxes-row">
                  <div className="comparison-box">
                    <p className="text-center">
                    Growing solar energy adoption eases the power grid's burden, enhancing grid security. This results in fewer power cuts and increased resilience against disasters.
                    </p>
                  </div>

                  {/* <div className="vs-circle">VS</div> */}

                  <div className="comparison-box sunny">
                    <p className="text-center">
                      Solar production emits no harmful pollutants, making your contribution impactful in saving the environment.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <h2 className="timeline-heading text-center">
              Save on electricity bills
            </h2>

            <div className="comparison-content">
              <div className="comparison-side">
                <div className="comparison-boxes-row">
                  <div className="comparison-box">
                    <p className="text-center">
                    Installing solar panels significantly reduces monthly electricity bills and dependence on the power grid. According to long-term
                    forecast solar remains a cost-effective solution and long-term investment in the future.
                    </p>
                  </div>

                  {/* <div className="vs-circle">VS</div> */}

                  <div className="comparison-box sunny">
                    <p className="text-center">
                    Switching to solar energy is a smart and sustainable way to reduce your electricity bills while also lowering your environmental impact.
                    Whether you choose rooftop panels, community solar, going solar is a powerful investment in both your future and the planet.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* <div className="wave-divider"> */}
          {/* You might want to add an SVG wave here */}
        {/* </div> */}
        <section className="guarantee">
          <h1 className="guarantee-title">Theomano Guarantee</h1>
          <p className="guarantee-subtitle">
            From design to installation to performance, we'll always do what's
            right and guarantee your satisfaction
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
                  <span className="highlight-teal"> savings for the lifetime of your lease.</span>
                </p>
              </div>

              <div className="guarantee-card">
                <div className="guarantee-icon">
                  <img src={maintenance} alt="Maintenance Guarantee" />
                </div>
                <h3>Maintenance Guarantee</h3>
                <p>
                  You focus on enjoying solar and savings. Our partners handle
                  all
                  <span className="highlight-teal"> maintenance, repairs, and cleaning at no additional cost.</span>
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
                  We only use the highest-quality solar panels and
                  installers—backed by
                  <span className="highlight"> a full 25-year warranty.</span>
                </p>
              </div>

              <div className="guarantee-card">
                <div className="guarantee-icon">
                  <img src={price} alt="Best Price Guarantee" />
                </div>
                <h3>Best Price Guarantee</h3>
                <p>
                  We design our programs to give you the lowest costs possible,
                  and if you find anything lower
                  <span className="highlight"> we match it.</span>
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="partners">
          <h1 className="partners-title">We team up with the best,</h1>
          <h1 className="partners-title">
            so <span className="highlight-teal">you get the most.</span>
          </h1>

          <p className="partners-description highlight-teal">
            We carefully choose top pros who make going solar easy.
            <br />
            From permits to installation, we've got you covered.
          </p>
        </section>

        <section className="reviews">
          <h2 className="reviews-title">What Our Customers Say</h2>
          <div className="reviews-container">
            <div className="review-card">
              <img
                src={solarPanelImage1}
                alt="Solar installation"
                className="review-image"
              />
              <div className="review-content">
                <div className="review-header">
                  <div className="review-rating">5.0 ⭐⭐⭐⭐⭐</div>
                  <div className="review-date">4 months ago</div>
                </div>
                <p className="review-text">
                  "Very professional team. The Theomano team knocked out the
                  installation in just a few hours without sacrificing quality.
                  Job very well done."
                </p>
              </div>
            </div>

            <div className="review-card">
              <img
                src={solarPanelImage2}
                alt="Solar installation"
                className="review-image"
              />
              <div className="review-content">
                <div className="review-header">
                  <div className="review-rating">5.0 ⭐⭐⭐⭐⭐</div>
                  <div className="review-date">4 months ago</div>
                </div>
                <p className="review-text">
                  "The Theomano team did a great job, and the attention to detail
                  was a plus. Communicate with us to let us know how everything
                  works. Did a great job cleaning after themselves,
                  professionals, and friendly. Give them 10 out of 10.
                  Recommended 100%. Thanks."
                </p>
              </div>
            </div>

            <div className="review-card">
              <img
                src={solarPanelImage3}
                alt="Solar installation"
                className="review-image"
              />
              <div className="review-content">
                <div className="review-header">
                  <div className="review-rating">5.0 ⭐⭐⭐⭐⭐</div>
                  <div className="review-date">9 months ago</div>
                </div>
                <p className="review-text">"Nice and clean work Theomano team!"</p>
              </div>
            </div>
          </div>
        </section>

        <footer className="footer">
          <div className="footer-content">
            <div className="footer-left">
              <div className="logo">
                <img
                  src={Theomano}
                  alt="Theomano"
                  style={{
                    height: "40px",
                    width: "auto",
                    marginRight: "160px",
                  }}
                />
              </div>
              <p>© Theomano 2025 • Privacy & Legal</p>
            </div>
            <div className="footer-right">
              <a href="/home">Home </a>
              <a href="/about">About Us</a>
            </div>
          </div>
        </footer>

        <div className="chat-widget">
          <button
            className="chat-widget-button"
            onClick={() => setShowChatWidget(!showChatWidget)}
          >
            <img src={logo} alt="Chat" className="chat-widget-icon" />
          </button>

          {showChatWidget && (
            <div
              className="chat-widget-popup"
              style={{ position: "absolute", bottom: "0", right: "0" }}
            >
              <div className="chat-widget-header">
                <img src={logo} alt="SunnyAI" className="chat-header-logo" />
                <h3>CHATBOT</h3>
                <button
                  className="chat-close-button"
                  onClick={() => setShowChatWidget(false)}
                >
                  ×
                </button>
              </div>
              <div className="chat-widget-content">
                <ChatBox />
              </div>
            </div>
          )}
        </div>
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
//   function InitialAssesment() {
//     const { userId } = useParams();
    
//     return (
//       <div style={{ display: 'flex', height: '100vh' }}>
//         <div style={{ flex: '2', borderRight: '1px solid #ccc' }}>
//           <Assessment userId={userId} />
//         </div>
//         <div style={{ flex: '1' }}>
//           {/* <Chat userId={userId} /> */}
//           <ChatBox />
//         </div>
//       </div>
//     );
//   }
  
  // export default App;
  
export default HomePage;