import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestion } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';

const Loader = () => {
  return (
    <div className="loader-container">
      <div className="button-with-icon loader">
        <p className="loader-text">Enter then..</p>
      </div>
    </div>
  );
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

    // Simulate loading for 2 seconds
    setTimeout(() => {
      setIsLoading(false);
      navigate('/homepage'); // Navigate to the homepage
    }, 1500);
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