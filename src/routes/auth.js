const express = require('express');

const authRouter = express.Router();

const bcrypt = require("bcrypt");
const User = require('../models/user');
const { model } = require('mongoose');


authRouter.post("/signup", async (req,res) => {
    try {
        const { Name, emailID, password } = req.body;
        
        if(!Name) {
            throw new Error("Name is required!");
        }
        if(!emailID) {
            throw new Error("Email is required!");
        }
        if(!password) {
            throw new Error("Email is required!");
        }

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

module.exports = authRouter;