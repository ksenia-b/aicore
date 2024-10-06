const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');
const dotenv = require('dotenv');
const UserActivation = require('../models/UserActivation');
const User = require('../models/User')

dotenv.config();
const router = express.Router();

router.post('/', async (req, res) => {
    const { idToken } = req.body;
    console.log("idToken = ",)

    try {
        const ticket = await client.verifyIdToken({
            idToken,
            audience: process.env.GOOGLE_CLIENT_ID,
        });

        const payload = ticket.getPayload();
        const { email, sub: googleId } = payload;

        let user = await User.findOne({ email });
        console.log("user find = ", user)
        if (!user) {
            user = new User({
                name: email.split('@')[0],
                email,
                googleId,
            });
            await user.save();
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });

        res.json({
            user: {
                "email": email
            },
            token: token
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Internal server error' });
    }
});


router.post('/login', async (req, res) => {
    console.log("here 1", req.body);
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        console.log("user = ", user);

        if (!user) return res.status(400).json({ msg: "user not found" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: "Invalid password" });

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
            expiresIn: '1h'
        });
        res.json({ token });
    }
    catch (err) {
        res.status(500).json({ err: err.message })
    }
})


router.post('/register', async (req, res) => {
    const { username, email, password, confirmPassword } = req.body;

    if (!username || !email || !password || !confirmPassword) {
        return res.status(400).json({ msg: "Please fill in all fields" });
    }

    if (password !== confirmPassword) {
        return res.status(400).json({ msg: "Passwords do not match" });
    }

    if (password.length < 6) {
        return res.status(400).json({ msg: "Password must be at least 6 characters" });
    }

    try {
        const existingUser = await UserActivation.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ msg: "User already exists with this email" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new UserActivation({
            username,
            email,
            password: hashedPassword
        });

        await newUser.save();

        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({ token, msg: "User registered successfully" });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: "Server error" });
    }
});

module.exports = router;