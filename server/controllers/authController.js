const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fs = require('fs');



// Load the sample employee data from JSON file
const sampleEmployees = JSON.parse(fs.readFileSync('./employee.json'));



module.exports.registerUser = async (req, res) => {
    try {
        const {
            name,
            email,
            password,
            profile,
            phoneNumber,
            position,
            sex,
            employmentDate,
        } = req.body;


        // Verify if the user is an employee
        const isEmployee = sampleEmployees.some((employee) => employee.email === email);

        if (isEmployee) {
        
            const emp = sampleEmployees.find(e => e.email === email);
            const userPositon = position + emp.role
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
                profile,
                phoneNumber,
                position: userPositon,
                sex,
                employmentDate,
            });

            console.log(user);

            // Send a success response
            res.status(200).json({
                message: 'User registered successfully'
            });
        } else {
            res.status(201).json({
                message: 'Unable to find you in our employee database. Please contact our center in person for further discussion.',
            });
        }
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
                     userId: user._id,
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


