import Homepage from "./components/Home/Homepage";
import Poll from "./components/Polling/Poll";
import Login from "./components/Register/Login";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import GenerateImg from "./components/Image Generation/ImageGen";
import Leaderboard from "./components/Leaderboard/Leaderboard";
import AppContext from "./util/context";
import Register from "./components/Register/Register";

function App() {
	return (
		<AppContext>
			<Router className="App">
				<Routes>
					<Route exact path="/PromptBattle/" element={<Homepage />} />
					<Route exect path="/PromptBattle/Login" element={<Login />} />
					<Route exect path="/PromptBattle/Register" element={<Register />} />
					<Route
						exact
						path="/PromptBattle/GenerateImage/:teamId"
						element={<GenerateImg />}
					/>
					<Route
						exact
						path="/PromptBattle/GenerateImage"
						element={<GenerateImg />}
					/>
					<Route
						exact
						path="/PromptBattle/Leaderboard"
						element={<Leaderboard />}
					/>
					<Route
						exact
						path="/PromptBattle/Polling"
						element={<Poll />}
					/>
				</Routes>
			</Router>
		</AppContext>
	);
}

export default App;
