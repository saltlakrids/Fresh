import React, { useState } from 'react';

const AboutTabs = () => {
  const [activeTab, setActiveTab] = useState(1);

  const handleTabClick = (tabNumber) => {
    setActiveTab(tabNumber);
  };

  return (
    <div className="about-tabs-container">
      <div className="about-tabs">
        <div
          className={`about-tab ${activeTab === 1 ? 'active' : ''}`}
          onClick={() => handleTabClick(1)}
        >
          Work life
        </div>
        <div
          className={`about-tab ${activeTab === 2 ? 'active' : ''}`}
          onClick={() => handleTabClick(2)}
        >
          Hobbies
        </div>
        <div
          className={`about-tab ${activeTab === 3 ? 'active' : ''}`}
          onClick={() => handleTabClick(3)}
        >
          Fun fact
        </div>
      </div>
      <div className="tab-content">
        {activeTab === 1 && (
          <div>
            <div className="tab-content-row">
              <p>Content for Tab 1</p>
              <img src="image1.jpg" alt="Image 1" />
            </div>
          </div>
        )}
        {activeTab === 2 && (
          <div>
            <div className="tab-content-row">
              <p>Content for Tab 2</p>
              <img src="image2.jpg" alt="Image 2" />
            </div>
          </div>
        )}
        {activeTab === 3 && (
          <div>
            <div className="tab-content-row">
              <p>Content for Tab 3</p>
              <img src="image3.jpg" alt="Image 3" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AboutTabs;
