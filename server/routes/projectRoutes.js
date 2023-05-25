const express = require('express');
const router = express.Router();
const {
    createProject,
    getProjects,
    getProject
} = require('../controllers/projectController');


router.get('/projects', getProjects)
router.get('/projects/:id', getProject)
router.post('/projects/createProject', createProject)

module.exports = router;
