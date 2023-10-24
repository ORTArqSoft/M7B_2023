const WinnersRepository = require("../dataAccess/winners.js");
  
exports.getWinners = (matchId) => {
    return WinnersRepository.getWinners(matchId);
}

exports.addWinners = async (winners) => {
   await WinnersRepository.addWinners(winners)
}