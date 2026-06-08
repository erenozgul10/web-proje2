const mongoose = require('mongoose');

const workoutSchema = new mongoose.Schema({
    kullaniciId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
        required: true
    },
    baslik: {
        type: String, 
        required: true
    },
    sure: {
        type: Number, 
        required: true
    },
    notlar: {
        type: String
    }
}, { timestamps: true });

module.exports = mongoose.model('Workout', workoutSchema);