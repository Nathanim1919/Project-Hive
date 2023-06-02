const Task = require('../models/Task.js')


modules.export.createTask = async (req, res) => {
    try {

        const {
            projectId
        } = req.params;

        const {
            title,
            description,
            priority,
            dueDate,
            assignedTo,     
        } = req.body;

        const task = await Task.create({
            title,
            description,
            priority,
            dueDate,
            assignedTo
        })

        res.status(200).json({
            message:"Tasks created successfully",
            task
        })
        
    } catch (error) {
        res.status(500).json({
            message:"unable to create task"
        })
    }
}