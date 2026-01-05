// src/sections/HeroIntro.jsx
import { useEffect, useState } from 'react';
import './HeroIntro.css';

const HeroIntro = () => {
  const [typedText, setTypedText] = useState('');
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [currentVerb, setCurrentVerb] = useState(0);
  const [isGlitching, setIsGlitching] = useState(false);

  const phrases = [
    'Front-End Experiences',
    'Full-Stack Applications',
    'Modern Web Solutions'
  ];

  const verbs = ['build', 'create', 'develop', 'craft', 'bring to life'];

  // Typing effect - RESTORED
  useEffect(() => {
    const currentPhrase = phrases[currentPhraseIndex];
    const typingSpeed = isDeleting ? 50 : 100;
    const pauseAfterComplete = 2000;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        if (typedText.length < currentPhrase.length) {
          setTypedText(currentPhrase.slice(0, typedText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), pauseAfterComplete);
        }
      } else {
        if (typedText.length > 0) {
          setTypedText(currentPhrase.slice(0, typedText.length - 1));
        } else {
          setIsDeleting(false);
          setCurrentPhraseIndex((prev) => (prev + 1) % phrases.length);
        }
      }
    }, isDeleting ? typingSpeed : (typedText.length === currentPhrase.length ? pauseAfterComplete : typingSpeed));

    return () => clearTimeout(timer);
  }, [typedText, isDeleting, currentPhraseIndex, phrases]);

  // Glitch effect for verb
  useEffect(() => {
    const glitchInterval = setInterval(() => {
      setIsGlitching(true);
      
      // Quick flashes during glitch
      setTimeout(() => setIsGlitching(false), 100);
      setTimeout(() => setIsGlitching(true), 150);
      setTimeout(() => setIsGlitching(false), 250);
      setTimeout(() => setIsGlitching(true), 300);
      setTimeout(() => {
        setIsGlitching(false);
        setCurrentVerb((prev) => (prev + 1) % verbs.length);
      }, 400);
      
    }, 4000); // Change verb every 4 seconds

    return () => clearInterval(glitchInterval);
  }, [verbs.length]);

  return (
    <section className="hero-intro-luxury">
      {/* Geometric background */}
      <div className="geometric-bg">
        <div className="geo-circle"></div>
        <div className="geo-circle"></div>
        <div className="geo-circle"></div>
      </div>
      
      {/* Diamond ornaments */}
      <div className="diamond-ornament"></div>
      <div className="diamond-ornament"></div>
      <div className="diamond-ornament"></div>
      <div className="diamond-ornament"></div>
      
      {/* Vertical dividers */}
      <div className="vertical-divider"></div>
      <div className="vertical-divider"></div>
      
      {/* Dust particles */}
      <div className="dust-particles">
        <div className="dust"></div>
        <div className="dust"></div>
        <div className="dust"></div>
        <div className="dust"></div>
        <div className="dust"></div>
        <div className="dust"></div>
        <div className="dust"></div>
        <div className="dust"></div>
      </div>
      
      {/* Ink drops */}
      <div className="ink-drop"></div>
      <div className="ink-drop"></div>
      <div className="ink-drop"></div>
      <div className="ink-drop"></div>
      
      {/* Atmospheric fog */}
      <div className="fog"></div>
      
      {/* Main content */}
      <div className="hero-content">
        <div className="top-symbol">❋</div>
        <p className="pre-title">Full-Stack Developer</p>
        <h1>Hi, I'm Braco</h1>
        <div className="accent-line"></div>
        <div className="hero-statement">
          <span className={`statement-verb ${isGlitching ? 'glitching' : ''}`}>
            I {verbs[currentVerb]}
            {isGlitching && (
              <>
                <span className="glitch-layer" aria-hidden="true">
                  I {verbs[currentVerb]}
                </span>
                <span className="glitch-layer" aria-hidden="true">
                  I {verbs[currentVerb]}
                </span>
              </>
            )}
          </span>
          <span className="typed-text">
            {typedText}
            <span className="cursor">|</span>
          </span>
        </div>
        <p className="description">
            Designed for humans. Optimized for performance.
        </p>
        <div className="bottom-symbol">⚜</div>
      </div>
    </section>
  );
};

export default HeroIntro;