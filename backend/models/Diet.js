const mongoose = require('mongoose');

const dietSchema = new mongoose.Schema({
    kullaniciId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    ogunAdi: {
        type: String, 
        required: true
    },
    kalori: {
        type: Number,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Diet', dietSchema);