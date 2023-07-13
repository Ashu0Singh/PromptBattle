const express = require('express');
const { getLeaderboard } = require('../controllers/Leaderboard');
const verifyJWT = require('../middleware/verifyJWT');

const router = express.Router();
router.use(verifyJWT);
router.get("/", getLeaderboard);

module.exports = router;