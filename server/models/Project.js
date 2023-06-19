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
    internalCost: {
        type: Number,
        default: 0
    },
    budgetLeft: {
        type: Number,
        default: function () {
            return this.budget;
        }
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

// Method to calculate project progress
projectSchema.methods.calculateProgress = async function () {
    const totalTasks = this.tasks.length;
    let completedTasks = 0;
    for (const taskId of this.tasks) {
        const task = await mongoose.model('Task').findById(taskId);
        if (task.status === 'Completed') {
            completedTasks++;
        }
    }
    this.progress = (completedTasks / totalTasks) * 100;

    // Update project status based on progress
    if (this.progress === 100) {
        this.status = 'Completed';
    } else if (this.progress === 0) {
        this.status = 'Planning';
    } else {
        this.status = 'In Progress';
    }
};

// Post-save middleware to update the progress and status
projectSchema.post('save', async function (doc) {
    await doc.calculateProgress();
    await doc.save();
});

const Project = mongoose.model('Project', projectSchema);
module.exports = Project;