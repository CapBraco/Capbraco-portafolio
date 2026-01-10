// src/components/Footer.jsx
import { useState, useEffect } from 'react';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [displayText, setDisplayText] = useState('/>');
  const [showCursor, setShowCursor] = useState(false);
  const [isCardActive, setIsCardActive] = useState(false);

  // True typing effect - cursor behind each character
  useEffect(() => {
    const closingTags = ['/>', ']', '}', ')', ';', '>', '};'];
    let tagIndex = 0;
    let phase = 'pause'; // pause, deleting, thinking, deletingDots, typing
    let currentText = '/>';
    let charIndex = 0;
    let timeoutId;
    
    const cursorShowTime = 300; // Show cursor
    const actionTime = 80; // Quick action after cursor
    const pauseAtEnd = 1500; // Pause when tag complete
    const thinkingPause = 300; // Pause after dots complete

    const animate = () => {
      if (phase === 'pause') {
        // Show complete tag, wait, then start deleting
        setShowCursor(false);
        timeoutId = setTimeout(() => {
          phase = 'deleting';
          charIndex = currentText.length;
          animate();
        }, pauseAtEnd);
      } 
      else if (phase === 'deleting') {
        if (charIndex > 0) {
          // Show cursor behind current text
          setShowCursor(true);
          timeoutId = setTimeout(() => {
            // Delete last character
            charIndex--;
            currentText = currentText.substring(0, charIndex);
            setDisplayText(currentText);
            setShowCursor(false);
            timeoutId = setTimeout(animate, actionTime);
          }, cursorShowTime);
        } else {
          // Done deleting, start thinking dots
          phase = 'thinking';
          charIndex = 0;
          setDisplayText('');
          timeoutId = setTimeout(animate, actionTime);
        }
      } 
      else if (phase === 'thinking') {
        if (charIndex < 3) {
          // Show cursor
          setShowCursor(true);
          timeoutId = setTimeout(() => {
            // Add dot
            charIndex++;
            setDisplayText('.'.repeat(charIndex));
            setShowCursor(false);
            timeoutId = setTimeout(animate, actionTime);
          }, cursorShowTime);
        } else {
          // Dots complete, pause then delete them
          setShowCursor(false);
          timeoutId = setTimeout(() => {
            phase = 'deletingDots';
            animate();
          }, thinkingPause);
        }
      }
      else if (phase === 'deletingDots') {
        if (charIndex > 0) {
          // Show cursor behind dots
          setShowCursor(true);
          timeoutId = setTimeout(() => {
            // Delete last dot
            charIndex--;
            setDisplayText('.'.repeat(charIndex));
            setShowCursor(false);
            timeoutId = setTimeout(animate, actionTime);
          }, cursorShowTime);
        } else {
          // Dots deleted, start typing new tag
          setDisplayText('');
          tagIndex = (tagIndex + 1) % closingTags.length;
          phase = 'typing';
          charIndex = 0;
          currentText = '';
          timeoutId = setTimeout(animate, actionTime);
        }
      }
      else if (phase === 'typing') {
        const targetTag = closingTags[tagIndex];
        if (charIndex < targetTag.length) {
          // Show cursor
          setShowCursor(true);
          timeoutId = setTimeout(() => {
            // Type character
            charIndex++;
            currentText = targetTag.substring(0, charIndex);
            setDisplayText(currentText);
            setShowCursor(false);
            timeoutId = setTimeout(animate, actionTime);
          }, cursorShowTime);
        } else {
          // Finished typing, pause
          phase = 'pause';
          animate();
        }
      }
    };

    // Start animation after initial pause
    timeoutId = setTimeout(() => {
      phase = 'pause';
      animate();
    }, pauseAtEnd);

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);

  const socialLinks = [
    { name: 'GitHub', url: 'https://github.com/CapBraco', icon: '⟨/⟩' },
    { name: 'LinkedIn', url: 'https://linkedin.com/in/bryanpaucar', icon: '◆' },
    { name: 'Twitter', url: 'https://twitter.com/devbraco', icon: '◇' },
    { name: 'Email', url: 'mailto:bracosmo@gmail.com', icon: '✉' },
  ];

  const scrollToTop = () => {
    const homeSection = document.getElementById('home');
    if (homeSection) {
      homeSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleCardToggle = () => {
    setIsCardActive(!isCardActive);
  };

  return (
    <footer className="footer">
      {/* Luminous Card Section */}
      <div className="footer-card-section">
        <div className={`luminous-card ${isCardActive ? 'active' : ''}`}>
          <div className="light-layer">
            <div className="slit"></div>
            <div className="lumen">
              <div className="min"></div>
              <div className="mid"></div>
              <div className="hi"></div>
            </div>
            <div className="darken">
              <div className="sl"></div>
              <div className="ll"></div>
              <div className="slt"></div>
              <div className="srt"></div>
            </div>
          </div>
          <div className="card-content">
            <div className="card-icon">
              <div className="logo-text-container">
                <p className="cap-text-card">Cap</p>
                <p className="braco-text-card">Braco</p>
              </div>
            </div>
            <div className="card-bottom">
              <h4>Developed by Braco</h4>
              <p>
                © {currentYear} CapBraco<br />
                All rights reserved
              </p>
              <div 
                className={`card-toggle ${isCardActive ? 'active' : ''}`} 
                onClick={handleCardToggle}
              >
                <div className="card-handle"></div>
                <span>Activate Lumen</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-grid">
        {/* Brand Section with true typing effect */}
        <div className="footer-section footer-brand">
          <h3 className="footer-logo">
            <span className="bracket-cyan">&lt;</span>
            <span className="brand-name">CapBraco</span>
            <span className="bracket-orange closing-tag">
              {displayText}
              {showCursor && <span className="typing-cursor">|</span>}
            </span>
          </h3>
          <p className="footer-tagline">
            Ideas made real.
          </p>
        </div>

        {/* Quick Links */}
        <div className="footer-section">
          <h4 className="footer-heading">Navigate</h4>
          <nav className="footer-links">
            <a href="#home" className="footer-link">Home</a>
            <a href="#skills" className="footer-link">Skills</a>
            <a href="#projects" className="footer-link">Projects</a>
            <a href="#resume" className="footer-link">Resume</a>
          </nav>
        </div>

        {/* Contact */}
        <div className="footer-section">
          <h4 className="footer-heading">Connect</h4>
          <nav className="footer-links">
            <a href="#gallery" className="footer-link">Gallery</a>
            <a href="#contact" className="footer-link">Contact</a>
            <a href="mailto:bracosmo@gmail.com" className="footer-link">Email Me</a>
          </nav>
        </div>

        {/* Social */}
        <div className="footer-section">
          <h4 className="footer-heading">Follow</h4>
          <div className="footer-social">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.url}
                className="social-link"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.name}
              >
                <span className="social-icon">{social.icon}</span>
                <span className="social-name">{social.name}</span>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom">
        <div className="footer-bottom-content">
          <p className="footer-copyright">
            <span className="copyright-symbol">©</span> {currentYear} CapBraco. 
            <span className="copyright-text"> All rights reserved.</span>
          </p>
          <button 
            onClick={scrollToTop} 
            className="back-to-top"
            aria-label="Back to top"
          >
            <span className="back-to-top-icon">↑</span>
            <span className="back-to-top-text">Top</span>
          </button>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="footer-decoration footer-decoration--left"></div>
      <div className="footer-decoration footer-decoration--right"></div>
    </footer>
  );
};

export default Footer;
