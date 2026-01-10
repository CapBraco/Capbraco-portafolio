// src/App.jsx - UPDATED with Navigation and Footer
import { useState } from 'react';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import HeroIntro from './sections/HeroIntro';
import Hero from './components/Hero';
import SkillsCircle from './sections/SkillsCircle';
import Slider from './sections/Slider';
import Carousel from './sections/Carousel';
import Resume from './sections/Resume';
import ProjectsGallery from './sections/ProjectsGallery';
import Contact from './sections/Contact';
import './styles/scrollbar.css'; // Import custom scrollbar
import './App.css';

function App() {
  const [showHero, setShowHero] = useState(true);

  const handleBurnComplete = () => {
    setShowHero(false);
  };

  return (
    <div className="App">
      {/* Floating Navigation */}
      <Navigation />

      {/* Main Content - Add IDs for navigation */}
      <section id="home">
        <HeroIntro />
        {showHero && <Hero onBurnComplete={handleBurnComplete} />}
      </section>

      <section id="skills">
        <SkillsCircle />
      </section>

      <section id="projects">
        <Slider />
      </section>

      <section id="carousel">
        <Carousel />
      </section>

      <section id="resume">
        <Resume />
      </section>

      <section id="gallery">
        <ProjectsGallery />
      </section>

      <section id="contact">
        <Contact />
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
