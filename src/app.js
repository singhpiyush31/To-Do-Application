const express = require('express');

const connectDB = require('./config/database');

const app = express();

app.use(express.json());

const authRouter = require('./routes/auth');

app.use("/", authRouter);

connectDB().then(() => {
    console.log("Database connected successfully!");
    app.listen(7777 , () => {
        console.log("Server is listening successfully on port 7777");
    });
}).catch((err) => {
    console.error("Database not connected!");
});