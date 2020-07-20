//Modules
// const mongoose = require("mongoose"); //Require Mongoose

//Import Task Model
const taskModel = require("../models/task");
// const userModel = require("../models/users");


//Admin
module.exports.allTasks = (req, res) => {

  taskModel.find((err, data) => {
    if (err) {
      res.send(err);
    } else {
      res.send(data);
    }
  });
};


module.exports.tasksPending = (req, res) => {

  taskModel.find({ status: "Pending" }, (err, data) => {
    if (err) {
      res.send(err);
    } else {
      res.send(data);
    }
  });
};

module.exports.tasksCompleted = (req, res) => {

  taskModel.find({ status: "Completed" }, (err, data) => {
    if (err) {
      res.send(err);
    } else {
      res.send(data);
    }
  });
};


//Users

module.exports.userTasks = (req, res) => {

  usernamee = req.params.username;

  taskModel.find({ username: usernamee }, (err, data) => {
    if (err) {
      res.send(err);
    } else {
      res.send(data);
    }
  });
};

module.exports.userTasksPending = (req, res) => {

  usernamee = req.params.username;

  taskModel.find({ username: usernamee, status: "Pending" }, (err, data) => {
    if (err) {
      res.send(err);
    } else {
      res.send(data);
    }
  });
};

module.exports.userTasksCompleted = (req, res) => {

  usernamee = req.params.username;

  taskModel.find({ username: usernamee, status: "Completed" }, (err, data) => {
    if (err) {
      res.send(err);
    } else {
      res.send(data);
    }
  });
};

module.exports.taskDetail = (req, res) => {

  taskModel.findOne({ _id: req.params.id }, (err, data) => {
    if (err) {
      res.send(err);
    } else {
      res.send(data);
    }
  });
};

module.exports.userTaskUpdate = (req, res) => {

  taskModel.updateOne({ _id: req.params.id }, { status: req.body.status }, (err, data) => {
    if (err) {
      res.send(err);
    } else {
      res.send(data);
    }
  });
};

module.exports.adminTaskUpdate = (req, res) => {

  taskModel.updateOne({ _id: req.params.id }, { deadline: req.body.deadline, status: req.body.status, taskDetail: req.body.detail }, (err, data) => {
    if (err) {
      res.send(err);
    } else {
      res.send(data);
    }
  });
};


module.exports.userChatUpdate = (req, res) => {
  taskModel.find({ _id: req.params.id }, (err, data) => {
    if (err) {
      res.send(err);
    } else {
      taskModel.updateOne(
        { _id: req.params.id },
        {
          $push: {
            comments: { date: Date(), name: req.params.fullname, comment: req.body.comment }
          }
        },
        (err, data) => {
          if (err) {
            res.send(err);
          } else {
            res.send(data);
          }
        }
      );
    }
  });
};

module.exports.getChat = (req, res) => {

  taskModel.findOne({ _id: req.params.id }, { comments: 1, _id: 0 }, (err, data) => {
    if (err) {
      res.send(err);
    } else {
      res.send(data.comments);
    }
  });
};

// taskModel.aggregate(
//   [
//     {
//       $match: { fullname: "Aniket" }
//     }
//   ],
//   (err, data) => {
//     if (err) {
//       res.send(err);
//     } else {
//       res.send(data);
//     }
//   }
// );

// taskModel.aggregate(
//   [
//     {
//       $lookup: {
//         from: userModel,
//         localField: "Mukul",
//         foreignField: "Mukul",
//         as: "user_docs"
//       }
//     }
//   ],
//   (err, data) => {
//     if (err) {
//       res.send(err);
//     } else {
//       res.json(data);
//     }
//   }
// );
