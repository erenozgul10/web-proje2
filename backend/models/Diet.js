const mongoose = require('mongoose');

const DietSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  ad: { type: String, required: true },
  kalori: { type: Number, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Diet', DietSchema);