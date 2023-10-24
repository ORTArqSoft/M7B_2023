const {
  addMatch, 
  getMatch,
  getAllMatches
} = require("../services/matches");
const {
  getWinners
} = require("../services/winners");
const {
  addBet,
  getBets,
  resultsBet
} = require("../services/bets");

exports.getMatchById = async (req, res) => {
  try{
    let match = await getMatch(req.params.id);
    if (!match) {
      res.status(404).send("Match not found");
    } else{
      res.status(200).json(match);
    }
  }
  catch (err){
    res.status(500).send((err.message));
  }
};

exports.getMatches = async (req, res) => {
  try{
    let match = await getAllMatches();
    if (!match) {
      res.status(404).send("No matches not found");
    } else {
      res.status(200).json(match);
    }
  }
  catch (err){
    res.status(500).send((err.message));
  }
};

exports.createMatch = async (req, res) => {
  try {
    let newMatch = await addMatch(req.body);
    res.status(201).send(newMatch);
  }
  catch (err){
    res.status(500).send((err.message));
  }
};

exports.createBet = async (req, res) => {
  try {
    let newBet = await addBet({...req.params, ...req.body});
    res.status(201).send(newBet);
  }
  catch (err) {
      res.status(500).send((err.message));
  }
};

exports.createResult = async (req, res) => {
  try {
    let newBet = await resultsBet(req.params.matchId, req.body);
    res.status(201).send(newBet);
  }
  catch (err){
      res.status(500).send((err.message));
  }
};

exports.getResults = async (req, res) => {
  try {
    let match = await getBets(req.params.matchId);
    if (!match) {
      res.status(404).send("Match not found");
    }
    else{
      res.status(200).json(match);
    }
  }
  catch (err){
    res.status(500).send((err.message));
  }
};

exports.getWinners = async (req, res) => {
  try{
    let match = await getWinners(req.params.matchId);
    if (!match) {
      res.status(404).send("Match not found");
    }
    else{
      res.status(200).json(match);
    }
  }
  catch (err){
    console.log(err)
    res.status(500).send((err.message));
  }
};


