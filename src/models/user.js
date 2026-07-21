const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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

userSchema.methods.getJWT = async function () {
    const user  = this;

    const token = await jwt.sign({ _id: user._id }, "Dev@Tinder$989", {
        expiresIn: "7d",
    });

    return token;

};

userSchema.methods.validatePassword = async function (passwordInputByUser) {
    const user = this;
    const passwordHash = user.password;

    const isPasswordValid = await bcrypt.compare(passwordInputByUser, passwordHash);
    return isPasswordValid;
}

module.exports = mongoose.model("User", userSchema);