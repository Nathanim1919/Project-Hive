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
            createdBy
           
        } = req.body;

        
        const task = await Task.create({
            title,
            description,
            priority,
            dueDate,
            createdBy
        })
        
        console.log(task);
        const project = await Project.findById(projectId);
        project.tasks.push(task);

        await project.save()

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

        const tasks = await Task.find();

        res.status(200).json({
            tasks
        })

    }catch(error){
       res.status(500).json({
        message:"unble to fetch tasks"
       })
    }
}