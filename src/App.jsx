import Navbar from "./components/Navbar";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Projects from "./sections/Projects";
import Skills from "./sections/Skills";
import Contact from "./sections/Contact";
import Footer from "./components/Footer";
import "./styles/global.css";
import Slider from "./components/Slider";

function App(){
  return (
    <div>
      <Navbar />
      <Hero />
      <About />
      <Projects />
      <Slider/>
      <Skills/>
      <Contact />
      <Footer />
    </div>
  );
}

export default App;