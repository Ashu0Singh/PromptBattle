import { createContext, useState } from "react";
import { toast } from "react-hot-toast";

export const Context = createContext();

const AppContext = ({ children }) => {
	const style = {
		borderRadius: "10px",
		background: "#333",
		color: "#fff",
	};
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [userName, setUserName] = useState(
		window.localStorage.getItem("userName") || null
	);
	const [accessToken, setAccessToken] = useState(
		window.localStorage.getItem("accesstoken") || null
	);
	const giveToast = (status, message) => {
		if (status === 200 || status === 201) toast.success(message, {style});
		else toast.error(message,{style});
	};
	return (
		<Context.Provider
			value={{
				isLoggedIn,
				setIsLoggedIn,
				userName,
				setUserName,
				accessToken,
				setAccessToken,
				giveToast,
			}}>
			{children}
		</Context.Provider>
	);
};

export default AppContext;
