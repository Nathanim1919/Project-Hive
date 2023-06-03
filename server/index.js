const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRouter = require('./routes/authRoutes.js')
const profileRouter = require('./routes/profileRoutes.js');
const projectRouter = require('./routes/projectRoutes.js');

const app = express();


// Middleware to parse JSON data with increased payload size limit
app.use(express.json({
    limit: '50mb'
}));


app.use(bodyParser.json({
    limit: '50mb'
}));

app.use(bodyParser.urlencoded({
    extended: true,
    limit: '50mb',
    parameterLimit: 50000
}));

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
app.use('/user', profileRouter);
// app.use('/users', profileRouter);
app.use('/user/:id', projectRouter);



// Start the server
const port = 5000;
app.listen(port, () => console.log(`Server is running on port ${port}`));