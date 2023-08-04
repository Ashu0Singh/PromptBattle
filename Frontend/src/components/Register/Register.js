import "./Login.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import Wrapper from "../Wrapper/Wrapper";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function Register() {
	const [classNames, setClassName] = useState(["", "", ""]);
	const [isLoading, setIsLoading] = useState("Register");

	const [input, setInput] = useState({
		username: "",
		email: "",
		password: "",
	});

	const handleSubmit = async () => {
		try {
			await axios.post(
				(process.env.REACT_APP_NODE_ENV == "DEVELOPMENT"
					? process.env.REACT_APP_DEV_URL
					: process.env.REACT_APP_PRODUCTION_URL)+"/user/register",
				input
			).then((response) => {
				if (response.status == 200)
					toast.success(response.data.message);
				else
					toast.error(response.data.message);
			});
		}
		catch (error) {
			toast.error("There's has been a problem on our side");
		}
	};

	function handleChange({ target: { name, value } }) {
		setInput((prevValue) => ({ ...prevValue, [name]: value }));
	}

	return (
		<Wrapper>
			<div className="flex-col borders" style={{ gap: "2rem" }}>
				<h1 className="fs-800 title fc-white extrabold">
					{">Register"}
				</h1>
				<div className="login flex-col">
					<div className="form-floating">
						<input
							type="text"
							id="floatingName"
							onChange={handleChange}
							className={`form-control inputFeilds ${classNames[0]}`}
							placeholder="Username"
							name="username"
							value={input.username}
						/>
						<label htmlFor="floatingName">Username</label>
					</div>
					<div className="form-floating">
						<input
							type="email"
							id="floatingInput"
							onChange={handleChange}
							className={`form-control inputFeilds ${classNames[1]}`}
							placeholder="Email"
							name="email"
							value={input.email}
						/>
						<label htmlFor="floatingInput">Email</label>
					</div>
					<div className="form-floating">
						<input
							type="password"
							id="floatingCode"
							onChange={handleChange}
							className={`form-control inputFeilds ${classNames[2]}`}
							placeholder="Password"
							name="password"
							value={input.password}
						/>
						<label htmlFor="floatingCode">Password</label>
					</div>
					<div className="link">
						Already have an account?{" "}
						<Link to="/PromptBattle/Login">Login</Link>
					</div>
					<button
						className="button fs-50 extrabold fc-white"
						onClick={handleSubmit}>
						{isLoading === "" ? (
							<span
								className="spinner-border spinner-border-sm"
								role="status"
								aria-hidden="true"></span>
						) : (
							isLoading
						)}
					</button>
				</div>
			</div>
		</Wrapper>
	);
}
