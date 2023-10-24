const redis = require("redis");
const Queue = require("bull");

const BetsRepository = require("../dataAccess/bets");
const WinnersRepository = require("../dataAccess/winners");
const MatchesRepository = require("../dataAccess/matches");

const redisClient = redis.createClient();
const betsQueue = new Queue("bets", { redis: redisClient });
const resultsQueue = new Queue("results", { redis: redisClient });

exports.addBet = async (bet) => {
  return await betsQueue.add(bet);
}

exports.getBets = (matchId) => {
  return BetsRepository.getBets(matchId);
}

exports.resultsBet = async (matchId, result)=> {
  await resultsQueue.add({ matchId: matchId, ...result });
}

const processResult = async (matchId, result) => {
    const bets = await BetsRepository.getBets(matchId);
    const match = await MatchesRepository.getMatch(matchId);

    const matchDividend = result === "visitor"
      ? match.visitorPay
      : result === "tenant"
      ? match.tenantPay
      : match.drawPay;
  
    const winners = bets
      .filter((bet) => bet.prediction === result)
      .map((bet) => ({
        matchId,
        betId: bet._id,
        amount: bet.amount * (matchDividend || 0),
      }));
  
    WinnersRepository.addWinners(winners);
    MatchesRepository.updateMatchResult(matchId, result)
}

betsQueue.process((job) => {
    console.log("bets queue processing");
    BetsRepository.addBet(job.data);
    return job.data;
  });
  
resultsQueue.process((job) => {
    console.log("result queue processing");
    console.log("%j", job);
    processResult(job.data.matchId, job.data.result);
    return job.data;
});
  