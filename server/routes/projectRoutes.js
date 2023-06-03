const express = require('express');
const router = express.Router();
const {
    createProject,
    getProjects,
    getProject,
    addEmployee
} = require('../controllers/projectController');


const {
    createTask,
    getTasks
} = require('../controllers/taskController');


router.get('/projects', getProjects)
router.get('/projects/:projectId', getProject)
router.post('/projects/:projectId/addEmployee', addEmployee)
router.get('/projects/:projectId/getTasks', getTasks);
router.post('/projects/createProject', createProject)
router.post('/projects/:projectId/createTask', createTask);

module.exports = router;