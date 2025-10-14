// VideoCarousel.jsx
import React from "react";

const VIDEOS = [
  { title: "Blender", src: "../src/assets/video1.mp4", text: "Unasur Render" },
  { title: "Blender 1", src: "../src/assets/video2.mp4", text: "Unasur Render" },
  { title: "Blender 2", src: "../src/assets/video3.mp4", text: "Unasur Render" },
  { title: "Blender 3", src: "../src/assets/video4.mp4", text: "Unasur Render" },
  { title: "Blender 5", src: "../src/assets/video5.mp4", text: "Unasur Render" },
  { title: "Blender 6", src: "../src/assets/video6.mp4", text: "Unasur Render" },

];

const Slider = () => {
  return (
    <>
    <div className="slider">
      <div className='slider-track'>
        {VIDEOS.map((video, index) => (
        <div className="slide" key={index}>
            <video
            src={video.src}
            autoPlay
            muted
            loop
            className="video-item"
          />
          <p className="video-title">{video.title}</p>
        </div>

          ))}
          {VIDEOS.map((video, index) => (
        <div className="slide" key={index}>
            <video
            src={video.src}
            autoPlay
            muted
            loop
            className="video-item"
          />
          <p className="video-title">{video.title}</p>
        </div>

          ))}
        </div>
      </div>
    </>
  );
};

export default Slider;
