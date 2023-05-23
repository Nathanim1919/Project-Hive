const express = require('express');
const router = express.Router();

const {
    registerUser,
    userLoginController
} = require('../controllers/authController');


router.post('/register', registerUser);
router.post('/login', userLoginController);


module.exports = router;