const Project = require('../models/Project.js');
const User = require('../models/User.js');
const Notification = require('../models/Notification.js')
const Report = require('../models/Report.js');
const Chatboard = require('../models/Chatboard'); // Import the Chatboard model
const {
    createNotification
} = require('./notificationController')


module.exports.createProject = async (req, res) => {
    try {
        const {
            title,
            description,
            startDate,
            dueDate,
            priority,
            budget,
        } = req.body;

        // Create the project
        const project = await Project.create({
            title,
            description,
            startDate,
            dueDate,
            priority,
            budget,
            projectManager: null,
        });

        // Create the Chatboard associated with the project
        const chatboard = await Chatboard.create({
            project: project._id, // Use the _id of the created project
            teams: [], // Initially, no team members are added
            messages: [], // Initially, no messages are added
        });

        // Update the project's chatboard field with the created chatboard's _id
        project.chatboard = chatboard._id;
        await project.save();

        res.status(200).json({
            message: 'Project and Chatboard created successfully',
            project,
            chatboard,
        });
    } catch (error) {
        res.status(500).json({
            message: 'Unable to create a new project and chatboard',
            error: error.message,
        });
    }
};



module.exports.getProjects = async (req, res) => {
    try {
        const {
            id
        } = req.params;

        const projects = await Project.find()
            .populate('tasks')
            .populate('projectManager')
            .populate('team');


        res.status(200).json({
            projects
        });
    } catch (error) {
        console.error(error);
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
            .populate('projectManager')
            .populate('team')
            .populate('tasks')
        res.status(200).json({
            project
        })
    } catch (error) {
        console.log(error);
    }
}


module.exports.updateProject = async (req, res) => {
    try {
        const {
            projectId
        } = req.params;
        const {
            projectManager,
            status,
            priority,
            progress,
            title,
            description,
            internalCost,
            dueDate,
        } = req.body;
        
        
        const project = await Project.findById(projectId);

       if (internalCost > 0) {
           if (project.budgetLeft - internalCost >= 0) {
               project.budgetLeft = project.budgetLeft - internalCost;
               project.internalCost = project.internalCost + Number(internalCost);
               await project.save();
           } else {
               return res.status(200).json({
                   message: "Insufficient budget, please request for additional budget"
               });
           }
       }


        // Remove the old project manager from the team if it exists
        if (project && project.projectManager) {

            const updatedTeam = project.team.filter(
                (user) => user && user.toString() !== project.projectManager.toString()
            );
            project.team = updatedTeam;
            await project.save();
        }

        // Set the new project manager
        project.team.push(projectManager);
        project.projectManager = projectManager;
        await project.save();

        const updatedProject = await Project.findOneAndUpdate({
            _id: projectId
        }, {
            projectManager,
            status,
            priority,
            progress,
            title,
            description,
            internalCost,
            dueDate,
        }, {
            new: true
        });

        if (!updatedProject) {
            return res.status(404).json({
                error: 'Project not found'
            });
        }
        const message = 'project updated'
        const type = 'projectUpdate'
        createNotification(project, User, Notification, message, type);

        return res.status(200).json({
            message: 'Project updated successfully',
            updatedProject,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error: 'Internal server error'
        });
    }
};


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
            const user = await User.findById(userId);
            if ((!project.projectManager && user.position === 'Project Manager') || (project.projectManager && user.position !== 'Project Manager')) {
                project.team.push(userId);
                if (user.position === 'Project Manager') {
                    project.projectManager = user
                }
                await project.save();
                res.status(200).json({
                    project,
                });
            } else {
                res.status(409).json({
                    message: "This project already has Project manager assigned"
                });
            }
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
        const user = await User.findById(userId);

        if (user._id.toString() === project.projectManager._id.toString()) {
            project.projectManager = null;
        }

        project.team = project.team.filter(
            (member) => member.toString() !== userId
        );

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

module.exports.createProjectReport = async (req, res) => {
    try {
        const {
            projectId
        } = req.params;

        const {
            report,
            project
        } = req.body;

        const {
            projectManager,
            dueDate
        } = project

        const newReport = await Report.create({
            project: projectId,
            projectManager,
            completionDate: dueDate,
            summary: report,
        })

        res.status(200).json({
            message: "report created successfully",
            newReport,
        })

    } catch (error) {
        console.log(error);
    }
}



module.exports.getReports = async (req, res) => {
    try {
        const reports = await Report.find().populate('project').populate('projectManager').populate('project.team');
        res.status(200).json({
            message: "report fetched successfully",
            reports
        })
    } catch (error) {
        console.log(error);
    }
}