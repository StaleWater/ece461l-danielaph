import { useState } from "react";
import { TextField, Button } from "@mui/material";
import { HardwareSet } from "./Projects"
import request, { Method } from "../util/request";
import "../styles/HardwareControl.css";
import { Token } from "../contexts/AuthContext";

interface HardwareControlProps {
    token: Token;
    hardwareSet: HardwareSet;
    pid: string;
    updateFunc: (message: string) => void;
}

export default function HardwareControl({token, hardwareSet, pid, updateFunc}: Readonly<HardwareControlProps>) {
    const [quantity, setQuantity] = useState<Number>(0);

    const getCheckedOut = () => {
        const num = hardwareSet.checked_out[pid];
        if(num == null)
            return 0;
        return num; 
    }

    const checkIn = async () => {
        if(quantity.valueOf() < 1 || quantity > hardwareSet.availability)
        {
            console.error("Invalid quantity!");
        }

        request(`checkin?hwid=${encodeURIComponent(hardwareSet.hwid)}&qty=${encodeURIComponent(quantity.toString())}&pid=${encodeURIComponent(pid)}`, Method.Post, token)
            .then((response) => {
                if(!response.ok) {
                    response.text().then(text => {
                        updateFunc(text);
                    })
                } else {
                    updateFunc("");
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const checkOut = async () => {
        if(quantity.valueOf() < 1 || quantity > hardwareSet.availability)
        {
            console.error("Invalid quantity!");
        }

        request(`checkout?hwid=${encodeURIComponent(hardwareSet.hwid)}&qty=${encodeURIComponent(quantity.toString())}&pid=${encodeURIComponent(pid)}`, Method.Post, token)
            .then((response) => {
                if(!response.ok) {
                    response.text().then(text => {
                        updateFunc(text);
                    })
                } else {
                    updateFunc("");
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }

    return (
        <>
            <div className="hardwareset-container">
                <div className="info-container">
                    <div className="set-name">{hardwareSet.hwname}</div>
                    <div className="availability-info">Availability: {hardwareSet.availability.toString()}/{hardwareSet.capacity.toString()}</div>
                    <div className="project-checkedout">Checked out by this project: {getCheckedOut().toString()}</div>
                </div>
                <div className="control-container">
                    <TextField className="hardware-input" label="Check in/out" type="number" variant="outlined" size="small" onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}/>
                    <div className="buttons-container">
                        <Button className="hardware-button" variant="contained" size="small" onClick={checkIn}>Check In</Button>
                        <Button className="hardware-button" variant="contained" size="small" onClick={checkOut}>Check Out</Button>
                    </div>
                </div>
            </div>
        </>
    )
}