import "./Login.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import Wrapper from "../Wrapper/Wrapper";
import { useContext, useState } from "react";
import { login } from "../../util/useFetch";
import { Context } from "../../util/context";

export default function Login() {
	const [isLoading, setIsLoading] = useState("Login");

	const { giveToast, setAccessToken } = useContext(Context);
	const [input, setInput] = useState({
		email: "",
		password: "",
	});

	const handleSubmit = async () => {
		setIsLoading("");
		try {
			const response = await login(input);
			setAccessToken(response.data.accessToken);
			giveToast(response.status, response.data.message);
			setIsLoading("Login");
		} catch (error) {
            giveToast(500, "Internal Server error");
			setIsLoading("Login");
		}
	};

	function handleChange({ target: { name, value } }) {
		setInput((prevValue) => ({ ...prevValue, [name]: value }));
	}

	return (
		<Wrapper>
			<div className="flex-col borders" style={{ gap: "2rem" }}>
				<h1 className="fs-800 title fc-white extrabold">{">Login"}</h1>
				<div className="login flex-col">
					<div className="form-floating">
						<input
							type="email"
							id="floatingName"
							onChange={handleChange}
							className={`form-control inputFeilds`}
							placeholder="Email"
							name="email"
							value={input.email}
						/>
						<label htmlFor="floatingName">Email</label>
					</div>
					<div className="form-floating">
						<input
							type="password"
							id="floatingInput"
							onChange={handleChange}
							className={`form-control inputFeilds`}
							placeholder="Password"
							name="password"
							value={input.password}
						/>
						<label htmlFor="floatingInput">Password</label>
					</div>
					<div className="link fc-white">
						Don't have an account?{" "}
						<Link to="/PromptBattle/Register">Register</Link>
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
