import "./Login.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import Wrapper from "../Wrapper/Wrapper";
import { useContext, useState } from "react";

import { register } from "../../util/useFetch";
import { Context } from "../../util/context";

export default function Register() {
	const [classNames, setClassName] = useState(["", "", ""]);
	const [isLoading, setIsLoading] = useState("Register");

	const [input, setInput] = useState({
		username: "",
		email: "",
		password: "",
	});

	const { giveToast } = useContext(Context);

	const handleSubmit = async () => {
		try {
			const response = await register(input);
			console.log(response);
			giveToast(response.status, response.data.message);
		} catch (error) {
			giveToast(500, "Internal Server Error");
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
					<div className="link fc-white">
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
