const express = require('express');
const router = express.Router();
const varifier = require('../middlewares/auth.middleware');

const {
  getUser,
  getAllUsers
} = require('../controllers/profileController');
//Importing the JWT verifyer from auth middleware 


router.get('/', getAllUsers);
router.get('/:id',getUser);


module.exports = router;