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

todoRouter.get("/", userAuth, async (req,res) => {
    try {
        const todoList = await Todo.findOne({ user: req.user });
        res.json({ message: "Your To-Do List", todoList });
    } catch (err) {
        res.status(500).json({ error: err.message, message: "Internal Server Error" });
    }
});

todoRouter.get("/get/:Id", async (req,res) => {
    try {
        const todoId = await Todo.findById(req.params.Id);
        res.status(200).json({ message: "Your To-Do", todoId });
    } catch (err) {
        res.status(500).json({ error: err.message, message: "Internal Server Error" });
    }
});

todoRouter.patch("/edit/:Id", async (req,res) => {
    try {
        const todoEdit = await Todo.findByIdAndUpdate(req.params.Id, req.body);
        await todoEdit.save();
        res.status(200).json({message: "Updated To-Do List", todoEdit });
    } catch (err) {
        res.status(500).json({ error: err.message, message: "Internal Server Error" });
    }
});

todoRouter.delete("/delete/:Id", async (req,res) => {
    try {
        const todoDeleteId = await Todo.findByIdAndDelete(req.params.Id);
        res.status(200).json({ message: "Your To-Do List Deleted Successfully!" });
    } catch (err) {
        res.status(500).json({ error: err.message, message: "Internal Server Error" });
    }
});

module.exports = todoRouter;