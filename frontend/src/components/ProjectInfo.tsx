import { Project, HardwareSet } from './Projects';
import HardwareControl from './HardwareControl';
import { ListItemText } from '@mui/material';
import { useState } from "react";
import "../styles/ProjectInfo.css";

interface ProjectInfoProps {
    project: Project
    hardwareSets: HardwareSet[]
}

export default function ProjectInfo({project}: Readonly<ProjectInfoProps>) {
    const [hardwareSets, setHardwareSets] = useState<HardwareSet[]>([])

    return (
        <>
            <div className="project-info-container">
                <div className="project-info-text">
                    <ListItemText sx={{textAlign: "center"}} primary={project.name} secondary={`ID: ${project.pid}`} slotProps={{secondary: {sx: {color: "text.primary"}}}} />
                </div>
                <div className="hardware-container">
                    {hardwareSets.map((hardwareSet, index) => (
                        <HardwareControl key={index} hardwareSet={hardwareSet} />
                    ))}
                </div>
            </div>
        </>
    )
}