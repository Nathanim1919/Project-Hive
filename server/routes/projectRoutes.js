const express = require('express');
const router = express.Router();
const {
    createProject,
    getProjects,
    getProject,
    addEmployee,
    removeEmployee,
    updateProject
} = require('../controllers/projectController');
//Importing the JWT verifyer from auth middleware 
const verifyToken = require("../middlewares/auth.middleware")


const {
    createTask,
    getTasks,
    updateTask
} = require('../controllers/taskController');


router.get('/projects', getProjects)
router.get('/projects/:projectId', getProject)
router.post('/projects/:projectId/addEmployee', addEmployee)
router.post('/projects/:projectId/removeEmployee', removeEmployee)
router.get('/projects/:projectId/getTasks', getTasks);
router.post('/projects/createProject', createProject)
router.post('/projects/:projectId/createTask', createTask);
router.post('/projects/:projectId/tasks/:taskid', updateTask);
router.post('/projects/:projectId/updateProject', updateProject);

module.exports = router;