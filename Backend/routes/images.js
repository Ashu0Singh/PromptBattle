const express = require('express');
const Image = require('../controllers/Image');

const router = express.Router();

router.post("/generate", Image.generate);

module.exports = router;