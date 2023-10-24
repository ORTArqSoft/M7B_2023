const MatchesService = require("../services/matches");
const WinnersService = require("../services/winners");
const BetsService= require("../services/bets");

exports.getMatchById = async (req, res) => {
  try{
    let match = await MatchesService.getMatch(req.params.id);
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
    let match = await MatchesService.getAllMatches();
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
    let newMatch = await MatchesService.addMatch(req.body);
    res.status(201).send(newMatch);
  }
  catch (err){
    res.status(500).send((err.message));
  }
};

exports.createBet = async (req, res) => {
  try {
    let newBet = await BetsService.addBet({...req.params, ...req.body});
    res.status(201).send(newBet);
  }
  catch (err) {
      res.status(500).send((err.message));
  }
};

exports.createResult = async (req, res) => {
  try {
    let newBet = await BetsService.resultsBet(req.params.matchId, req.body);
    res.status(201).send(newBet);
  }
  catch (err){
      res.status(500).send((err.message));
  }
};

exports.getBets = async (req, res) => {
  try {
    let match = await BetsService.getBets(req.params.matchId);
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
    let match = await WinnersService.getWinners(req.params.matchId);
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


