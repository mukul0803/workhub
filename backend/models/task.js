//Modules
const mongoose = require("mongoose"); // Require Mongoose

const taskSchema = mongoose.Schema({
  fullname: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  taskName: {
    type: String,
    required: true
  },
  taskStartDate: {
    type: Date,
    default: Date.now()
  },
  taskEndDate: {
    type: Date,
    min: Date.now(),
  },
  deadline: {
    type: Date,
    required: true,
    min: Date.now()
  },
  status: {
    type: String,
    default: "Pending"
  },
  taskDetail: {
    type: String,
    required: true
  },
  comments: {
    type: [
      {
        _id: false,
        date: Date,
        name: String,
        comment: String
      }
    ],
    minlength: 10,
    maxlength: 200
  },
  image: {
    type: String
  }
});

module.exports = mongoose.model("task", taskSchema);
