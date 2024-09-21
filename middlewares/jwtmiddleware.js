const jwt = require('jsonwebtoken');
const env = require('../config/enviroment');
const { verifyToken } = require('@clerk/backend');

const authMiddleware = async(req, res, next) => {
    console.log('Authorization Header:', req.header('Authorization'));

    const token = req.header('Authorization')?.replace('Bearer ', '');
    console.log('Extracted Token:', token);

    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    try {
        const verifiedToken = await verifyToken(token, {
            jwtKey: process.env.CLERK_JWT_KEY,
            authorizedParties: ['http://localhost:5173', 'api.example.com'], // Replace with your authorized parties
          })

        req.user = verifiedToken.sub; // Attach the decoded user data to the request object
        next();
    } catch (ex) {
        console.error('Token verification failed:', ex);
        res.status(400).json({ message: 'Invalid token.' });
    }
};

module.exports={authMiddleware}
