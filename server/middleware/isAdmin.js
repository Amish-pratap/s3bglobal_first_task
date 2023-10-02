const User = require('../models/userModel');

const checkAdmin = async (req, res, next) => {
    const userId = req.user.userId;
    try {
        const user = await User.findById(userId);

        if (!user || user.role !== 'admin') {
            return res.status(403).json({ error: 'Access denied, admin permission required' });
        }

        req.user.isAdmin = true;

        next();
    } catch (error) {
        console.error('Error querying the user:', error.message);
        res.status(500).json({ error: 'Server error' });
    }
};

module.exports = checkAdmin;
