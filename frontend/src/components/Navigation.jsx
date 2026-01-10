// src/components/Navigation.jsx
import { useState, useEffect } from 'react';
import './Navigation.css';

const Navigation = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Change nav background on scroll
      setIsScrolled(window.scrollY > 50);

      // Detect active section
      const sections = [
        'home',
        'skills',
        'projects',
        'carousel',
        'resume',
        'gallery',
        'contact'
      ];

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setIsOpen(false); // Close menu after navigation
    }
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const navItems = [
    { id: 'home', label: 'Home', icon: '◆' },
    { id: 'skills', label: 'Skills', icon: '◇' },
    { id: 'projects', label: 'Projects', icon: '◆' },
    { id: 'carousel', label: 'Videos', icon: '◇' },
    { id: 'resume', label: 'Resume', icon: '◆' },
    { id: 'gallery', label: 'Gallery', icon: '◇' },
    { id: 'contact', label: 'Contact', icon: '◆' },
  ];

  return (
    <>
      {/* Hamburger Toggle Button */}
      <button
        className={`nav-toggle ${isScrolled ? 'nav-toggle--scrolled' : ''} ${isOpen ? 'nav-toggle--active' : ''}`}
        onClick={toggleMenu}
        aria-label="Toggle navigation menu"
        aria-expanded={isOpen}
      >
        <span className="nav-toggle-line"></span>
        <span className="nav-toggle-line"></span>
        <span className="nav-toggle-line"></span>
      </button>

      {/* Navigation Menu */}
      <nav className={`floating-nav ${isScrolled ? 'floating-nav--scrolled' : ''} ${isOpen ? 'floating-nav--open' : ''}`}>
        <div className="nav-container">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`nav-item ${activeSection === item.id ? 'nav-item--active' : ''}`}
              aria-label={`Navigate to ${item.label}`}
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-label">{item.label}</span>
            </button>
          ))}
        </div>
      </nav>

      {/* Backdrop overlay */}
      {isOpen && (
        <div 
          className="nav-backdrop" 
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        ></div>
      )}
    </>
  );
};

export default Navigation;
