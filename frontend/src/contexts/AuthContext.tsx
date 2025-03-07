import { createContext, useContext, useState, ReactNode } from "react";

// This is our "auth object", which allows us to set and fetch the JWT from anywhere within an AuthProvider.
interface TokenContext { 
    token : string | null;
    login: (token: string) => void;
    logout: () => void;
}

const AuthContext = createContext<TokenContext | null>(null);

export default function AuthProvider({children}: Readonly<{ children: ReactNode }>) {
    const [token, setToken] = useState<string | null>(localStorage.getItem("auth_jwt"));

    const login = (token: string) => {
        setToken(token);
        localStorage.setItem("auth_jwt", token);
    };
    const logout = () => {
        setToken(null);
        localStorage.setItem("auth_jwt", "");
    };

    // Every child element is simply rendered under this AuthContext.Provider element, which sets the appropriate AuthContext and allows use of the useAuth() hook
    return (
        <AuthContext.Provider value={{ token: token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

// This hook is how you'll actually fetch token data on the fly.
export function useAuth() {
    const context = useContext(AuthContext);
    return context;
}