const mongoose = require("mongoose");

const NotificationSchema = new mongoose.Schema({
    recipient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
    isRead: {
        type: Boolean,
        default: false,
    },
    type: {
        type: String,
        enum: [
            "projectCompletion",
            "taskCompletion",
            "taskAssignment",
            "managerAssignment",
            "deadlineReminder",
            "newComment",
            "fileUpload",
            "projectUpdate",
            "meetingInvitation",
            "importantAnnouncement",
            "bugFix",
            "milestoneAchievement",
            "paymentReminder",
            "teamInvitation",
            "documentApproval",
        ],
        required: true,
    },
    data: {
        type: mongoose.Schema.Types.Mixed,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
}, {
    timestamps: true,
});

const Notification = mongoose.model("Notification", NotificationSchema);

module.exports = Notification;