import NavBar from "../Navigation/Navbar";
import { Toaster } from "react-hot-toast";

export default function Wrapper(props) {
	return (
		<div className="wrapper flex-col">
			<NavBar />
			<div className="container">
				<Toaster position="top-center" reverseOrder={false} />
				{props.children}
			</div>
		</div>
	);
}
