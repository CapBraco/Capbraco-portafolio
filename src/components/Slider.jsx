// VideoCarousel.jsx
import React, { useRef } from "react";

const VIDEOS = [
  { title: "Blender", src: "../src/assets/video1.mp4" },
  { title: "Blender 1", src: "../src/assets/video2.mp4" },
  { title: "Blender 2", src: "../src/assets/video3.mp4" },
  { title: "Blender 3", src: "../src/assets/video4.mp4" },
  { title: "Blender 5", src: "../src/assets/video5.mp4" },
  { title: "Blender 6", src: "../src/assets/video6.mp4" },
];

const Slider = () => {
  const sliderRef = useRef(null);
  const scrollAmount = 400;

  const scrollLeft = () => {
    sliderRef.current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
  };

  const scrollRight = () => {
    sliderRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  return (
    <div className="slider-wrapper">
      <h1 class="background-title">SHOWCASE</h1>
      {/* Left gradient */}
      <div className="gradient left"></div>
      {/* Right gradient */}
      <div className="gradient right"></div>

      {/* Arrows */}
      <button className="arrow left" onClick={scrollLeft}><i class="fa-solid fa-arrow-left"></i>
      </button>
      <button className="arrow right" onClick={scrollRight}>
        <i class="fa-solid fa-arrow-right"></i>
      </button>

      {/* Scrollable slider */}
      <div className="slider" ref={sliderRef}>
        <div className="slider-track">
          {VIDEOS.map((video, index) => (
            <div className="slide" key={index}>
              <video src={video.src} autoPlay muted loop />
            </div>
          ))}
          {VIDEOS.map((video, index) => (
            <div className="slide" key={index}>
              <video src={video.src} autoPlay muted loop />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Slider;
