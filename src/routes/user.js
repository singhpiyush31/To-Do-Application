const express = require('express');

const userAuth = require('../middlewares/auth');
const User = require('../models/user');

const userRouter = express.Router();

userRouter.get("/profile", userAuth, (req,res) => {
    
    try {
        res.status(200).json({ user: req.user, message: "Profile fetched successfully!" });
    } catch (err) {
        res.status(400).send("ERROR: " + err.message);
    }
    
})

userRouter.patch("/update" , userAuth, async (req,res) => {
    try {
        const { name } = req.body;
        const { _id } = req.user;

        const updatedUser = await User.findByIdAndUpdate(_id,
            { name: name },
            { returnDocument: 'after' }
        ).select("-password -__v")

        res.status(200).json({ user: updatedUser, message: "User updated successfully!" })
    } catch (err) {
        res.status(500).json({ error: err.message, message: "Internal Server Error" });
    }
})

module.exports = userRouter;