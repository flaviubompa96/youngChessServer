const Player = require("../models/playerModel");

const getPlayerByFideId = async (req, res) => {
    try {
        const player = await Player.findOne({ fideid: req.params.fideid });
        if (player) {
            res.json(player);
        } else {
            res.status(404).json({ message: "Player not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

const getPaginatedPlayers = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 100;
        const skip = (page - 1) * limit;
        const players = await Player.find().skip(skip).limit(limit);
        const totalPlayers = await Player.countDocuments();
        const totalPages = Math.ceil(totalPlayers / limit);

        res.json({
            page,
            limit,
            totalPages,
            totalPlayers,
            players,
        });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

module.exports = {
    getPlayerByFideId,
    getPaginatedPlayers,
};
