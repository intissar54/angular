const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
    nomArt: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Article', articleSchema);