const dotenv = require('dotenv');
dotenv.config();

const secretKey = process.env.SECRET_KEY;


const jwt = require('jsonwebtoken'); 

const requireJWT = (req, res, next) => {
    const token = req.cookies.token;
    // console.log(token);

    if (!token) {
        return res.status(401).json({ error: 'Authentication required' });
    }

    try {
        const decoded = jwt.verify(token, secretKey);
        req.user = decoded; 
        next();
    } catch (err) {
        res.status(401).json({ error: 'Invalid token' });
    }
};

module.exports = requireJWT;
