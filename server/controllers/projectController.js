const Project = require('../models/Project.js');


module.exports.createProject = async (req, res) => {
    try {
        const {
            id
        } = req.params;

        const {
            title,
            description,
            startDate,
            dueDate,
            priority,
            budget,
        } = req.body;

        const project = await Project.create({
            title,
            description,
            startDate,
            dueDate,
            priority,
            budget,
            projectManager: id
        });

        res.status(200).json({
            meesage: "project created successfully",
            project
        });

    } catch (error) {
        res.status(500).json({
            message: "unable to create a new project"
        })
    }
}

module.exports.getProjects = async (req, res) => {
    try {
        const {
            id
        } = req.params;

        console.log(req.params)

        const projects = await Project.find();
        res.status(200).json({
            projects
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: 'Internal Server Error'
        });
    }
};


module.exports.getProject = async (req, res) => {
    try {
        const {
            projectId
        } = req.params
        const project = await Project.findById(projectId)
            .populate('tasks')
            .populate('team')
            // .populate('events')
            .populate('chatboard');
        res.status(200).json({
            project
        })
    } catch (error) {
        console.log(error);
    }
}

module.exports.addEmployee = async (req, res) => {
    try {
        const {
            projectId
        } = req.params;
        const {
            userId
        } = req.body;

        const project = await Project.findById(projectId);

        const isMember = (project.team).some((member) => member._id.toString() === userId);

        if (isMember) {
            res.status(409).json({
                message: "This Employee is already a member of this project"
            });
        } else {
            project.team.push(userId);
            await project.save();
            res.status(200).json({
                project,
            });
        }
    } catch (error) {
        console.log(error);
    }
};

module.exports.removeEmployee = async (req, res) => {
    try {
        const {
            projectId
        } = req.params;

        const {
            userId
        } = req.body;

        const project = await Project.findById(projectId);

        project.team = project.team.filter((member) => member.toString() !== userId);

        await project.save();

        res.status(200).json({
            project,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: 'Internal Server Error',
        });
    }
};


module.exports.updateProject = async (req, res) => {
    const {
        projectId
    } = req.params;
    const {
        UpdatedData
    } = req.body;

    // Assuming you have a Project model or collection
    // Update the project with the provided ID and user ID
    Project.findOneAndUpdate({
                _id: projectId,
            },
            UpdatedData, {
                new: true
            }
        )
        .then(updatedProject => {
            if (!updatedProject) {
                // If the project doesn't exist or doesn't belong to the user
                return res.status(404).json({
                    error: 'Project not found'
                });
            }

            // Project update successful
            return res.status(200).json({
                message: 'Project updated successfully'
            });
        })
        .catch(error => {
            console.log(error);
            return res.status(500).json({
                error: 'Internal server error'
            });
        });
}

