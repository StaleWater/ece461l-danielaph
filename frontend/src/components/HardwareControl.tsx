import { TextField, Button } from "@mui/material";
import { HardwareSet } from "./Projects"
import "../styles/HardwareControl.css";

interface HardwareControlProps {
    hardwareSet: HardwareSet;
}

export default function HardwareControl({hardwareSet}: Readonly<HardwareControlProps>) {
    return (
        <>
            <div className="hardwareset-container">
                <div className="info-container">
                    <div className="set-name">{hardwareSet.hwname}</div>
                    <div className="info-bar" />
                </div>
                <div className="control-container">
                    <TextField label="Check in/out" variant="outlined" />
                    <div className="buttons-container">
                        <Button variant="contained">Check In</Button>
                        <Button variant="contained">Check Out</Button>
                    </div>
                </div>
            </div>
        </>
    )
}