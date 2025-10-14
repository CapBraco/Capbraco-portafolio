import WorkCard from "../components/WorkCard";
import projects from "../data/projects";

const Projects = () => {
    return (
        <>
        <h1 className="projects-title">Projects /&gt;</h1>
        <div className="projects">
            {projects.map((item, index) =>(
                <WorkCard key={index} title={item.title} image={item.image} id={item.id}/>
            ))}
        </div>
        </>
    ) 
}

export default Projects;