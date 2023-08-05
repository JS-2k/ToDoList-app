const TaskModel = require('../models/TaskModel');
const mongoose = require('mongoose');

// To create a task = POST API
const createTask = async (req,res)=>{
    const {title,description} = req.body

    try {
        const Task = await TaskModel.create({title,description})
        res.status(200).json(Task)
    }catch(e){
        res.status(400).json({error: e.message});
    }
};

// To get all Taks - GET API
const getTasks = async (req, res) => {
    try{
        const Tasks = await TaskModel.find({});
        res.status(200).json(Tasks)
    }catch(e){
        res.status(400).json({message: e.message});
    }
};

// To get single Task - GET API
const getSingleTask = async (req, res) => {
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({message:'Task not found'})
    }
    try{
        const singleTask = await TaskModel.findById(id)
        res.status(200).json(singleTask)
    }catch(e){
        res.status(404).json({message:e.message});
    }
};

// To update a Task - UPDATE API
const updateTask = async (req,res) => {
    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({message:'Task not found'})
    }
    try{
        const task = await TaskModel.findByIdAndUpdate({
            _id: id
        },{
            ...req.body
        })
        res.status(200).json(task);
    }catch(e){
        res.status(400).json({error: e.message});
    }
};

// To Delete a task - DELETE API

const deleteTask = async (req, res) => {
    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({message:'Task not found!'});
    }
    try {
        const task = await TaskModel.findByIdAndDelete(id)
            res.status(200).json(task);
    } catch(e) {
        res.status(400).json({message: e.message});
    }
};

module.exports = { createTask , getTasks, getSingleTask,  updateTask, deleteTask};