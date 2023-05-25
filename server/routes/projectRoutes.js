const express = require('express');
const router = express.Router();
const {
    createProject,
    getProjects
} = require('../controllers/projectController');


router.get('/projects', getProjects)
router.post('/projects/createProject', createProject)

module.exports = router;
