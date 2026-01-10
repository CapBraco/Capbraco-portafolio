import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from '@studio-freight/lenis';
import './ProjectsGallery.css';

const ProjectsGallery = () => {
  const sectionRef = useRef(null);
  const lenisRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Initialize Lenis smooth scroll ONLY for this section
    const lenis = new Lenis({
      wrapper: section,
      content: section.querySelector('.col-scroll'),
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    lenisRef.current = lenis;

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // GSAP ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    // Target odd columns (1 and 3) - they scroll UP
    const reverseTrigger = gsap.utils.toArray(
      section.querySelectorAll('.col-scroll__box:nth-child(odd) .col-scroll__list')
    );

    const animations = [];

    reverseTrigger.forEach((element) => {
      const elementHeight = element.offsetHeight;
      const viewportHeight = window.innerHeight;
      const extraSpace = viewportHeight * 0.2;
      const scrollDistance = elementHeight + viewportHeight + extraSpace;

      const anim = gsap.to(element, {
        yPercent: 100,
        scrollTrigger: {
          trigger: element,
          scroller: section,
          start: 0,
          end: `+=${scrollDistance}`,
          scrub: true,
          pin: true,
        },
      });

      animations.push(anim);
    });

    // Cleanup
    return () => {
      animations.forEach((anim) => {
        if (anim.scrollTrigger) anim.scrollTrigger.kill();
        anim.kill();
      });
      if (lenisRef.current) {
        lenisRef.current.destroy();
      }
    };
  }, []);

  // Original 10 projects (R2 via custom domain)
  const ASSETS_BASE = 'https://assets.capbraco.com/images';

const projects = [
  {
    id: 1,
    title: 'Pan Tributario – Mobile Tax Management App',
    image: 'project1.webp',
  },
  {
    id: 2,
    title: 'UNASUR Pavilion – 3D Architectural Render',
    image: 'project2.webp',
  },
  {
    id: 3,
    title: 'Water Well – 3D Industrial Render',
    image: 'project3.webp',
  },
  {
    id: 4,
    title: 'TLS Web – Courier Service Landing Page',
    image: 'project4.webp',
  },
  {
    id: 5,
    title: 'Mamut Fast Food – Restaurant Website',
    image: 'project5.webp',
  },
  {
    id: 6,
    title: 'Lutweb.io – Brand Identity & Web Platform',
    image: 'project6.webp',
  },
  {
    id: 7,
    title: 'Bryan Pawkar – Personal Landing Page',
    image: 'project7.webp',
  },
  {
    id: 8,
    title: '7Fit7 – Fitness Tracking Web Application',
    image: 'project8.webp',
  },
  {
    id: 9,
    title: 'CineStream – Mobile Streaming App UI',
    image: 'project9.webp',
  },
  {
    id: 10,
    title: 'Bookr – Django Bookstore Web App',
    image: 'slider5.webp',
  },
];

  // EXACT original structure
  // Column 1: All 10 items
  // Column 2: Items 1-5, then 1-5 again
  // Column 3: Items 6-10, then 6-10 again
  const column1 = projects;
  const column2 = [...projects.slice(0, 5), ...projects.slice(0, 5)];
  const column3 = [...projects.slice(3, 8), ...projects.slice(3, 8)];

  return (
    <section ref={sectionRef} className="projects-gallery-section">
      <main className="col-scroll">
        {/* Column 1 - Scrolls UP (odd) */}
        <div className="col-scroll__box">
          <div className="col-scroll__list">
            {column1.map((project) => (
              <figure key={`col1-${project.id}`} className="col-scroll__item">
                <img
                  className="col-scroll__img"
                  src={`${ASSETS_BASE}/${project.image}`}
                  alt={project.title}
                  loading="lazy"
                />
                <figcaption className="col-scroll__title">{project.title}</figcaption>
              </figure>
            ))}
          </div>
        </div>

        {/* Column 2 - Scrolls DOWN (even) */}
        <div className="col-scroll__box">
          <div className="col-scroll__list">
            {column2.map((project, index) => (
              <figure key={`col2-${project.id}-${index}`} className="col-scroll__item">
                <img
                  className="col-scroll__img"
                  src={`${ASSETS_BASE}/${project.image}`}
                  alt={project.title}
                  loading="lazy"
                />
                <figcaption className="col-scroll__title">{project.title}</figcaption>
              </figure>
            ))}
          </div>
        </div>

        {/* Column 3 - Scrolls UP (odd) */}
        <div className="col-scroll__box">
          <div className="col-scroll__list">
            {column3.map((project, index) => (
              <figure key={`col3-${project.id}-${index}`} className="col-scroll__item">
                <img
                  className="col-scroll__img"
                  src={`${ASSETS_BASE}/${project.image}`}
                  alt={project.title}
                  loading="lazy"
                />
                <figcaption className="col-scroll__title">{project.title}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </main>
    </section>
  );
};

export default ProjectsGallery;