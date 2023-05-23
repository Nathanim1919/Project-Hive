const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRouter = require('./routes/authRoutes.js')

const app = express();

// Middleware
app.use(express.json());

app.use(cors({
    origin: ['http://localhost:3000'],
    methods: ['GET', 'HEAD', 'PUT', 'POST', 'DELETE'],
    credentials: true,
    allowedHeaders: ['Content-Type'],
}));


// Connect to MongoDB database
mongoose.connect('mongodb://127.0.0.1:27017/projecthive', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log('Connected to MongoDB'))
    .catch(error => console.log(error));

// Define routes
// Add your routes here

app.use('/auth', authRouter);

// Start the server
const port = 5000;
app.listen(port, () => console.log(`Server is running on port ${port}`));