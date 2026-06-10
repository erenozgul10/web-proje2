const mongoose = require('mongoose');

const UserDataSchema = new mongoose.Schema({
  kullaniciId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  olcumler: {
    boy: String,
    kilo: String,
    yag: String,
    bel: String,
    omuz: String,
    sirt: String
  }
});

module.exports = mongoose.model('UserData', UserDataSchema);