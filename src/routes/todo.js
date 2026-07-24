const express = require('express');

const userAuth = require('../middlewares/auth');
const Todo = require('../models/todo');

const todoRouter = express.Router();


todoRouter.post("/create", userAuth, async (req,res) => {
    try {
        const { title, description, priority, status, dueDate } = req.body;
        if(!title) {
            return res.status(400).json({ message: "Title is required" });
        }
        const todo = new Todo({
            title, description, priority, status, dueDate, user: req.user._id
        });
        await todo.save();
        return res.status(201).json({ message: "Todo created successfully!", todo: todo })
    } catch (err) {
        res.status(500).json({ error: err.message, message: "Internal Server Error" });
    }
});

todoRouter.get("/:userList", async (req,res) => {
    try {
        const todoList = await Todo.find({ user: req.params.userList });
        res.json({ message: "Your To-Do List", todoList });
        await todoList.save();
    } catch (err) {
        res.status(500).json({ error: err.message, message: "Internal Server Error" });
    }
});

module.exports = todoRouter;