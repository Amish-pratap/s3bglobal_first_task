const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
const cookie = require('cookie');
dotenv.config();


const secretKey = process.env.SECRET_KEY;



exports.signup = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const existingUser = await User.findOne({ $or: [{ username }, { email }] });

        if (existingUser) {
            if (existingUser.username === username) {
                return res.status(400).json({ error: 'Username already exists' });
            }
            if (existingUser.email === email) {
                return res.status(400).json({ error: 'Email already exists' });
            }
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
        });

        await newUser.save();

        const token = jwt.sign({ userId: newUser._id }, secretKey, {
            expiresIn: 86400,
        });
        res.setHeader('Set-Cookie', cookie.serialize('token', token, {
            maxAge: 86400,
        }));
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
}

exports.signin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }

        const token = jwt.sign({ userId: user._id }, secretKey, {
            expiresIn: 86400,
        });

        res.setHeader('Set-Cookie', cookie.serialize('token', token, {
            maxAge: 86400, 
        }));

        res.status(200).json({ message: 'User signed in successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};

exports.getUserInfo = async (req, res) => {
    try {
        const userId = req.user.userId;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        const userInfo = {
            username: user.username,
            role: user.role,
        };

        res.status(200).json(userInfo);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};

exports.signout = (req, res) => {
    res.setHeader('Set-Cookie', cookie.serialize('token', '', {
        maxAge: 0,
    }));
    res.status(200).json({ message: 'User signed out successfully' });
};