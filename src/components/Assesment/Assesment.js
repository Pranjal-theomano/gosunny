import React, { useState } from 'react';
import './Assesment.css';
import Details from '../Details/Details';

const Assessment = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const savingsData = {
    electricitySavings: { min: 140, max: 420 },
    signupBonus: 3000,
    panelCount: 21,
    solarCoverage: 99,
    totalSavings: { min: 3140, max: 3420 }
  };

  return (
    <div className="assessment-container">
      <h1 className="main-heading">Here's What You'll Save</h1>
      
      <div className="content-layout">
        <div className="left-column">
          {/* Savings Card */}
          <div className="card savings-card">
            <h2>Estimated Year 1 Savings</h2>
            <p className="down-payment">With $0 Down Payment</p>
            
            <div className="savings-details">
              <div className="savings-row">
                <p>Electricity Savings: ${savingsData.electricitySavings.min} - ${savingsData.electricitySavings.max}</p>
                <p className="bonus">Sign-up Bonus ${savingsData.signupBonus}</p>
              </div>
              <h2 className="total-savings">${savingsData.totalSavings.min} - ${savingsData.totalSavings.max}</h2>
            </div>
          </div>

          {/* Bonus Message */}
          {/* <div className="bonus-message">
            <p>Get a <span className="highlight">${savingsData.signupBonus}</span> check after installation!</p>
          </div> */}
        </div>

        <div className="right-column">
          {/* Stats Cards */}
          <div className="stats-layout">
            <div className="card panel-card">
              <h3>Panel Count</h3>
              <div className="number">{savingsData.panelCount}</div>
            </div>
            
            <div className="card coverage-card">
              <h3>Solar Coverage</h3>
              <p>Solar power will provide {savingsData.solarCoverage}% of your annual energy needs</p>
              <div className="coverage-circle">
                <div className="circle-progress" style={{ '--percentage': `${savingsData.solarCoverage}%` }}>
                  {savingsData.solarCoverage}%
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
            
      {/* Add Get Started Button */}
      <div className="cta-container">
        <button className="get-started-btn" onClick={() => setIsModalOpen(true)}>
          Get Started
        </button>
      </div>

      {/* Details Modal */}
      <Details isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default Assessment;
