const express = require('express');
const cookieParser = require("cookie-parser");

const authRouter = require('./routes/auth');
const userRouter = require('./routes/user');
const connectDB = require('./config/database');

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/auth", authRouter);
app.use("/user", userRouter);

connectDB().then(() => {
    console.log("Database connected successfully!");
    app.listen(7777 , () => {
        console.log("Server is listening successfully on port 7777");
    });
}).catch((err) => {
    console.error("Database not connected!");
});