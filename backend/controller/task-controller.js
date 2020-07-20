//Modules
const { validationResult } = require("express-validator"); //Require Express Validator

//Import Task Model
const TaskModel = require("../models/task");

exports.task = (req, res) => {
  //Check Validations
  const Errors = validationResult(req);

  if (!Errors.isEmpty()) {
    //If Error in validations
    res.send(Errors.array());
  } else {
    //If All is Good
    //Create New TaskModel
    const task = new TaskModel({
      fullname: req.body.fullname,
      username: req.body.username,
      taskName: req.body.taskName,
      taskStartDate: req.body.taskStartDate,
      taskEndDate: req.body.taskEndDate,
      deadline: req.body.deadline,
      status: req.body.status,
      taskDetail: req.body.taskDetail,
      comments: req.body.comments
    });

    //Insert Data in Task Collection
    task.save((err, data) => {
      if (err) {
        res.send(err);
      } else {
        res.send(data);
      }
    });
  }
};
