const express = require("express");
const router = express.Router();
const matchesController = require("../controllers/matchesController");

router
    .get("/:id", matchesController.getMatchById)
    .get("/", matchesController.getMatches)
    .post("/", matchesController.createMatch)
    .post("/:matchId/bet", matchesController.createBet)
    .post("/:matchId/result", matchesController.createResult)
    .get("/:matchId/bets", matchesController.getResults)
    .get("/:matchId/bets/winners", matchesController.getWinners);

module.exports = router;
