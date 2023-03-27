import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import "./LogoutButton.css"
  
const LogoutButton = () => {
    const { logout, isAuthenticated } = useAuth0();
    if (isAuthenticated) {
        return (
            <>
                <button className="logout-button" 
                    onClick={() => logout({ returnTo: window.location.origin })}>
                Log Out
                </button>
                <br />
            </>
        );
    }
};
  
export default LogoutButton;