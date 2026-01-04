const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  telegramId: String,
  coins: { type: Number, default: 0 },
  lastWatch: Date,
  videos: [String]
});

module.exports = mongoose.model('User', UserSchema);
