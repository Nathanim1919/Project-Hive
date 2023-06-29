const express = require('express');
const router = express.Router();
const {
    registerValidation,
   loginValidation
} = require('../middlewares/authvalidation.middleware');

const verifyToken = require("../middlewares/auth.middleware")


const {
    registerUser,
    userLoginController,
} = require('../controllers/authController');


router.post('/register', registerValidation, registerUser);
router.post('/login', loginValidation, userLoginController);


module.exports = router;