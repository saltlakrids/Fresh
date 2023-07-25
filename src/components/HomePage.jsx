import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import './Homepage.css';

gsap.registerPlugin(ScrollTrigger);

const HomePage = () => {
  const sectionRefs = useRef([]);

  const setInitialBackgroundPosition = () => {
    gsap.utils.toArray(sectionRefs.current).forEach((section, i) => {
      const bg = section.querySelector('.bg');
      const scrollTrigger = ScrollTrigger.getById(section.id);
      if (scrollTrigger) {
        const startPosY = scrollTrigger.start === 'top top' ? '0%' : '100%';
        gsap.set(bg, { backgroundPosition: `50% ${startPosY}` });
      }
    });
    ScrollTrigger.refresh(); // Refresh the ScrollTrigger after setting the initial background position
  };

  const updateBackgroundPosition = () => {
    gsap.utils.toArray(sectionRefs.current).forEach((section, i) => {
      const bg = section.querySelector('.bg');
      const scrollTrigger = ScrollTrigger.getById(section.id);
      if (scrollTrigger) {
        const progress = scrollTrigger.progress;
        const startPosY = scrollTrigger.start === 'top top' ? '0%' : '100%';
        const endPosY = scrollTrigger.end === 'bottom top' ? '0%' : '100%';
        gsap.to(bg, {
          backgroundPosition: `50% ${gsap.utils.interpolate(startPosY, endPosY, progress)}`,
          ease: 'none',
        });
      }
    });
  };

  useEffect(() => {
    gsap.utils.toArray(sectionRefs.current).forEach((section, i) => {
      const bg = section.querySelector('.bg');
      bg.style.backgroundImage = `url(https://picsum.photos/1600/800?random=${i})`;
    });

    ScrollTrigger.batch(sectionRefs.current, {
      onEnter: (batch) => gsap.to(batch, { opacity: 1, y: 0, stagger: 0.2, overwrite: true }),
      onLeave: (batch) => gsap.set(batch, { opacity: 0, y: 100, overwrite: true }),
      onEnterBack: (batch) => gsap.to(batch, { opacity: 1, y: 0, stagger: 0.2, overwrite: true }),
      onLeaveBack: (batch) => gsap.set(batch, { opacity: 0, y: -100, overwrite: true }),
      start: 'top 80%',
      end: 'bottom 20%',
    });

    setInitialBackgroundPosition();
  }, [setInitialBackgroundPosition]);

  return (
    <>
      <header>
        <h1>Header</h1>
      </header>

      <section className="scroll-section" ref={(el) => (sectionRefs.current[0] = el)}>
        <div className="bg"></div>
        <h1>Simple parallax sections</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vel sagittis sapien, vel varius urna. Vivamus in
          magna vel odio fringilla bibendum. Integer in tellus at velit cursus euismod vel sit amet ligula. Duis a aliquam
          odio. Nullam at hendrerit turpis. Fusce fringilla, metus ac tristique volutpat, justo arcu rhoncus neque, ut
          fringilla turpis nunc eu velit. Nam pharetra consectetur massa id rhoncus. Etiam vehicula libero in ipsum
          laoreet, vel egestas velit accumsan. Curabitur ac blandit massa. Sed eu ipsum consectetur, tempor elit nec,
          consectetur nunc. Ut egestas orci sit amet justo feugiat, eget pellentesque nunc posuere. Integer id ultrices
          orci.
        </p>
      </section>

      <section className="scroll-section" ref={(el) => (sectionRefs.current[1] = el)}>
        <div className="bg"></div>
        <h1>Simple parallax sections</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vel sagittis sapien, vel varius urna. Vivamus in
          magna vel odio fringilla bibendum. Integer in tellus at velit cursus euismod vel sit amet ligula. Duis a aliquam
          odio. Nullam at hendrerit turpis. Fusce fringilla, metus ac tristique volutpat, justo arcu rhoncus neque, ut
          fringilla turpis nunc eu velit. Nam pharetra consectetur massa id rhoncus. Etiam vehicula libero in ipsum
          laoreet, vel egestas velit accumsan. Curabitur ac blandit massa. Sed eu ipsum consectetur, tempor elit nec,
          consectetur nunc. Ut egestas orci sit amet justo feugiat, eget pellentesque nunc posuere. Integer id ultrices
          orci.
        </p>
      </section>

      <section className="scroll-section" ref={(el) => (sectionRefs.current[2] = el)}>
        <div className="bg"></div>
        <h1>Simple parallax sections</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vel sagittis sapien, vel varius urna. Vivamus in
          magna vel odio fringilla bibendum. Integer in tellus at velit cursus euismod vel sit amet ligula. Duis a aliquam
          odio. Nullam at hendrerit turpis. Fusce fringilla, metus ac tristique volutpat, justo arcu rhoncus neque, ut
          fringilla turpis nunc eu velit. Nam pharetra consectetur massa id rhoncus. Etiam vehicula libero in ipsum
          laoreet, vel egestas velit accumsan. Curabitur ac blandit massa. Sed eu ipsum consectetur, tempor elit nec,
          consectetur nunc. Ut egestas orci sit amet justo feugiat, eget pellentesque nunc posuere. Integer id ultrices
          orci.
        </p>
      </section>

      <footer>
        <h1>Footer</h1>
      </footer>
    </>
  );
};

export default HomePage;
