const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fs = require('fs');




// Load the sample employee data from JSON file
const sampleEmployees = JSON.parse(fs.readFileSync('./employee.json'));



module.exports.registerUser = async (req, res) => {
    try {
        const {
            email,
            password,
            profile,
            code
        } = req.body;

        // Check if the email already exists
        const existingUser = await User.findOne({
            email
        });
        if (existingUser) {
            return res.status(400).json({
                message: 'This email is already registered. Please use another email address.',
            });
        }

        // Verify if the user is an employee
        const emp = sampleEmployees.find((employee) => employee.email === email && employee.employeeCode === code);
        if (!emp) {
            return res.status(201).json({
                message: 'Unable to find you in our employee database. Please contact our center in person for further discussion.',
            });
        }

        const {
            role,
            fullName,
            phoneNumber,
            sex,
            employmentDate,
            salary,
            employeeCode
        } = emp;

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name: fullName,
            email,
            password: hashedPassword,
            profile,
            phoneNumber,
            position: role,
            salary,
            sex,
            employmentDate,
            code: employeeCode,
        });

        // Send a success response
        res.status(200).json({
            message: 'User registered successfully',
        });
    } catch (error) {
        // Send an error response
        res.status(500).json({
            message: 'Failed to register user',
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
                }, 'secretKey');

                // Set the token as a cookie
                res.cookie('jwt', token, {
                    httpOnly: true,
                    maxAge: 24 * 60 * 60 * 1000, // 24 hours
                    secure: process.env.NODE_ENV === 'production', // Set "secure" to true in production
                });

                res.status(200).json({
                    token,
                    userId: user._id,
                    message: 'Logged in successfully',
                });
            } else {
                res.status(401).json({
                    error: 'Incorrect password',
                });
            }
        } else {
            res.status(404).json({
                error: 'User with this email does not exist. Please create an account first.',
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: 'Internal server error',
        });
    }
};


module.exports.userLogoutController = (req, res) => {
    // Clear the authentication token
    // ...

    // Set Cache-Control header to prevent caching
    res.set('Cache-Control', 'no-store');

    // Redirect the user to the login page or a public landing page
    res.redirect('/login');
};

