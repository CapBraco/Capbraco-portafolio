import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { nightOwl } from "react-syntax-highlighter/dist/cjs/styles/prism";


const codeString = `
class BryanAPaucar {
  // I build, I solve, I elevate.
  // My vast variety of skills is continuously expanding.
  constructor() {
    this.name = 'Bryan A. Paucar';
    this.dayOfBirthTimestamp = 813895200;
    this.email = 'dev@capbraco.com';
  }

  education() {
    return [
      { '2024-2025': 'Certificate in Web Development (CompTIA/Microsoft Track) at Computer Systems Institute, Boston, MA.'},
      { '2018-2023': 'B.Sc. in Computer Science Engineering at Universidad Central del Ecuador, Quito, EC.'},
    ];
  }

  selectedCertifications() {
    return [
      {
        title: "CS50's Web Programming with Python and JavaScript",
        issuedBy: 'Harvard University (HarvardX)',
        year: 2025,
      },
      {
        title: 'AWS Certified Solutions Architect - Associate',
        issuedBy: 'Amazon Web Services (AWS)',
        year: 2025,
      },
      {
        title: 'Full-Stack Engineer',
        issuedBy: 'Codecademy',
        year: 2025,
      },
      {
        title: 'JavaScript: The Advanced Concepts',
        issuedBy: 'ZeroToMastery Academy',
        year: 2023,
      },
      {
        title: 'Complete React Developer (w/ Redux, Hooks, GraphQL)',
        issuedBy: 'ZeroToMastery Academy',
        year: 2023,
      },
      {
        title: 'The Complete Junior to Senior Web Developer Roadmap',
        issuedBy: 'ZeroToMastery Academy',
        year: 2022,
      },
      // +10 additional certifications...
    ];
  }

  workExperience() {
    return [
      { '2019-now': 'Founder / Web Developer at Lutweb.io' },
      { '2017-2018': 'Front-End Developer at Dipity Agency' },
    ];
  }

  skills() {
    return {
      languagesAndFrameworks: [
        'JavaScript / TypeScript',
        'Angular (12+), React, React Native',
        'Node.js / NestJS / Express.js',
        'Python / Django / REST APIs',
        'HTML5 / CSS3 / SCSS / Bootstrap',
        'SQL / Oracle / MongoDB',
      ],
      testingAndCI: [
        'Unit, Integration & Performance Testing (Jest, Pytest, Selenium)',
        'Git / Version control / GitHub / GitLab',
        'Jenkins CI/CD pipelines',
        'Acceptance Test Driven Development (ATDD)',
      ],
      backendAndDevOps: [
        'RESTful APIs / GraphQL / Apollo Client',
        'Microservices Architecture / Monorepo management',
        'AWS (EC2, EKS, S3, CloudFormation, CloudWatch, Lambda, DynamoDB)',
        'Docker / Kubernetes / Containerization',
        'Linux / Bash / Shell scripting',
        'Kafka (topics, consumers, partitions)',
      ],
      frontendAndUX: [
        'Responsive & Component-based UI development',
        'Usability & accessibility best practices',
        'Cross-browser compatibility / Prototyping',
      ],
      softSkills: [
        'Analytical thinking & problem-solving',
        'Attention to detail & code quality mindset',
        'Communication & team collaboration',
        'Adaptability & continuous learning',
        'Mentorship / leadership',
        'Ownership & accountability',
        'Customer-oriented, value-driven thinking',
        'Time management / prioritization',
      ],
    };
  }
}
`;

const Skills = () => {
  return (
    <div
      style={{
        maxWidth: "100%", // asegúrate de limitar el ancho
        overflowX: "hidden",
      }}
    >
      <SyntaxHighlighter
        language="javascript"
        style={nightOwl}
        showLineNumbers
        wrapLongLines // 👈 esta prop sí funciona si NO hay overflow:auto
        customStyle={{
          whiteSpace: "pre-wrap",     // permite los saltos de línea
          wordBreak: "break-word",    // corta las palabras largas
          overflowX: "visible",       // 👈 esto es clave, no uses auto aquí
          width: "100%",
          lineHeight: "1.6",
          fontSize: "14px",
          backgroundColor: "#011627", // nightOwl base
          borderRadius: "8px",
          padding: "16px",
        }}
        lineNumberStyle={{
          minWidth: "2.5em",
          textAlign: "right",
          paddingRight: "1em",
          opacity: 0.6,
        }}
      >
        {codeString}
      </SyntaxHighlighter>
    </div>
  );
};

export default Skills;
