const express = require('express');

const userAuth = require('../middlewares/auth');
const user = require('../models/user');

const userRouter = express.Router();

userRouter.get("/profile", userAuth, (req,res) => {
    
    try {
        res.status(200).json({ user: req.user, message: "Profile fetched successfully!" });
    } catch (err) {
        res.status(400).send("ERROR: " + err.message);
    }
    
})

module.exports = userRouter;