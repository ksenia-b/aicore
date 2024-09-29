const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    console.log("middleware")
    const token = req.header("Authorization");
    if (!token) return res.status(401).json({
        msg: 'No token, auth denied'
    });
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        res.status(401).json({
            msg: 'Token is not valid'
        })
    }
}

module.exports = auth;