require("./index.js");
const Match = require("../models/match.js");

exports.getMatch = async (id) => Match.findById(id);

exports.getAllMatches = async () => Match.find();

exports.addMatch = async (match) => {
  if (match.result) {
    throw new Error("Match result should be empty");
  }

  const newMatch = new Match(match);
  await newMatch.save();
  return newMatch;
};

exports.updateMatchResult =  async (id, result) => {
  const match = await Match.findById(id);

  if (!match) {
    throw new Error("Match not found");
  }

  if (match.result) {
    throw new Error("Match already has a result");
  }

  match.result = result;

  await match.save();

  return match;
}

