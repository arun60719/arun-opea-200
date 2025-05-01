const mongoose = require('mongoose');

const GallerySchema = new mongoose.Schema({
    url: {
        type: String,
        required: true
    },
    miniScreenId: {
        type: Number,
        required: true
    },
    uploadedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    uploadedAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Gallery', GallerySchema);