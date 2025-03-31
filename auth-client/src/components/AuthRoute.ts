import React from "react";
import { Navigate } from "react-router-dom";

interface AuthRouteProps {
    children: React.ReactNode | null;
}
  
const AuthRoute: React.FC<AuthRouteProps> = ({ children }) => {
    const token = localStorage.getItem('token');
    if (!token) {
        return React.createElement(Navigate, { to: "/login", replace: true });
    }
    return children;
};
  
  export default AuthRoute;