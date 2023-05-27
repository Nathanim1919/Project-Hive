const mongoose = require('mongoose');

const projectCompletionReportSchema = new mongoose.Schema({
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
        required: true
    },
    projectManager: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    projectExecutive: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    completionDate: {
        type: Date,
        required: true
    },
    summary: {
        type: String,
        required: true
    },
    feedback: {
        type: String
    }
});

const ProjectCompletionReport = mongoose.model('ProjectCompletionReport', projectCompletionReportSchema);

module.exports = ProjectCompletionReport;