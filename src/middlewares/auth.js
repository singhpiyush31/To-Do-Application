const jwt = require('jsonwebtoken');

const User = require('../models/user');

const userAuth = async (req,res,next) => {
    try {
        
        const { token } = req.cookies;

        const obj = await jwt.verify(token, "To-Do@989");

        const { _id } = obj;

        const user = await User.findById(_id).select("name email _id");

        if (!user) {
            return res.status(404).json({ message: "User not found!" });
        }
        req.user = user;
        next();
    }
    catch (err) {
        res.status(500).json({ error: err.message, message: "Internal Server Error" });
    }
}

module.exports = userAuth;