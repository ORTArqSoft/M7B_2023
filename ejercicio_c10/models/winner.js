const mongoose = require("mongoose");

const winnersSchema = new mongoose.Schema({
  matchId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Match",
    required: true
  },
  betId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Bet", 
    required: true
  },
  amount: {
    type: Number,
    required: true,
    min: 0
  },
});

module.exports = mongoose.model("Winner", winnersSchema);
