import React, { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext.tsx";

export default function PrivateRoute({children}: Readonly<{children: ReactNode}>) {
    const { token } = useAuth();

    // Redirect to login if we're not authenticated
    if (!token) return <Navigate to="/login" replace />;

    return (
        <>
            {React.Children.map(children, (child) => {
                if (React.isValidElement(child)) {
                    return React.cloneElement(child, { token });
                }
                return child;
            })}
        </>
    );
}