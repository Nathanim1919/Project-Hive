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
            dueDate,
            createdBy,
            project
           
        } = req.body;

        
        const task = await Task.create({
            title,
            description,
            priority,
            dueDate,
            createdBy,
            project
        })
        
        console.log(task);
        const owner_project = await Project.findById(projectId);
        owner_project.tasks.push(task);

        await owner_project.save()

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



module.exports.getTasks = async (req, res)=>{

    try{
        const {
            id,
            projectId
        } = req.params;

        const tasks = await Task.find({project:projectId});

        res.status(200).json({
            tasks
        })

    }catch(error){
       res.status(500).json({
        message:"unble to fetch tasks"
       })
    }
}