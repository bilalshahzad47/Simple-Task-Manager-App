// const mongoose = require("mongoose");
const { ApiResponse } = require("../../Helpers/index");
const User = require("../../Models/User/User");
const Task = require("../../Models/Task/Task");
const moment = require("moment");

// Add Task Controller
exports.addTask = async (req, res) => {
    const {
      title,
      description,
      date,
      status,
    } = req.body;
    try {
      if (moment(date).isSameOrBefore(moment(), "day")) {
        return res
          .status(400)
          .json(ApiResponse({}, "Task date must be in the future", false));
      }
      const user = await User.findById(req.user._id);
      const task = new Task({
        title,
        description,
        date,
        status,
        user: req.user._id,
      });
      await task.save();
      const notificationTitle = "Task Added By User";
      const content = "A new task has been added By User";
      sendNotificationToFollowers(
        notificationTitle,
        content,
        user,
        task._id
      );
      res
        .status(200)
        .json(ApiResponse(task, "Task Created Successfully", true));
    } catch (error) {
      console.log(error);
      res.status(500).json(ApiResponse({}, error.message, false));
    }
  };

  // Get All Tasks Controller
  exports.getAllTasks = async (req, res) => {
    const page = req.query.page || 1;
    const limit = req.query.limit || 10;
    const {
      keyword,
      from,
      to,
      status
    } = req.query;
    let finalAggregate = [];
    finalAggregate.push({
      $sort: {
        createdAt: -1,
      },
    });
    
    if (status) {
        finalAggregate.push({
          $match: {
            status: status,
          },
        });
    }
    // if from and to are provided then filter events between the dates
    if (from && to) {
      const utcFrom = moment.utc(from, "YYYY-MM-DD").startOf("day").toDate();
      const utcTo = moment.utc(to, "YYYY-MM-DD").endOf("day").toDate();
      finalAggregate.push({
        $match: {
          date: {
            $gte: utcFrom,
            $lte: utcTo,
          },
        },
      });
    }
    
    if (keyword) {
      const regex = new RegExp(keyword.toLowerCase(), "i");
      finalAggregate.push({
        $match: {
          title: { $regex: regex },
        },
      });
    }
    const myAggregate =
      finalAggregate.length > 0
        ? Task.aggregate(finalAggregate)
        : Task.aggregate([]);
    Task.aggregatePaginate(myAggregate, { page, limit })
      .then((tasks) => {
        res
          .status(200)
          .json(ApiResponse(tasks, `${tasks.docs.length} Tasks found`, true));
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(ApiResponse({}, err.message, false));
      });
  };

  // Update Task Controller
  exports.updateTask = async (req, res) => {
    let task = await Task.findById(req.params.id);
    try {
    //   const task = await Task.findOne({ _id: req.params.id, user: req.user._id });
      
      if (!task) {
        return res.status(404).json(ApiResponse({}, "Task Not Found", false));
      }
      
      let updated = { };
     
      updated.title = req.body.title ? req.body.title : task.title
      updated.description = req.body.description ? req.body.description : task.description
      updated.date = req.body.date ? req.body.date : task.date
      updated.status = req.body.status ? req.body.status : task.status
      task = await Task.findByIdAndUpdate(
        req.params.id,
        { $set: updated },
        { new: true }
      );
      res
        .status(200)
        .json(ApiResponse(task, "Task Updated Successfully", true));
    } catch (error) {
      console.log(error);
      res.status(500).json(ApiResponse({}, error.message, false));
    }
  };

  // Delete Task Controller
  exports.deleteTask = async (req, res) => {
    let task = await Task.findById(req.params.id);
    try {
      if (!task) {
        return res.status(404).json(ApiResponse({}, "Task Not Found", false));
      }
    
      task = await Task.findByIdAndDelete(req.params.id);
      res
        .status(200)
        .json(ApiResponse(task, "Task Deleted Successfully", true));
    } catch (error) {
      console.log(error);
      res.status(500).json(ApiResponse({}, error.message, false));
    }
  };


  // Update task status (To Do, In Progress, Done)
exports.updateTaskStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const validStatuses = ["TODO", "INPROGRESS", "DONE"];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const task = await Task.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    task.status = status;
    await task.save();

    res.status(200).json({ message: "Task status updated", task });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
