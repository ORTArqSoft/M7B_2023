const MatchesRepository = require("../dataAccess/matches");
  
exports.getMatch = async (id)  => {
    let matches = await MatchesRepository.getMatch(id);
    return matches;
}
  
exports.getAllMatches = async () => {
    let matches = await MatchesRepository.getAllMatches();
    return matches;
}
  
exports.addMatch = async (match) => {
    let newMatch = await MatchesRepository.addMatch(match);
    return newMatch;
}