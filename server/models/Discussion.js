const mongoose = require('mongoose');

const discussionSchema = new mongoose.Schema({
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
        required: true
    },
    topic: {
        type: String,
        required: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    messages: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        message: {
            type: String
        },
        timestamp: {
            type: Date,
            default: Date.now()
        },
    }],
});

const Discussion = mongoose.model('Discussion', discussionSchema);

module.exports = Discussion;
