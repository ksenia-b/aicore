const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('../models/User');
const { OAuth2Client } = require('google-auth-library');
const dotenv = require('dotenv');

dotenv.config();
const router = express.Router();
// const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

router.post('/login', async (req, res) => {
    console.log("here 1", req.body);
    const { email, password } = req.body;
    try {
        const user = await UserActivation.findOne({ email });
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

router.get('/login', async (req, res) => {
    console.log("get here!!! ==============>");
}
)

module.exports = router;