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
            priority
        } = req.body;

        const project = await Project.create({
            title,
            description,
            startDate,
            dueDate,
            priority,
            createdBy: id
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
        const projects = await Project.find();
        res.status(200).json({
            projects
        })
    } catch (error) {
        console.log(error);
    }
}
module.exports.getProject = async (req, res) => {

    try {
        const {
            projectId
        } = req.params
        const project = await Project.findById(projectId);
        console.log(projectId);
        res.status(200).json({
            project
        })
    } catch (error) {
        console.log(error);
    }
}