const { Configuration, OpenAIApi } = require("openai");
require("dotenv").config();
const Image = {
	async generate(req, res) {
		const { prompt } = req.body;
		const configuration = new Configuration({
			apiKey: process.env.OPENAI_API_KEY,
		});

		const openAi = new OpenAIApi(configuration);

		try {
            const response = await openAi.createImage({
                prompt: prompt,
                n: 4,
                size: "512x512",
			});
			res.status(200).json({
				message: "Images Generated",
				images: response.data,
			});
        } catch (error) {
            console.log(error.response.data);
			res.status(500).json({ message: "Internal server error" });
		}
	},
	async submit(req, res) {
		const { imageUrl } = req.body;
		const user = req.user;

		

		res.status(200).json({
			message : "Submitted"
		});
	}
};

module.exports = Image;
