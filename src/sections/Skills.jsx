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
      },
      {
        title: 'AWS Certified Solutions Architect - Associate',
        issuedBy: 'Amazon Web Services (AWS)',
      },
      {
        title: 'Full-Stack Engineer',
        issuedBy: 'Codecademy',
      },
      {
        title: 'JavaScript: The Advanced Concepts',
        issuedBy: 'ZeroToMastery Academy',
      },
      {
        title: 'Complete React Developer (w/ Redux, Hooks, GraphQL)',
        issuedBy: 'ZeroToMastery Academy',
      },
      {
        title: 'The Complete Junior to Senior Web Developer Roadmap',
        issuedBy: 'ZeroToMastery Academy',
      },
      // + additional certifications...
    ];
  }

  workExperience() {
    return [
      { '2019-now': 'Founder / Web Developer at Lutweb.io' },
      { '2017-2018': 'Front-End Developer at Dipity Agency' },
    ];
  }

  skills() {
    return [ 'JavaScript', 'TypeScript', 'Angular', 'React, React Native', 'Vue', 'Node.js', 'NestJS', 'Express.js', 'Python', 'Django', 'REST APIs', 'HTML5', 'CSS3', 'SCSS', 'Bootstrap', 'SQL', 'Oracle', 'MongoDB', 'Jest', 'Pytest', 'Selenium', 'Git-GitHub', 'Jenkins CI/CD', 'ATDD', 'GraphQL', 'Apollo', 'Microservices', 'Monorepo', 'AWS', 'EC2', 'EKS', 'S3', 'CloudFormation', 'CloudWatch', 'DynamoDB', 'Docker', 'Kubernetes', 'Containerization', 'Linux', 'Bash', 'Kafka'];
  }
};
`;

const Skills = () => {
  return (
    <>
    <div
    className="skills"
  style={{
    display: "flex",
    justifyContent: "center", // horizontal center
    alignItems: "center",     // vertical center (if parent has height)
    flexDirection: "column",
    width: "100%",
  }}
>
  <h1 id="skills-title">| Skills /&gt;</h1>
  
  <SyntaxHighlighter
    language="javascript"
    style={nightOwl}
    wrapLines={true}
    showLineNumbers
    customStyle={{
      whiteSpace: "pre-wrap",      // permite saltos de línea
      overflowWrap: "anywhere",    // rompe solo si no cabe en la línea
      wordBreak: "break-word", 
      width: "80%",
      margin: "0 auto",
      lineHeight: "1.6",
      fontSize: "2.5vmin",
      backgroundColor: "#011627",
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

    </>
  );
};

export default Skills;
