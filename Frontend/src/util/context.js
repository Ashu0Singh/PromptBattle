import { createContext, useState, useEffect } from "react";

export const Context = createContext();

const AppContext = ({ children }) => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [userName, setUserName] = useState(
		window.localStorage.getItem("userName") || null
	);
	const [accessToken, setAccessToken] = useState(null);

	return (
		<Context.Provider
			value={{
				isLoggedIn,
				setIsLoggedIn,
				userName,
				setUserName,
				accessToken,
				setAccessToken
			}}>
			{children}
		</Context.Provider>
	);
};

export default AppContext;
