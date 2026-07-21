const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const userSchema = mongoose.Schema({
    Name: {
        type: String,
        required: true,
        minLength: 2,
        maxLength: 50,
    },
    emailID: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model("User", userSchema);