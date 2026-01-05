// src/sections/Slider.jsx
import { useEffect } from 'react';
import './Slider.css';

const Slider = () => {
  useEffect(() => {
    initSlider();
  }, []);

  return (
    <section className="slider-section">
      <div className="head">
        <div className="head-title">
          <span className="bracket-left">&lt;</span>
          <h2>PROJECTS</h2>
          <span className="bracket-right">/&gt;</span>
        </div>

        <div className="controls">
          <button id="prev" className="nav-btn" aria-label="Prev">‹</button>
          <button id="next" className="nav-btn" aria-label="Next">›</button>
        </div>
      </div>

      <div className="slider">
        <div className="track" id="track">

          <article className="project-card" data-index="0">
            <img className="project-card__bg" src="slider2-2.png" alt="" />
            <div className="project-card__content">
              <img className="project-card__thumb" src="slider2.png" alt="" />
              <div className="project-card__info">
                <h3 className="project-card__title">CineStream</h3>
                <p className="project-card__desc">Tools that work like you do.</p>
                <div className="project-card__buttons">
                  <button className="project-card__btn">See Live Demo</button>
                  <a href="https://github.com/username/cinestream" target="_blank" rel="noopener noreferrer" className="project-card__github" aria-label="GitHub Repository">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </article>

          <article className="project-card" data-index="1">
            <img className="project-card__bg" src="slider3-3.png" alt="" />
            <div className="project-card__content">
              <img className="project-card__thumb" src="slider3.png" alt="" />
              <div className="project-card__info">
                <h3 className="project-card__title">7Fit7</h3>
                <p className="project-card__desc">Create faster, explore new possibilities.</p>
                <div className="project-card__buttons">
                  <button className="project-card__btn">See Live Demo</button>
                  <a href="https://github.com/username/7fit7" target="_blank" rel="noopener noreferrer" className="project-card__github" aria-label="GitHub Repository">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </article>

          <article className="project-card" data-index="2">
            <img className="project-card__bg" src="slider1-1.png" alt="" />
            <div className="project-card__content">
              <img className="project-card__thumb" src="slider1.png" alt="" />
              <div className="project-card__info">
                <h3 className="project-card__title">Pan Tributario</h3>
                <p className="project-card__desc">From concept to cut, faster.</p>
                <div className="project-card__buttons">
                  <button className="project-card__btn">See Live Demo</button>
                  <a href="https://github.com/username/pan-tributario" target="_blank" rel="noopener noreferrer" className="project-card__github" aria-label="GitHub Repository">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </article>

          <article className="project-card" data-index="3">
            <img className="project-card__bg" src="slider4-4.png" alt="" />
            <div className="project-card__content">
              <img className="project-card__thumb" src="slider4.png" alt="" />
              <div className="project-card__info">
                <h3 className="project-card__title">Braco's Auctions</h3>
                <p className="project-card__desc">Make scroll-stopping content, easily.</p>
                <div className="project-card__buttons">
                  <button className="project-card__btn">See Live Demo</button>
                  <a href="https://github.com/username/bracos-auctions" target="_blank" rel="noopener noreferrer" className="project-card__github" aria-label="GitHub Repository">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </article>

          <article className="project-card" data-index="4">
            <img className="project-card__bg" src="slider5-5.png" alt="" />
            <div className="project-card__content">
              <img className="project-card__thumb" src="slider5.png" alt="" />
              <div className="project-card__info">
                <h3 className="project-card__title">Bookr</h3>
                <p className="project-card__desc">Creative control at every stage.</p>
                <div className="project-card__buttons">
                  <button className="project-card__btn">See Live Demo</button>
                  <a href="https://github.com/username/bookr" target="_blank" rel="noopener noreferrer" className="project-card__github" aria-label="GitHub Repository">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </article>

        </div>
      </div>

      <div className="dots" id="dots"></div>
    </section>
  );
};

