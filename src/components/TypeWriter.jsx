import React, { useEffect, useRef } from 'react';

const Typewriter = ({ sentences, typingSpeed, deletingSpeed, pauseTime }) => {
  const elementRef = useRef(null);
  let sentenceIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  const typeSentence = () => {
    const currentSentence = sentences[sentenceIndex];
    const delay = isDeleting ? deletingSpeed : typingSpeed;

    setTimeout(() => {
      if (charIndex < currentSentence.length && !isDeleting) {
        elementRef.current.innerHTML += currentSentence.charAt(charIndex);
        charIndex++;
        typeSentence();
      } else if (isDeleting && charIndex >= 0) {
        elementRef.current.innerHTML = currentSentence.substring(0, charIndex);
        charIndex--;
        typeSentence();
      } else {
        isDeleting = !isDeleting;

        if (!isDeleting) {
          sentenceIndex = (sentenceIndex + 1) % sentences.length;
        }

        setTimeout(() => {
          typeSentence();
        }, pauseTime);
      }
    }, delay);
  };

  useEffect(() => {
    typeSentence();
  }, []);

  return <span ref={elementRef} />;
};


export default Typewriter;
