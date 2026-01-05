// src/sections/Resume.jsx
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/cjs/styles/prism";
import './Resume.css';

const codeString = `class BryanAPaucar {
  // I build, I solve, I elevate.
  // My vast variety of skills is continuously expanding.
  
  constructor() {
    this.name = 'Bryan A. Paucar';
    this.dayOfBirthTimestamp = 813895200;
    this.email = 'dev@capbraco.com';
  }
  
  education() {
    return [
      {
        period: '2024–2025',
        description: 'Web Development Concentration at Computer Systems Institute, Boston, MA.',
      },
    ];
  }
  
  certifications() {
    return [
      { title: "CS50's Web Programming with Python and JavaScript", by: 'Harvard University (HarvardX)' },
      { title: 'Frontend Developer', by: 'W3Schools' },
      { title: 'JavaScript: The Advanced Concepts', by: 'Zero To Mastery Academy' },
      { title: 'Complete React Developer (Redux, Hooks, GraphQL)', by: 'Zero To Mastery Academy' },
      { title: 'The Complete Junior to Senior Web Developer Roadmap', by: 'Zero To Mastery Academy' },
      { title: 'Advanced Python', by: 'Codecademy' },
    ];
  }
  
  workExperience() {
    return [
      { period: '2019–Present', role: 'Front-End / Full-Stack Web Developer', company: 'CapBraco.com' },
      { period: '2017–2018', role: 'Front-End Developer', company: 'Dipity Agency' },
    ];
  }
  
  skills() {
    return [
      'JavaScript', 'TypeScript', 'Next.js', 'React', 'Node.js',
      'Django', 'Python', 'Django REST', 'HTML5', 'CSS3',
      'Bootstrap', 'SQL', 'MongoDB', 'Pytest', 'Git & GitHub',
      'CI/CD', 'GraphQL', 'Railway', 'Docker', 'Linux', 'Product Design',
    ];
  }
}

export default BryanAPaucar;`;

const Resume = () => {
  return (
    <section className="resume-section">
      {/* Subtle background particles */}
      <div className="resume-particles"></div>
      
      <div className="resume-container">
        {/* Header with glowing effect */}
        <div className="resume-header">
          <div className="header-decoration">
            <span className="bracket cyan">&lt;</span>
            <h2 className="resume-title">Resume</h2>
            <span className="bracket orange">/&gt;</span>
          </div>
          <div className="header-line"></div>
        </div>

        {/* Code editor styled container */}
        <div className="code-editor-wrapper">
          {/* Editor tabs */}
          <div className="editor-tabs">
            <div className="tab active">
              <span className="tab-icon">●</span>
              <span className="tab-name">BryanAPaucar.js</span>
              <span className="tab-close">×</span>
            </div>
            <div className="tab-controls">
              <span className="control">─</span>
              <span className="control">□</span>
              <span className="control close">×</span>
            </div>
          </div>

          {/* Code content */}
          <div className="code-content">
            <SyntaxHighlighter
              language="javascript"
              style={vscDarkPlus}
              wrapLines={true}
              showLineNumbers={true}
              customStyle={{
                margin: 0,
                padding: '2rem',
                backgroundColor: 'transparent',
                fontSize: 'clamp(0.75rem, 1.5vw, 0.95rem)',
                lineHeight: '1.8',
                fontFamily: "'Fira Code', 'Consolas', 'Monaco', monospace",
                borderRadius: '0 0 12px 12px',
              }}
              lineNumberStyle={{
                minWidth: '3em',
                paddingRight: '1.5em',
                color: 'rgba(100, 200, 255, 0.4)',
                userSelect: 'none',
                borderRight: '1px solid rgba(100, 200, 255, 0.1)',
              }}
              codeTagProps={{
                style: {
                  fontFamily: "'Fira Code', 'Consolas', 'Monaco', monospace",
                  textShadow: '0 0 10px rgba(100, 200, 255, 0.3)',
                }
              }}
            >
              {codeString}
            </SyntaxHighlighter>
          </div>

          {/* Editor footer */}
          <div className="editor-footer">
            <div className="footer-left">
              <span className="footer-item">
                <span className="icon-dot cyan"></span>
                JavaScript
              </span>
              <span className="footer-item">
                <span className="icon-dot orange"></span>
                UTF-8
              </span>
            </div>
            <div className="footer-right">
              <span className="footer-item">Ln 54, Col 2</span>
              <span className="footer-item">Spaces: 2</span>
            </div>
          </div>
        </div>

        {/* Bottom decoration */}
        <div className="resume-bottom-line"></div>
      </div>
    </section>
  );
};

export default Resume;
