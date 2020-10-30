const express = require('express');
const router = express.Router();

const {createTask, getTaskById, getTask, getAllTasks, updateTask, removeTask, addNote, addSubtask} = require('../controllers/task');

//defining url/:id id as taskId
router.param('taskId', getTaskById);

//to create task
router.post("/task/create",createTask);

//to check a task 
router.get('/task/:taskId', getTask);

//to get all tasks
router.get('/tasks', getAllTasks);

//update task
router.put('/task/update/:taskId', updateTask);

//delete task
router.delete('/task/delete/:taskId', removeTask)

//Add notes to the task
router.put('/task/add/note/:taskId', addNote);

//Add subtasks to the task
router.put('/task/add/subtask/:taskId', addSubtask);

module.exports = router;