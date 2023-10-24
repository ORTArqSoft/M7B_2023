const mongoose = require("mongoose");

const matchSchema = new mongoose.Schema({
  tenant: {
    type: String,
    required: true,
    trim: true, 
  },
  visitor: {
    type: String,
    required: true,
    trim: true, 
  },
  date: {
    type: Date,
    required: true,
    min: new Date(),
  },
  visitorPay: {
    type: Number,
    required: true,
    min: 0, 
  },
  tenantPay: {
    type: Number,
    required: true,
    min: 0,
  },
  drawPay: {
    type: Number,
    required: true,
    min: 0,
  },
  result: {
    type: String,
    enum: ['tenant', 'draw', 'visitor'],
  }
});

module.exports = mongoose.model("Match", matchSchema);
