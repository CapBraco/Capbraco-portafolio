// src/App.jsx
import { useState } from 'react';
import Hero from './components/Hero';
import HeroIntro from './sections/HeroIntro'; // NEW
import SkillsCircle from './sections/SkillsCircle';
import Slider from './sections/Slider';
import './App.css';
import Resume from './sections/Resume';
import Carousel from './sections/Carousel';
import Contact from './sections/Contact';

function App() {
  const [showHero, setShowHero] = useState(true);

  const handleBurnComplete = () => {
    setShowHero(false);
  };

  return (
    <div className="App">
      <HeroIntro />
      {showHero && <Hero onBurnComplete={handleBurnComplete} />}
        <SkillsCircle />
        <Slider />
        <Carousel />
        <Resume />
        <Contact />
      </div>
  );
}

export default App;