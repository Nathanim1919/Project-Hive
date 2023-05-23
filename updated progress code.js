const Project = require('../models/Project');
const Task = require('../models/Task');

// Update project completion percentage
const updateProjectCompletionPercentage = async (projectId) => {
    try {
        const totalTasks = await Task.countDocuments({
            project: projectId
        });
        const completedTasks = await Task.countDocuments({
            project: projectId,
            completed: true
        });

        const completionPercentage = (completedTasks / totalTasks) * 100;

        await Project.findByIdAndUpdate(projectId, {
            completionPercentage
        });

    } catch (error) {
        // Handle error
    }
};

// Mark task as completed
const markTaskAsCompleted = async (taskId) => {
    try {
        const task = await Task.findByIdAndUpdate(taskId, {
            completed: true
        });

        // Update project completion percentage
        await updateProjectCompletionPercentage(task.project);

    } catch (error) {
        // Handle error
    }
};

// Mark task as incomplete
const markTaskAsIncomplete = async (taskId) => {
    try {
        const task = await Task.findByIdAndUpdate(taskId, {
            completed: false
        });

        // Update project completion percentage
        await updateProjectCompletionPercentage(task.project);

    } catch (error) {
        // Handle error
    }
};