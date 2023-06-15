const Task = require('../models/Task.js')
const Project = require('../models/Project.js');


module.exports.createTask = async (req, res) => {
    try {
        const {
            id,
            projectId
        } = req.params;
        const {
            title,
            description,
            priority,
            assignedTo,
            dueDate,
            createdBy,
            project

        } = req.body;


        const task = await Task.create({
            title,
            description,
            priority,
            dueDate,
            assignedTo,
            createdBy,
            project
        })

        const owner_project = await Project.findById(projectId);
        owner_project.tasks.push(task);

        await owner_project.save()

        res.status(200).json({
            message: "Tasks created successfully",
            task
        })

    } catch (error) {
        res.status(500).json({
            message: "unable to create task"
        })
    }
}



module.exports.getTasks = async (req, res) => {

    try {
        const {
            id,
            projectId
        } = req.params;

        const tasks = await Task.find({
            project: projectId
        }).populate('assignedTo').populate('project').populate('createdBy');

        res.status(200).json({
            tasks
        })

    } catch (error) {
        res.status(500).json({
            message: "unble to fetch tasks"
        })
    }
}
module.exports.updateTask = async (req, res) => {
    const {
        taskid
    } = req.params;
    const updateObj = req.body; // Get the key-value pairs from the request body

    try {
        const updatedTask = await Task.findOneAndUpdate({
                _id: taskid
            },
            updateObj, // Use the updateObj to update the specified fields dynamically
            {
                new: true
            }
        );

        if (!updatedTask) {
            return res.status(404).json({
                error: 'Task not found'
            });
        }

        return res.status(200).json({
            message: 'Task updated successfully',
            updatedTask,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error: 'Internal server error'
        });
    }
};
