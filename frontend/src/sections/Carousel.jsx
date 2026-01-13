// src/sections/Carousel.jsx - FIXED: Videos load after Hero completes
import React, { useRef, useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight, FaPlay, FaPause } from 'react-icons/fa';
import './Carousel.css';

const VIDEOS = [
  { 
    title: "UNASUR Building — Architectural Visualization",
    description: "High-fidelity 3D modeling and photorealistic rendering of the UNASUR headquarters in Quito, Ecuador.",
    src: "https://assets.capbraco.com/videos/project-1.mp4"
  },
  { 
    title: "Cinematic 3D Environment — Motion & Tracking",
    description: "Cinematic-style 3D scene with camera tracking and environmental storytelling, designed for commercials and digital product visuals.",
    src: "https://assets.capbraco.com/videos/project-2.mp4"
  },
  { 
    title: "Lutweb Product Render — Camera Motion Study",
    description: "Realistic product visualization featuring branded elements, precision lighting, and smooth zoom and rotation camera movement.",
    src: "https://assets.capbraco.com/videos/project-3.mp4"
  },
  { 
    title: "UNASUR Building — Scale Model Visualization",
    description: "Detailed miniature-scale architectural model showcasing structural form and proportions through controlled lighting and composition.",
    src: "https://assets.capbraco.com/videos/project-4.mp4"
  },
  { 
    title: "Dynamic Wheel Simulation — Smoke & Motion",
    description: "Physics-driven wheel drift simulation with volumetric smoke effects and rotational camera movement.",
    src: "https://assets.capbraco.com/videos/project-5.mp4"
  },
  { 
    title: "Fluid Simulation Study — Glass Tank",
    description: "Fluid dynamics showcase featuring object interaction and realistic liquid behavior inside a transparent container.",
    src: "https://assets.capbraco.com/videos/project-6.mp4"
  },
];

const Carousel = () => {
  const sliderRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [canLoadVideos, setCanLoadVideos] = useState(false); // NEW: Control video loading
  const scrollAmount = 400;

  // NEW: Wait for Hero to complete before loading videos
  useEffect(() => {
    console.log('⏳ Carousel mounted - waiting for Hero to complete...');
    
    // Listen for Hero completion event
    const handleHeroComplete = () => {
      console.log('✅ Hero complete - loading carousel videos');
      setCanLoadVideos(true);
    };

    window.addEventListener('heroComplete', handleHeroComplete);

    // Fallback: Load after 6 seconds anyway (in case event doesn't fire)
    const fallbackTimer = setTimeout(() => {
      console.log('⏱️ Fallback timer - loading carousel videos');
      setCanLoadVideos(true);
    }, 6000);

    return () => {
      window.removeEventListener('heroComplete', handleHeroComplete);
      clearTimeout(fallbackTimer);
    };
  }, []);

  // Auto-scroll effect
  useEffect(() => {
    if (isPaused || !canLoadVideos) return; // Don't auto-scroll until videos can load

    const interval = setInterval(() => {
      if (sliderRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
        
        if (scrollLeft + clientWidth >= scrollWidth - 10) {
          sliderRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          sliderRef.current.scrollBy({ left: 2, behavior: 'auto' });
        }
      }
    }, 30);

    return () => clearInterval(interval);
  }, [isPaused, canLoadVideos]);

  const scrollLeft = () => {
    sliderRef.current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
  };

  const scrollRight = () => {
    sliderRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  const handleVideoHover = (index) => {
    setHoveredIndex(index);
    setIsPaused(true);
  };

  const handleVideoLeave = () => {
    setHoveredIndex(null);
    setIsPaused(false);
  };

  const togglePause = () => {
    setIsPaused(!isPaused);
  };

  return (
    <section className="carousel-section">
      {/* Storm clouds background */}
      <div className="storm-clouds cyan"></div>
      <div className="storm-clouds orange"></div>

      <div className="carousel-container">
        {/* Header */}
        <div className="carousel-header">
          <div className="header-top">
            <span className="bracket-left">&lt;</span>
            <h2 className="carousel-title">SHOWCASE</h2>
            <span className="bracket-right">/&gt;</span>
          </div>
          <div className="header-subtitle">A Collection of Creative Work</div>
          <div className="divider-line"></div>
        </div>

        {/* Carousel wrapper */}
        <div className="carousel-wrapper storm-container">
          {/* Cloud blur edges */}
          <div className="cloud-blur left cyan-cloud"></div>
          <div className="cloud-blur right orange-cloud"></div>

          {/* Navigation arrows */}
          <button 
            className="nav-arrow left" 
            onClick={scrollLeft}
            aria-label="Scroll left"
          >
            <FaChevronLeft />
          </button>
          
          <button 
            className="nav-arrow right" 
            onClick={scrollRight}
            aria-label="Scroll right"
          >
            <FaChevronRight />
          </button>

          {/* Play/Pause control */}
          <button 
            className={`play-pause-btn ${isPaused ? 'paused' : ''}`}
            onClick={togglePause}
            aria-label={isPaused ? "Resume autoplay" : "Pause autoplay"}
          >
            {isPaused ? <FaPlay /> : <FaPause />}
          </button>

          {/* Scrollable slider */}
          <div className="carousel-slider" ref={sliderRef}>
            <div className="slider-track">
              {[...VIDEOS, ...VIDEOS].map((video, index) => (
                <div 
                  className={`slide ${hoveredIndex === index ? 'centered-zoom' : ''} ${hoveredIndex !== null && hoveredIndex !== index ? 'filtered' : ''}`}
                  key={index}
                  onMouseEnter={() => handleVideoHover(index)}
                  onMouseLeave={handleVideoLeave}
                >
                  <div className="video-container storm-frame">
                    {/* FIXED: Only render video after Hero completes */}
                    {canLoadVideos ? (
                      <video 
                        src={video.src}
                        loading="lazy"
                        autoPlay
                        muted 
                        loop
                        playsInline
                      />
                    ) : (
                      // Show placeholder while waiting
                      <div className="video-placeholder">
                        <div className="loading-spinner"></div>
                      </div>
                    )}
                    
                    {/* Video info overlay */}
                    <div className="video-info-overlay">
                      <div className="video-title-main">{video.title}</div>
                      <div className="video-description">{video.description}</div>
                      <div className="video-accent-line"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Carousel;
