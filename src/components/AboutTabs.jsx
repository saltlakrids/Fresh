import React, { useState } from 'react';
import lottie from 'lottie-web';
import { defineElement } from 'lord-icon-element';

defineElement(lottie.loadAnimation);

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
          <lord-icon
    src="https://cdn.lordicon.com/jpqbjwbh.json"
    trigger="loop"
    colors="primary:#e8e230,secondary:#30e8bd"
    style={{width:"65px", heigth:"65px" }}
    >

</lord-icon>
        </div>
        
        <div
          className={`about-tab ${activeTab === 2 ? 'active' : ''}`}
          onClick={() => handleTabClick(2)}
        >
          Education
          <lord-icon
    src="https://cdn.lordicon.com/hursldrn.json"
    trigger="loop"
    colors="primary:#e8e230,secondary:#30e8bd"
    state="morph"
    style={{width:"65px", heigth:"65px" }}>
</lord-icon>
        </div>
        <div
          className={`about-tab ${activeTab === 3 ? 'active' : ''}`}
          onClick={() => handleTabClick(3)}
        >
          Hobbies
          <lord-icon
    src="https://cdn.lordicon.com/ohiikjpf.json"
    trigger="loop"
    colors="primary:#e8e230,secondary:#30e8bd"
    style={{width:"65px", heigth:"65px" }}>
</lord-icon>
        </div>
        <div
          className={`about-tab ${activeTab === 4 ? 'active' : ''}`}
          onClick={() => handleTabClick(4)}
        >
          Fun fact
          <lord-icon
    src="https://cdn.lordicon.com/psseymno.json"
    trigger="loop"
    colors="primary:#e8e230,secondary:#30e8bd"
    style={{width:"65px", heigth:"65px" }}>
</lord-icon>
        </div>
      </div>
      <div className="tab-content">
        {activeTab === 1 && (
          <div>
            <div className="tab-content-row active">
              <p>During my career as a frontend developer, I have gained experience in the realm of gamification, specializing in web development and custom solutions. My proficiency includes the utilization of technologies as Vue, React, Tailwind, API integration, and Node.js etc. to deliver innovative and impactful solutions. Should you wish to review my detailed qualifications, please feel free to reach out for my CV/resume.</p>
              <img src="image1.jpg" alt="Image 1" />
            </div>
          </div>
        )}
              {activeTab === 2 && (
          <div>
            <div className="tab-content-row active">
              <p>I earned an Advanced Professional (AP) degree with a strong focus on UX and frontend development. During my studies, I took on various projects and gained valuable experience through an internship at a software company. I'm proactive about staying up-to-date with the latest advancements in frontend development.</p>
              <img src="image3.jpg" alt="Image 3" />
            </div>
          </div>
        )}
        {activeTab === 3 && (
          <div>
            <div className="tab-content-row active">
              <p>In my free time, I enjoy a wide range of hobbies and activities. I'm an avid D&D player and an active member of a book club. I enjoy the outdoors with inline skating and stand-up paddleboarding. Additionally, I have a passion for app development where i have a project going with a mate. Staying healthy is important to me, and I try to prioritize my fitness, and occasionally i unwind with some pc gaming.</p>
              <img src="image2.jpg" alt="Image 2" />
            </div>
          </div>
        )}
        {activeTab === 4 && (
          <div>
            <div className="tab-content-row active">
              <p>I absolutely love karaoke, but I must admit that my singing skills are best enjoyed from a distance</p>
              <img src="image3.jpg" alt="Image 3" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AboutTabs;
