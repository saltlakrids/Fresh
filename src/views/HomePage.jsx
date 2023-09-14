import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import feature from '../img/feature-modern.png';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
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


  const setInitialBackgroundPosition = () => {
    gsap.utils.toArray(sectionRefs.current).forEach((section, i) => {
      const bg = section.querySelector('.bg');
      const scrollTrigger = ScrollTrigger.getById(section.id);
      if (scrollTrigger) {
        const startPosY = scrollTrigger.start === 'top top' ? '0%' : '100%';
        gsap.to(bg, { backgroundPosition: `50% ${startPosY}`, duration: 0 });
      }
    });
    ScrollTrigger.refresh();
  };

  const sentences = [
    'Welcome to my portfolio',
    'I am passioned about webdeveloping',
    'Lets connect!',
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
          duration: 0.5, // Reduce the duration for smoother scrolling
          overwrite: 'auto',
        });
      }
    });
  };

  useEffect(() => {
    gsap.utils.toArray(sectionRefs.current).forEach((section, i) => {
      const bg = section.querySelector('.bg');
      bg.style.backgroundImage = `url(https://picsum.photos/1600/800?random=${i})`;
    });

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
            opacity: 2 - progress, // Fade in content as you scroll down
            y: -progress * 100, // Move content up as you scroll down
            duration: 0.5,
            overwrite: 'auto',
          });
        },
      });
    });


    setInitialBackgroundPosition();

    // Increase the frequency of background position updates when scrolling
    ScrollTrigger.addEventListener('scroll', updateBackgroundPosition);

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());

      // Remove the scroll event listener when component unmounts
      ScrollTrigger.removeEventListener('scroll', updateBackgroundPosition);
    };
  }, []);
  

  useEffect(() => {
    gsap.utils.toArray(sectionRefs.current).forEach((section) => {
      ScrollTrigger.batch(section, {
        onEnter: (batch) => gsap.to(batch, { opacity: 1, y: 0, stagger: 0.2, overwrite: true }),
        onLeave: (batch) => gsap.set(batch, { opacity: 0, y: 100, overwrite: true }),
        onEnterBack: (batch) => gsap.to(batch, { opacity: 1, y: 0, stagger: 0.2, overwrite: true }),
        onLeaveBack: (batch) => gsap.set(batch, { opacity: 0, y: -100, overwrite: true }),
        start: 'top 90%',
        end: 'bottom 10%',
      });
    });

    ScrollTrigger.create({
      trigger: headerRef.current,
      start: 'top center',
      onEnter: () => gsap.fromTo(headerRef.current, { opacity: 0, y: -50 }, { opacity: 1, y: 0, duration: 1 }),
      onLeaveBack: () => gsap.to(headerRef.current, { opacity: 0, y: -50, duration: 1 }),
    });

    ScrollTrigger.create({
      trigger: footerRef.current,
      start: 'top bottom',
      onEnter: () => gsap.fromTo(footerRef.current, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1 }),
      onLeave: () => gsap.to(footerRef.current, { opacity: 0, y: 50, duration: 1 }),
      onEnterBack: () => gsap.fromTo(footerRef.current, { opacity: 0, y: -50 }, { opacity: 1, y: 0, duration: 1 }),
      onLeaveBack: () => gsap.to(footerRef.current, { opacity: 0, y: -50, duration: 1 }),
    });

    gsap.utils.toArray(contentRefs.current).forEach((content) => {
      ScrollTrigger.create({
        trigger: content,
        start: 'top 90%',
        end: 'bottom 10%',
        onEnter: (el) => gsap.fromTo(el, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1 }),
        onLeave: (el) => gsap.to(el, { opacity: 0, y: 50, duration: 1 }),
        onEnterBack: (el) => gsap.fromTo(el, { opacity: 0, y: -50 }, { opacity: 1, y: 0, duration: 1 }),
        onLeaveBack: (el) => gsap.to(el, { opacity: 0, y: -50, duration: 1 }),
      });
    });
  }, []);

  return (
    <>
      <div className="container">
        <header ref={headerRef}>
          <h1>OSO</h1>
        </header>

        <section className="scroll-section" ref={(el) => (sectionRefs.current[0] = el)}>
          <div className="bg"></div>
          <div className="content" ref={(el) => (contentRefs.current[0] = el)}>
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

        <section className="scroll-section" ref={(el) => (sectionRefs.current[1] = el)}>
          <div className="bg"></div>
          <div className="content" ref={(el) => (contentRefs.current[1] = el)}>
          <h1>About me</h1>
          <AboutTabs />
          </div>
        </section>

        <section className="scroll-section" ref={(el) => (sectionRefs.current[2] = el)}>
        <div className="bg"></div>
          <div className="content" ref={(el) => (contentRefs.current[2] = el)}>
          <h1>Projects</h1>
            <SwiperComponent />
          </div>
        </section>

        <footer ref={footerRef}>
          <h1>Footer</h1>
        </footer>
      </div>
    </>
  );
};

export default HomePage;
