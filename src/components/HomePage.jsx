import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import './Homepage.css';

gsap.registerPlugin(ScrollTrigger);

const HomePage = () => {
  const sectionRefs = useRef([]);
  const headerRef = useRef(null);
  const footerRef = useRef(null);

  const setInitialBackgroundPosition = () => {
    gsap.utils.toArray(sectionRefs.current).forEach((section, i) => {
      const bg = section.querySelector('.bg');
      const scrollTrigger = ScrollTrigger.getById(section.id);
      if (scrollTrigger) {
        const startPosY = scrollTrigger.start === 'top top' ? '0%' : '100%';
        gsap.to(bg, { backgroundPosition: `50% ${startPosY}`, duration: 0 }); // Use gsap.to with duration 0 to set initial position
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
          scrollTo: {
            y: gsap.utils.interpolate(startPosY, endPosY, progress),
          },
          ease: 'power2.out', // Adjust the ease to 'power3.out' for smoother effect
          overwrite: 'auto', // Let GSAP handle overwriting previous animations
        });
      }
    });
  };

  useEffect(() => {
    gsap.utils.toArray(sectionRefs.current).forEach((section, i) => {
      const bg = section.querySelector('.bg');
      bg.style.backgroundImage = `url(https://picsum.photos/1600/800?random=${i})`;
    });

    // Set up ScrollTrigger for each section
    gsap.utils.toArray(sectionRefs.current).forEach((section) => {
      ScrollTrigger.create({
        trigger: section,
        start: 'top bottom', // Change the start trigger to 'top bottom'
        end: 'bottom top', // Change the end trigger to 'bottom top'
        scrub: true,
        onRefresh: updateBackgroundPosition,
      });
    });

    setInitialBackgroundPosition();
  }, []);

  useEffect(() => {
    gsap.utils.toArray(sectionRefs.current).forEach((section) => {
      ScrollTrigger.batch(section, {
        onEnter: (batch) => gsap.to(batch, { opacity: 1, y: 0, stagger: 0.2, overwrite: true }),
        onLeave: (batch) => gsap.set(batch, { opacity: 0, y: 100, overwrite: true }),
        onEnterBack: (batch) => gsap.to(batch, { opacity: 1, y: 0, stagger: 0.2, overwrite: true }),
        onLeaveBack: (batch) => gsap.set(batch, { opacity: 0, y: -100, overwrite: true }),
        start: 'top 90%', // Adjust the start trigger to start the effect earlier
        end: 'bottom 10%', // Adjust the end trigger to continue the effect till the end of the scroll
      });
    });

    // Animate the header when it comes into view
    ScrollTrigger.create({
      trigger: headerRef.current,
      start: 'top center',
      onEnter: () => gsap.fromTo(headerRef.current, { opacity: 0, y: -50 }, { opacity: 1, y: 0, duration: 1 }),
      onLeaveBack: () => gsap.to(headerRef.current, { opacity: 0, y: -50, duration: 1 }),
    });

    // Animate the footer when it comes into view
    ScrollTrigger.create({
      trigger: footerRef.current,
      start: 'top bottom', // Change this to trigger when the top of the footer is at the bottom of the viewport
      onEnter: () => gsap.fromTo(footerRef.current, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1 }),
      onLeave: () => gsap.to(footerRef.current, { opacity: 0, y: 50, duration: 1 }),
      onEnterBack: () => gsap.fromTo(footerRef.current, { opacity: 0, y: -50 }, { opacity: 1, y: 0, duration: 1 }),
      onLeaveBack: () => gsap.to(footerRef.current, { opacity: 0, y: -50, duration: 1 }),
    });

    return () => {
      // Cleanup ScrollTriggers when component unmounts
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <>
    <div className="container">
      <header ref={headerRef}>
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
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vel sagittis sapien, vel varius urna. Vivamus in
          magna vel odio fringilla bibendum. Integer in tellus at velit cursus euismod vel sit amet ligula. Duis a aliquam
          odio. Nullam at hendrerit turpis. Fusce fringilla, metus ac tristique volutpat, justo arcu rhoncus neque, ut
          fringilla turpis nunc eu velit. Nam pharetra consectetur massa id rhoncus. Etiam vehicula libero in ipsum
          laoreet, vel egestas velit accumsan. Curabitur ac blandit massa. Sed eu ipsum consectetur, tempor elit nec,
          consectetur nunc. Ut egestas orci sit amet justo feugiat, eget pellentesque nunc posuere. Integer id ultrices
          orci.
        </p>
        <h1>Simple parallax sections</h1>
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

      <footer ref={footerRef}>
        <h1>Footer</h1>
      </footer>
      </div>
    </>
  );
};

export default HomePage;
