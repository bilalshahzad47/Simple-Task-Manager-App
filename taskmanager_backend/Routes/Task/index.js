const express = require("express");
const router = express.Router();
const { addTaskValidator} = require("../../Validators/taskValidator/index");
const { addTask, getAllTasks, updateTask, deleteTask, getTaskById, updateTaskStatus} = require("../../Controllers/Task/index");
const { userRoute} = require("../../Middlewares/index");

router.post('/addTask', userRoute, addTaskValidator,  addTask)    // http://localhost:3020/api/task/addTask
router.get('/getAllTasks', userRoute, getAllTasks )       // http://localhost:3020/api/task/getAllTasks
router.put('/updateTask/:id' , userRoute, updateTask )
router.delete('/deleteTask/:id' , userRoute ,deleteTask )
router.get('/getTask/:id', userRoute , getTaskById )    // http://localhost:3020/api/task/getTaskById/:id
router.put('/updateTaskStatus/:id', userRoute , updateTaskStatus )    // http://localhost:3020/api/task/updateTaskStatus/:id
module.exports = router