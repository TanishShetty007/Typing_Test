const mongoose = require('mongoose');

const passageSchema = new mongoose.Schema({
    text: { type: String, required: true },
    difficulty: { type: String, enum: ['easy', 'medium', 'hard'], required: true },
    category: { type: String, enum: ['general', 'quotes', 'code'], required: true },
    language: { type: String },
    duration: { type: Number },
    explanation: { type: String }
});

module.exports = mongoose.model('Passage', passageSchema);
