const express = require('express');

const authRouter = require('./routes/auth');
const connectDB = require('./config/database');

const app = express();

app.use(express.json());

app.use("/auth", authRouter);

connectDB().then(() => {
    console.log("Database connected successfully!");
    app.listen(7777 , () => {
        console.log("Server is listening successfully on port 7777");
    });
}).catch((err) => {
    console.error("Database not connected!");
});