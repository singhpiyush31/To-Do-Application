const express = require('express');
const bcrypt = require("bcrypt");

const authRouter = express.Router();

const User = require('../models/user');



authRouter.post("/signup", async (req,res) => {
    try {


        const { Name, emailID, password } = req.body;
        const passwordHash = await bcrypt.hash(password, 10);

        const user = new User({
            Name, emailID, password: passwordHash,
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
        const { emailID, password } = req.body;
        const user = await User.findOne({ emailID: emailID });

        if(!user) {
            throw new Error("Invalid Credentials");
        }

        const isPasswordValid = await user.validatePassword(password);

        if(isPasswordValid) {
            const token = await user.getJWT();
            res.cookie("token", token, {
                
            });
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