const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');



module.exports.registerUser = async (req, res) => {
    try {
        const {
            name,
            email,
            password,
            phoneNumber,
            position,
            sex,
            dateOfBirth,
            employmentDate,
        } = req.body;

        // Check if the email already exists
        const existingUser = await User.findOne({
            email
        });
        if (existingUser) {
            return res.status(400).json({
                message: 'Email already exists'
            });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            phoneNumber,
            position,
            sex,
            dateOfBirth,
            employmentDate,
        });

        console.log(user);

        // Send a success response
        res.status(200).json({
            message: 'User registered successfully'
        });
    } catch (error) {
        console.log(error);
        // Send an error response
        res.status(500).json({
            message: 'Failed to register user'
        });
    }
};




// login controller

module.exports.userLoginController = async (req, res) => {
    try {
        const {
            email,
            password
        } = req.body;

        const user = await User.findOne({
            email
        });

        if (user) {
            const passwordMatch = await bcrypt.compare(password, user.password);
            if (passwordMatch) {
                // Generate JWT token
                const token = jwt.sign({
                    userId: user._id
                }, "secretKey");

                res.status(200).json({
                    token,
                    message: 'Logged in successfully'
                });
            } else {
                res.status(401).json({
                    error: 'Incorrect password'
                });
            }
        } else {
            res.status(404).json({
                error: 'User with this email does not exist. Please create an account first.'
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: 'Internal server error'
        });
    }
};
