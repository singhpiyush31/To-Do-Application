const express = require('express');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

const User = require('../models/user');

const authRouter = express.Router();

authRouter.post("/signup", async (req,res) => {
    try {
        const { name, email, password } = req.body;
        const passwordHash = await bcrypt.hash(password, 10);

        const user = new User({
            name, email, password: passwordHash,
        });
        await user.save();
        res.send("User Added Successfully!");
    }
    catch (err) {
        res.status(400).send("ERROR: " + err.message);
    }
});

authRouter.post("/login", async (req,res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email: email });
        console.log(user);
        
        if(!user) {
            throw new Error("Invalid Credentials");
        }
    
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if(isPasswordValid) {
            const token = await jwt.sign({ _id: user._id }, "To-Do@989", { expiresIn: "7d" });
            res.cookie("token", token, { expires: new Date(Date.now()) + 24*60*60*1000*7 });
            res.send("Login Successfull!");
        }
        else {
            throw new Error("Invalid Credentials");
        }

    }
    catch (err) {
        res.status(400).send("ERROR: " + err.message);
    }
});


authRouter.post("/logout", async (req,res) => {
        res.cookie("token", null, {
            expires: new Date(Date.now()),
        });
        res.send("Logout Successful!");
    
})


module.exports = authRouter;