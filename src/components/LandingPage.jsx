import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestion } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';

const Loader = () => {
  return <div className="loader">
          <div className="dot" style={{ background: '#ff0000' }}></div>
          <div className="dot" style={{ background: '#ff7f00' }}></div>
          <div className="dot" style={{ background: '#ffff00' }}></div>
          <div className="dot" style={{ background: '#00ff00' }}></div>
          <div className="dot" style={{ background: '#0000ff' }}></div>
  </div>;
};

const ButtonWithIcon = ({ onClick }) => {
  return (
    <div className="button-container">
      <button className="button-with-icon" onClick={onClick}>
        <FontAwesomeIcon icon={faQuestion} style={{ color: '#ffffff' }} />
      </button>
      <span>more..</span>
    </div>
  );
};

function LandingPage() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    setIsLoading(true);
    // Perform any necessary loading actions here (e.g., API requests)

    // Simulate loading for 2 seconds
    setTimeout(() => {
      setIsLoading(false);
      navigate('/homepage'); // Navigate to the homepage
    }, 2000);
  };

  return (
    <div className="landing-page">
      {isLoading ? (
        <Loader />
      ) : (
        <ButtonWithIcon onClick={handleClick} />
      )}
    </div>
  );
}

export default LandingPage;