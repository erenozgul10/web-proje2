const mongoose = require('mongoose');

const WorkoutSchema = new mongoose.Schema({
  // İŞTE HOCANIN İSTEDİĞİ RELATİON (REF) BURADA!
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  tip: { type: String, required: true },
  sure: { type: Number, required: true },
  kalori: { type: Number },
  notlar: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Workout', WorkoutSchema);