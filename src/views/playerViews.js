const express = require("express");
const { getPlayerByFideId, getPaginatedPlayers } = require("../controllers/playerController");

const router = express.Router();

router.get("/:fideid", getPlayerByFideId);
router.get("/", getPaginatedPlayers);

module.exports = router;
