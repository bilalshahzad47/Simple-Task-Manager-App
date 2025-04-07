const express = require("express");
const router = express.Router();
const { addTaskValidator} = require("../../Validators/taskValidator/index");
const { addTask, getAllTasks, updateTask, deleteTask} = require("../../Controllers/Task/index");
const { adminRoute, userRoute, authenticatedRoute } = require("../../Middlewares/index");
// const { uploadFile } = require("../../Middlewares/upload")

router.post('/addTask', adminRoute, addTaskValidator,  addTask)    // http://localhost:3020/api/task/addTask
router.get('/getAllTasks', authenticatedRoute, getAllTasks )       // http://localhost:3020/api/task/getAllTasks
router.put('/updateTask/:id' , adminRoute, updateTask )
router.delete('/deleteTask/:id' , adminRoute ,deleteTask )

module.exports = router