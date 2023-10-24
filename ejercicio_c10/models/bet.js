const mongoose = require("mongoose");

const betsSchema = new mongoose.Schema({
  matchId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Match",
    required: true
  },
  name: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true,
    min: 0
  },
  prediction: {
    type: String,
    required: true,
    enum: ['visitor', 'tenant', 'draw'],
  }
});

module.exports = mongoose.model("Bet", betsSchema);
