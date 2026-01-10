// src/sections/SkillsCircle.jsx
import { useEffect, useState } from 'react';
import { 
  FaGlobe, 
  FaPaintBrush, 
  FaCog, 
  FaLayerGroup, 
  FaDatabase, 
  FaBolt, 
  FaAtom
} from 'react-icons/fa';
import './SkillsCircle.css';

const SkillsCircle = () => {
  const [activeIndex, setActiveIndex] = useState(-1);

  const skills = [
    { name: 'Web Application Development', icon: FaGlobe },
    { name: 'Front-End Engineering & UI Development', icon: FaPaintBrush },
    { name: 'Back-End & API Development', icon: FaCog },
    { name: 'Full-Stack Application Architecture', icon: FaLayerGroup },
    { name: 'Database Design & SQL', icon: FaDatabase },
    { name: 'Performance Optimization & Best Practices', icon: FaAtom },
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      skills.forEach((_, index) => {
        setTimeout(() => {
          setActiveIndex(index);
        }, index * 200);
      });
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  // Calculate position on FULL circle (360 degrees)
  const getArcPosition = (index, total) => {
    const startAngle = -90; // Start from top
    const angleStep = 360 / total; // Divide full circle
    const angle = startAngle + (angleStep * index);
    const angleRad = (angle * Math.PI) / 180;
    
    const radius = 42; // percentage
    
    return {
      x: 50 + radius * Math.cos(angleRad),
      y: 50 + radius * Math.sin(angleRad),
      angle: angle
    };
  };

  return (
    <section className="skills-section-luxury">
      <div className="skills-container-luxury">
        {/* Left side - Your photo */}
        <div className="skills-photo-luxury">
          <img 
            src="https://assets.capbraco.com/images/profile.webp" 
            alt="Bryan A Paucar profile" 
            className="profile-image-luxury"
          />
        </div>

        {/* Right side - Orbital skills system */}
        <div className="skills-orbital-container">
          <h2 className="skills-title-luxury">
            <span className="title-line-luxury">MY EXPERTISE</span>
            <span className="title-main-luxury">& CAPABILITIES</span>
          </h2>

          {/* Orbital system */}
          <div className="orbital-system">
            {/* Particle effects background */}
            <div className="particles-bg"></div>
            
            {/* Multiple orbital rings */}
            <svg className="orbital-rings" viewBox="0 0 100 100">
              <defs>
                <radialGradient id="cyanGlow" cx="50%" cy="50%">
                  <stop offset="0%" stopColor="rgba(100, 200, 255, 0.6)" />
                  <stop offset="50%" stopColor="rgba(0, 180, 216, 0.3)" />
                  <stop offset="100%" stopColor="rgba(0, 180, 216, 0)" />
                </radialGradient>
              </defs>
              
              {/* Outer rings - some dashed, rotating */}
              <circle cx="50" cy="50" r="48" fill="none" stroke="rgba(0, 180, 216, 0.2)" strokeWidth="0.4" strokeDasharray="4,4" className="ring-outer-1"/>
              <circle cx="50" cy="50" r="46" fill="none" stroke="rgba(0, 180, 216, 0.25)" strokeWidth="0.5" className="ring-outer-2"/>
              <circle cx="50" cy="50" r="44" fill="none" stroke="rgba(255, 140, 80, 0.3)" strokeWidth="0.6" strokeDasharray="6,3" className="ring-outer-3"/>
              
              {/* Main orbital ring - cyan glow */}
              <circle cx="50" cy="50" r="42" fill="none" stroke="url(#cyanGlow)" strokeWidth="1.5" className="main-orbital-ring"/>
              
              {/* Inner rings - some dashed, rotating */}
              <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(255, 140, 80, 0.25)" strokeWidth="0.5" strokeDasharray="3,3" className="ring-inner-1"/>
              <circle cx="50" cy="50" r="38" fill="none" stroke="rgba(0, 180, 216, 0.2)" strokeWidth="0.4" className="ring-inner-2"/>
              
              {/* Center core rings - dashed and rotating */}
              <circle cx="50" cy="50" r="12" fill="none" stroke="rgba(0, 180, 216, 0.5)" strokeWidth="0.8" strokeDasharray="2,2" className="core-ring-1"/>
              <circle cx="50" cy="50" r="10" fill="none" stroke="rgba(0, 180, 216, 0.6)" strokeWidth="0.6" className="core-ring-2"/>
              <circle cx="50" cy="50" r="8" fill="none" stroke="rgba(0, 180, 216, 0.7)" strokeWidth="0.4" strokeDasharray="1,1" className="core-ring-3"/>
            </svg>

            {/* Skill nodes on orbit */}
            <div className="skill-nodes-luxury">
              {skills.map((skill, index) => {
                const pos = getArcPosition(index, skills.length);
                const isActive = index <= activeIndex;
                const IconComponent = skill.icon;
                
                return (
                  <div
                    key={index}
                    className={`skill-node-luxury ${isActive ? 'active' : ''}`}
                    style={{
                      left: `${pos.x}%`,
                      top: `${pos.y}%`,
                      transitionDelay: `${index * 0.2}s`
                    }}
                  >
                    {/* Node without pulse ring */}
                    <div className="node-glow-container">
                      <div className="node-dot-luxury">
                        <div className="dot-inner-luxury">
                          <IconComponent className="node-icon-luxury" />
                        </div>
                      </div>
                    </div>
                    
                    {/* Skill label */}
                    <div className="skill-label-luxury">
                      <span className="skill-name-luxury">{skill.name}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Central power core - only border rotates */}
            <div className="power-core">
              <div className="core-glow"></div>
              <div className="core-border-rotate"></div>
              <div className="core-inner-static">
                <FaBolt className="core-icon" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsCircle;
