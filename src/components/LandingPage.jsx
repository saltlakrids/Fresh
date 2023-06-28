import React, { useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestion } from '@fortawesome/free-solid-svg-icons';
import './LandingPage.css';

const ButtonWithIcon = () => {
  return (
<div className="button-container">
        <button className="button-with-icon">
          <FontAwesomeIcon icon={faQuestion} style={{ color: '#ffffff' }} />
        </button>
        <span>more..</span>
      </div>
  );
};

function LandingPage() {
  const ref = useRef();

  return (
    <div className="landing-page">
      <ButtonWithIcon />
    </div>
  );
}

export default LandingPage;