// Fixed slider functionality - exact number of dots
function initSlider() {
  const track = document.getElementById("track");
  if (!track) return;

  // ✅ avoid double init (React StrictMode)
  if (track.dataset.inited === "1") return;
  track.dataset.inited = "1";

  const wrap = track.parentElement;
  const cards = Array.from(track.children);
  const prev = document.getElementById("prev");
  const next = document.getElementById("next");
  const dotsBox = document.getElementById("dots");
  const isMobile = () => matchMedia("(max-width:767px)").matches;

  let current = 0;
  let isTransitioning = false;

  function createDots() {
    dotsBox.innerHTML = "";
    cards.forEach((_, i) => {
      const dot = document.createElement("span");
      dot.className = "dot";
      dot.onclick = () => activate(i, true);
      dotsBox.appendChild(dot);
    });
  }

  const dots = () => Array.from(dotsBox.children);

  function center(i) {
    const card = cards[i];

    // ✅ on mobile, just scroll to card top (more stable with variable heights)
    if (isMobile()) {
      wrap.scrollTo({ top: card.offsetTop - 12, behavior: "smooth" });
      return;
    }

    wrap.scrollTo({
      left: card.offsetLeft - (wrap.clientWidth / 2 - card.clientWidth / 2),
      behavior: "smooth",
    });
  }

  function toggleUI(i) {
    cards.forEach((c, k) => c.toggleAttribute("active", k === i));
    dots().forEach((d, k) => d.classList.toggle("active", k === i));
    prev.disabled = i === 0;
    next.disabled = i === cards.length - 1;
  }

  function activate(i, scroll) {
    if (i === current || isTransitioning) return;

    isTransitioning = true;
    current = i;
    toggleUI(i);

    if (scroll) center(i);

    setTimeout(() => {
      isTransitioning = false;
    }, 650);
  }

  function go(step) {
    activate(Math.min(Math.max(current + step, 0), cards.length - 1), true);
  }

  prev.onclick = () => go(-1);
  next.onclick = () => go(1);

  window.addEventListener(
    "keydown",
    (e) => {
      if (["ArrowRight", "ArrowDown"].includes(e.key)) go(1);
      if (["ArrowLeft", "ArrowUp"].includes(e.key)) go(-1);
    },
    { passive: true }
  );

  cards.forEach((card, i) => {
    let hoverTimeout;

    card.addEventListener("mouseenter", () => {
      if (matchMedia("(hover:hover)").matches && !isTransitioning) {
        hoverTimeout = setTimeout(() => activate(i, true), 150);
      }
    });

    card.addEventListener("mouseleave", () => clearTimeout(hoverTimeout));

    // ✅ click should work on desktop + mobile
    card.addEventListener("click", () => activate(i, true));
  });

  // Touch gestures
  let sx = 0, sy = 0, isScrolling = null;

  track.addEventListener(
    "touchstart",
    (e) => {
      sx = e.touches[0].clientX;
      sy = e.touches[0].clientY;
      isScrolling = null;
    },
    { passive: true }
  );

  track.addEventListener(
    "touchmove",
    (e) => {
      if (!sx || !sy) return;

      const dx = e.touches[0].clientX - sx;
      const dy = e.touches[0].clientY - sy;

      if (isScrolling === null) {
        isScrolling = Math.abs(dy) > Math.abs(dx);
      }

      if (isMobile() && isScrolling) e.preventDefault();
    },
    { passive: false }
  );

  track.addEventListener(
    "touchend",
    (e) => {
      const dx = e.changedTouches[0].clientX - sx;
      const dy = e.changedTouches[0].clientY - sy;

      if (isMobile() ? Math.abs(dy) > 60 : Math.abs(dx) > 60) {
        go((isMobile() ? dy : dx) > 0 ? -1 : 1);
      }

      sx = 0;
      sy = 0;
      isScrolling = null;
    },
    { passive: true }
  );

  window.addEventListener("resize", () => center(current));

  createDots();
  if (isMobile()) {
  current = -1;
  cards.forEach(c => c.removeAttribute("active"));
  dots().forEach(d => d.classList.remove("active"));
  prev.disabled = true;
  next.disabled = false;
} else {
  toggleUI(2);
  center(0);
}

}

export default Slider;
