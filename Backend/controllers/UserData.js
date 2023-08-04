const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const UserData = {
	async register(req, res) {
		const { username, email, password } = req.body;
		if (!username || !email || !password) {
			res.status(400);
			res.json({ message: "All feilds mandatory" });
			return;
		}

		const dupEmail = await User.findOne({ email });
		const dupUsername = await User.findOne({ username });

		if (dupUsername || dupEmail) {
			res.status(400);
			res.json({ message: "User already registered" });
			return;
		}

		// Hashed Password
		const hashedPassword = await bcrypt.hash(password, 10);
		const user = await User.create({
			username,
			email,
			password: hashedPassword,
			votes: 0,
			submittedImages: [],
			refreshToken: "",
		});

		if (user) {
			res.status(201).json({
				_id: user.id,
				username: user.username,
				message: "User Registered",
				votes: user.votes,
			});
		} else {
			res.status(400).json({
				message: "User data is not valid",
			});
		}
	},

	async login(req, res) {
		const { email, password } = req.body;
		if (!email || !password) {
			res.status(400).json({
				message: "All fields are mandatory",
			});
		}

		const user = await User.findOne({ email });

		if (user && (await bcrypt.compare(password, user.password))) {
			const accessToken = jwt.sign(
				{
					user: {
						_id: user.id,
						username: user.username,
						votes: user.votes,
						email: user.email,
					},
				},
				process.env.ACCESS_TOKEN_SECRET,
				{ expiresIn: "15m" }
			);
			const refreshToken = jwt.sign(
				{
					user: {
						_id: user.id,
						username: user.username,
						votes: user.votes,
						email: user.email,
					},
				},
				process.env.REFRESH_TOKEN_SECRET,
				{ expiresIn: "1d" }
			);

			await User.updateOne(
				{ _id: user.id },
				{
					$set: {
						...user._doc,
						refreshToken: refreshToken,
					},
				}
			);

			// res.cookie("jwt", refreshToken, {
			// 	httpOnly: true,
			// 	maxAge: 1000,
			// });
			res.status(200).json({ accessToken, refreshToken, message: "Login Successful" });
		} else {
			res.status(400).json({
				message: "Email or Password is not valid",
			});
		}
	},
};

module.exports = UserData;
