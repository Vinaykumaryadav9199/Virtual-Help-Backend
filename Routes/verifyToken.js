const jwt = require('jsonwebtoken');
const express = require("express")
const JWT_SECRET = 'vinay';
const cookieParser = require("cookie-parser")
const router = express.Router()
router.use(cookieParser())


function verifyToken(req, res, next) {
    // Get the token from the request headers, cookies, or wherever it is stored
    const token =  req.cookies.token;

    // Check if token is missing
    if (!token) {
        return res.status(402).json({ error: 'Unauthorized - Token missing' });
    }

    // Verify the token
    jwt.verify(token,JWT_SECRET , (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: 'Unauthorized - Invalid token' });
        }

        // If verification is successful, attach the decoded payload to the request object
        req.User = decoded.user.key;
        next();
    });
}

module.exports = verifyToken;
