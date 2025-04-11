import { Project, HardwareSet } from './Projects';
import HardwareControl from './HardwareControl';
import { ListItemText } from '@mui/material';
import "../styles/ProjectInfo.css";

interface ProjectInfoProps {
    project: Project;
    hardwareSets: HardwareSet[];
    updateFunc: () => void;
}

export default function ProjectInfo({project, hardwareSets, updateFunc}: Readonly<ProjectInfoProps>) {
    return (
        <>
            <div className="project-info-container">
                <div className="project-info-text">
                    <ListItemText sx={{textAlign: "center"}} primary={project.name} secondary={`ID: ${project.pid}`} slotProps={{primary: {sx: {fontSize: "28px"}}, secondary: {sx: {color: "white"}}}} />
                    <ListItemText sx={{textAlign: "center"}} primary={project.description} slotProps={{primary: {sx: {fontSize: "16px"}}}} />
                </div>
                <div className="hardware-container">
                    {hardwareSets.map((hardwareSet, index) => (
                        <HardwareControl key={index} hardwareSet={hardwareSet} pid={project.pid} updateFunc={updateFunc} />
                    ))}
                </div>
            </div>
        </>
    )
}