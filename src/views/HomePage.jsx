import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import Typewriter from '../components/TypeWriter';
import SwiperComponent from '../components/SwiperComponent';
import AboutTabs from '../components/AboutTabs';
import backgroundImg from '../img/IMG_0544.png';
import MyParticles from '../components/Particles';


import './Homepage.css';

gsap.registerPlugin(ScrollTrigger);
let isScrollingDown = false;


const HomePage = () => {
  const sectionRefs = useRef([]);
  const headerRef = useRef(null);
  const footerRef = useRef(null);
  const contentRefs = useRef([]);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);

  

  const setInitialBackgroundColors = () => {
    gsap.set(sectionRefs.current[0], { backgroundColor: '#00203FFF' }); 
    gsap.set(sectionRefs.current[1], {
      background: 'linear-gradient(to bottom, #7A875B, #3C96AE',
    });
    gsap.set(sectionRefs.current[2], {
      backgroundColor: '#7A907A' ,
    });
  };

  const toggleHeaderVisibility = () => {
    if (isScrollingDown) {
      // Hide the header when scrolling down
      gsap.to(headerRef.current, {
        duration: 0.3,
        y: -headerRef.current.clientHeight,
        onComplete: () => setIsHeaderVisible(false),
      });
    } else {
      // Show the header when scrolling up
      gsap.to(headerRef.current, {
        duration: 0.3,
        y: 0,
        onComplete: () => setIsHeaderVisible(true),
      });
    }
  };

  const sentences = [
    'Welcome to my portfolio',
    'I am passionate about web development',
    'Let\'s connect!',
  ];

  const updateBackgroundPosition = () => {
    gsap.utils.toArray(sectionRefs.current).forEach((section) => {
      const bg = section.querySelector('.bg');
      const scrollTrigger = ScrollTrigger.getById(section.id);
      if (scrollTrigger) {
        const progress = scrollTrigger.progress;
        const startPosY = scrollTrigger.start === 'top top' ? '0%' : '100%';
        const endPosY = scrollTrigger.end === 'bottom top' ? '0%' : '100%';
        gsap.to(bg, {
          backgroundPosition: `50% ${gsap.utils.interpolate(startPosY, endPosY, progress)}`,
          duration: 0.5,
          overwrite: 'auto',
        });
      }
    });
  };

  useEffect(() => {
    setInitialBackgroundColors();

    gsap.utils.toArray(sectionRefs.current).forEach((section) => {
      ScrollTrigger.create({
        trigger: section,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
        onRefresh: updateBackgroundPosition,
      });
    });

    gsap.utils.toArray(sectionRefs.current).forEach((section, i) => {
      ScrollTrigger.create({
        trigger: section,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
        onUpdate: (self) => {
          const progress = self.progress;
          const content = contentRefs.current[i];

          gsap.to(content, {
            opacity: 2 - progress,
            y: -progress * 100,
            duration: 0.5,
            overwrite: 'auto',
          });
        },
      });
    });

    ScrollTrigger.addEventListener('scroll', updateBackgroundPosition);

    ScrollTrigger.create({
      trigger: sectionRefs.current[0], // Adjust the trigger element as needed
      start: 'top top',
      end: 'bottom top',
      onEnter: () => {
        isScrollingDown = false; // Set scrolling direction to up when entering the trigger area
        toggleHeaderVisibility();
      },
      onLeave: () => {
        isScrollingDown = true; // Set scrolling direction to down when leaving the trigger area
        toggleHeaderVisibility();
      },
    });
    
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());

      ScrollTrigger.removeEventListener('scroll', updateBackgroundPosition);
    };
  }, []);
  

  return (
    <>
      <div className="container">
        <header ref={headerRef}>
          <h1>OSO</h1>
        </header>

{/* Section 1 */}
<section className="scroll-section" ref={(el) => (sectionRefs.current[0] = el)} style={{ backgroundImage: `url(${backgroundImg})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}>
  <div className="bg"></div>
  <div className="content" ref={(el) => (contentRefs.current[0] = el)}>
    <div className="left-aligned-content">
    <h3>Hello world!</h3>
    <h1>I'm Oscar Schou</h1>
    {/* <div className="profile-picture">
  <video autoPlay loop muted playsInline className="profile-video">
    <source src={profileVid} type="video/mp4" />
    Your browser does not support the video tag.
  </video>
    </div> */}
    <h2>Frontend Developer</h2>
    <div className='typewrite'>
      <Typewriter
        sentences={sentences}
        typingSpeed={100} 
        deletingSpeed={70} 
        pauseTime={1000} 
      />
    </div>
    <h4 className='text'>
      I am presently engaged in freelance work,<br/> but am actively seeking new opportunities for full-time employment to take on fresh challenges.<br/>Reach out for a chat!
    </h4>
    <div className="social-buttons">
  <a href="https://github.com/saltlakrids" target="_blank" rel="noopener noreferrer">
    <FontAwesomeIcon icon={faGithub} size="2x" className="social-icon github-icon" />
  </a>
  <a href="https://www.linkedin.com/in/oscar-schou/" target="_blank" rel="noopener noreferrer">
    <FontAwesomeIcon icon={faLinkedin} size="2x" className="social-icon linkedin-icon" />
  </a>
</div>
</div>

  </div>
</section>

  {/* Section 2 */}
  <section className="scroll-section" ref={(el) => (sectionRefs.current[1] = el)}>
          <div className="bg"></div>
          <div className="content" ref={(el) => (contentRefs.current[1] = el)}>
            {/* Replace this with your Section 3 content (Projects) */}
            <h1 className='left-aligned-content-two'>Projects</h1>
            <SwiperComponent />
          </div>
        </section>

        {/* Section 3 */}
        <section className="scroll-section" ref={(el) => (sectionRefs.current[2] = el)}>
          <div className="bg"></div>
          <div className="content" ref={(el) => (contentRefs.current[2] = el)}>
            {/* Replace this with your Section 2 content (About Me) */}
            <h1 className='left-aligned-content-three'>About me</h1>
            <AboutTabs />
          </div>
        </section>

      

        {/* Add more sections if needed */}

        <footer ref={footerRef}>
          <h1>Footer</h1>
        </footer>
      </div>
    </>
  );
};

export default HomePage;
