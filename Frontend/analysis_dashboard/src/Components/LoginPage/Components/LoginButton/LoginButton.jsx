import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const LoginButton = () => {
	const { loginWithRedirect, isAuthenticated } = useAuth0();
	if (!isAuthenticated) {
		return <button className="login-button"
			onClick={() => loginWithRedirect()}>
		Log In</button>;
	}
};

export default LoginButton;
