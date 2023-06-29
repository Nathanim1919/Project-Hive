const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const {
            authorization
        } = req.headers;
        console.log('Authorization Header:', authorization);

        if (!authorization) {
            throw new Error('Authorization header missing');
        }

        const token = authorization.replace('Bearer ', '');
        console.log('Token:', token);

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log('Decoded:', decoded);

        req.userData = decoded;
        next();
    } catch (error) {
        console.error('Authentication Error:', error);
        return res.status(401).json({
            error: 'Unauthorized',
            message: 'Authentication failed',
        });
    }
};