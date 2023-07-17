import React, { useEffect, useRef } from 'react';
import './HomePage.css';

const HomePage = () => {
  const sectionRefs = useRef([]);

  useEffect(() => {
    const loadDependencies = async () => {
      try {
        const gsapModule = await import('gsap');
        const gsap = gsapModule.default || gsapModule;

        const scrollTriggerModule = await import('gsap/ScrollTrigger');
        const ScrollTrigger = scrollTriggerModule.default || scrollTriggerModule;

        gsap.registerPlugin(ScrollTrigger);

        gsap.utils.toArray(sectionRefs.current).forEach((section, i) => {
          const bg = section.querySelector('.bg');

          // Give the backgrounds some random images
          bg.style.backgroundImage = `url(https://picsum.photos/1600/800?random=${i})`;

          // the first image (i === 0) should be handled differently because it should start at the very top.
          // use function-based values in order to keep things responsive
          gsap.fromTo(
            bg,
            {
              backgroundPosition: () =>
                i ? `50% ${-window.innerHeight * getRatio(section)}px` : '50% 0px',
            },
            {
              backgroundPosition: () => `50% ${window.innerHeight * (1 - getRatio(section))}px`,
              ease: 'none',
              scrollTrigger: {
                trigger: section,
                start: () => (i ? 'top bottom' : 'top top'),
                end: 'bottom top',
                scrub: true,
                invalidateOnRefresh: true, // to make it responsive
              },
            }
          );
        });
      } catch (error) {
        console.error('Error loading dependencies:', error);
      }
    };

    const getRatio = (el) => window.innerHeight / (window.innerHeight + el.offsetHeight);

    loadDependencies();
  }, []);

  return (
    <>
      <section ref={(el) => (sectionRefs.current[0] = el)}>
        <div className="bg"></div>
        <h1>Simple parallax sections</h1>
      </section>
      <section ref={(el) => (sectionRefs.current[1] = el)}>
        <div className="bg"></div>
        <h1>Hey look, a title</h1>
      </section>
      <section ref={(el) => (sectionRefs.current[2] = el)}>
        <div className="bg"></div>
        <h1>They just keep coming</h1>
      </section>
      <section ref={(el) => (sectionRefs.current[3] = el)}>
        <div className="bg"></div>
        <h1>So smooth though</h1>
      </section>
      <section ref={(el) => (sectionRefs.current[4] = el)}>
        <div className="bg"></div>
        <h1>Nice, right?</h1>
      </section>
    </>
  );
};

export default HomePage;
