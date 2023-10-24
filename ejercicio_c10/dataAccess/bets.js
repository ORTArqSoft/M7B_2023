require("./index");
const Bet = require("../models/bet");

exports.getBets = async (matchId) => {
    const bets = await Bet.find({"matchId": matchId});
    return bets
}

exports.addBet = async (bet) => {
    const newBet = new Bet(bet);
    await newBet.save();
    return newBet
  }
