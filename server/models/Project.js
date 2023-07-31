const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    priority: {
        type: String,
        enum: ['High', 'Medium', 'Low'],
        default: 'Medium'
    },
    startDate: {
        type: Date,
        required: true
    },
    dueDate: {
        type: Date,
        required: true
    },
    projectManager: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    team: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    tasks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Task'
    }],
    events: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event'
    }],

    status: {
        type: String,
        enum: ['Planning', 'In Progress', 'Completed', 'On Hold', 'Cancelled'],
        default: 'Planning'
    },
    
    budget: {
        type: Number,
        required: true
    },

    budgetLeft: {
        type: Number,
        default: function () {
            return this.budget;
        }
    },

    internalCost:{
        type:Number,
        default:0
    },
    progress: {
        type: Number,
        default: 0
    },
    chatboard: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Chatboard'
    }
});

const Project = mongoose.model('Project', projectSchema);
module.exports = Project;