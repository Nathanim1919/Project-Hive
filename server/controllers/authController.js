const userModel = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const asyncHandler = require("express-async-handler");

// Load the sample employee data from JSON file
const sampleEmployees = JSON.parse(fs.readFileSync('./employee.json'));



module.exports.registerUser = asyncHandler(async (req, res) => {
    const {
        email,
        password,
        profile,
        code
    } = req.body;

    // Check if the email already exists
    const verifyEmail = await userModel.findOne({
        email: email
    })
    const emp = sampleEmployees.find((employee) => employee.email === email && employee.employeeCode === code);
    if (!emp) {
        return res.status(201).json({
            message: 'Unable to find you in our employee database. Please contact our center in person for further discussion.',
        });
    }
    // Verify if the user is an employee
    const {
        role,
        fullName,
        phoneNumber,
        sex,
        employmentDate,
        salary,
        employeeCode
    } = emp;


    try {
        if (verifyEmail) {
            return res.status(403).json({
                message: "Email already used"
            })
        } else {
            bcrypt.hash(password, 10)
                .then((hash) => {
                    //Registering the user
                    const user = new userModel({
                        name: fullName,
                        email,
                        password: hash,
                        profile,
                        phoneNumber,
                        position: role,
                        salary,
                        sex,
                        employmentDate,
                        code: employeeCode,
                    });

                    //saving the data to the mongodb user collection
                    user.save()
                        .then((response) => {
                            return res.status(201).json({
                                message: 'user successfully created!',
                                result: response,
                                success: true
                            })
                        })
                        .catch((error) => {
                            res.status(500).json({
                                error: error,
                            })
                        })
                })

        }

    } catch (error) {
        // Send an error response
       return res.status(412).send({
           success: false,
           message: error.message
       })
    }
});





// login controller
module.exports.userLoginController = async (req, res) => {
    try {
        const {
            email,
            password
        } = req.body;

        const user = await userModel.findOne({
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