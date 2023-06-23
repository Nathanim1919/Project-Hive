const Notification = require("./path/to/notificationModel");

// Create a new notification
const createNotification = async (recipientId, message, type, data) => {
    try {
        const notification = new Notification({
            recipient: recipientId,
            message,
            type,
            data,
        });

        await notification.save();
        console.log("Notification created:", notification);
    } catch (error) {
        console.error("Error creating notification:", error);
    }
};

// Usage example
createNotification(
    "recipientUserId",
    "The project has been completed successfully.",
    "projectCompletion", {
        projectId: "projectId123"
    }
);
