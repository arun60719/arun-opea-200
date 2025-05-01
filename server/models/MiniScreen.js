const mongoose = require('mongoose');

const MiniScreenSchema = new mongoose.Schema({
    screenId: {
        type: Number,
        required: true,
        unique: true
    },
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    gallery: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Gallery'
    }],
    businessOwner: {
        type: String,
        required: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('MiniScreen', MiniScreenSchema);