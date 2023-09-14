import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

import ScrollTrigger from 'gsap/ScrollTrigger';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import Typewriter from '../components/TypeWriter';
import SwiperComponent from '../components/SwiperComponent';
import AboutTabs from '../components/AboutTabs';
import './Homepage.css';

gsap.registerPlugin(ScrollTrigger);

const HomePage = () => {
  const sectionRefs = useRef([]);
  const headerRef = useRef(null);
  const footerRef = useRef(null);
  const contentRefs = useRef([]);

  const setInitialBackgroundColors = () => {
    gsap.set(sectionRefs.current[0], { backgroundColor: '#00203FFF' }); // Dark gray
    gsap.set(sectionRefs.current[1], { backgroundColor: '#ADEFD1FF' }); // Light gray
    gsap.set(sectionRefs.current[2], { backgroundColor: '#00203FFF' }); // Dark gray
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

    // Replace the content inside these sections with your own
    // Section 1 content
    gsap.to(contentRefs.current[0], {
      // Your animations and styles for section 1 content
    });

    // Section 2 content (About Me)
    gsap.to(contentRefs.current[1], {
      // Your animations and styles for section 2 content (About Me)
    });

    // Section 3 content (Projects)
    gsap.to(contentRefs.current[2], {
      // Your animations and styles for section 3 content (Projects)
    });

    // ... Add more sections if needed ...

    // Increase the frequency of background position updates when scrolling
    ScrollTrigger.addEventListener('scroll', updateBackgroundPosition);

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());

      // Remove the scroll event listener when component unmounts
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
        <section className="scroll-section" ref={(el) => (sectionRefs.current[0] = el)}>
          <div className="bg"></div>
          <div className="content" ref={(el) => (contentRefs.current[0] = el)}>
            {/* Replace this with your Section 1 content */}
            <h3>Hello world!</h3>
            <h1>I'm Oscar Schou</h1>
            <h2>Frontend Developer</h2>
            <div className='typewrite'>
              <Typewriter
                sentences={sentences}
                typingSpeed={100} 
                deletingSpeed={70} 
                pauseTime={1000} 
              />
            </div>
            <h4>I am presently engaged in freelance work but am actively seeking new opportunities for full-time employment to take on fresh challenges.</h4>
          </div>
        </section>

        {/* Section 2 */}
        <section className="scroll-section" ref={(el) => (sectionRefs.current[1] = el)}>
          <div className="bg"></div>
          <div className="content" ref={(el) => (contentRefs.current[1] = el)}>
            {/* Replace this with your Section 2 content (About Me) */}
            <h1>About me</h1>
            <AboutTabs />
          </div>
        </section>

        {/* Section 3 */}
        <section className="scroll-section" ref={(el) => (sectionRefs.current[2] = el)}>
          <div className="bg"></div>
          <div className="content" ref={(el) => (contentRefs.current[2] = el)}>
            {/* Replace this with your Section 3 content (Projects) */}
            <h1>Projects</h1>
            <SwiperComponent />
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
