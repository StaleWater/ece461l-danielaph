import { useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { AppBar, Button } from '@mui/material';
import "../styles/Navbar.css";

export default function Navbar() {
    const auth = useAuth();
    const location = useLocation();

    return (
        <>
            <AppBar position="static" className="app-navbar">
                {location.pathname != "/signup" && location.pathname != "/login" && (
                    <Button variant="contained" sx={{backgroundColor: "darkblue", color: "white"}} onClick={auth.logout} className="logout-button">
                        Logout
                    </Button>
                )}
            </AppBar>
        </>
    );
}