//Module
const router = require("express").Router(); //Require Express Router
const { check } = require("express-validator"); //Require Express Validator


//Controllers
const userController = require("../controller/user-controller"); // Users/Signup Controller
const loginController = require("../controller/login"); //Login Controller
const taskController = require("../controller/task-controller"); //Task Controller
const userTaskController = require("../controller/usertasks"); //User Task Controller
const contactUsController = require("../controller/contactUs"); //Contact Us Controller
const forgetPassword = require("../controller/forgetPassword"); //Forget Password Controller
const user = require("../controller/user"); //User CRUD

//Import Auth
const auth = require('../authorization/verifyToken');


//Create Account / Users/Signup Controller
router.post(
  "/createaccount",
  [
    check("fullname")
      .not()
      .isEmpty()
      .withMessage("Please Fill The Box")
      .trim()
      .escape()
      .not()
      .isNumeric()
      .withMessage("Please Enter Only Alphabets")
      .isLength({ min: 3 })
      .withMessage("Min Char 3")
      .isLength({ max: 25 })
      .withMessage("Max Char 25"),
    check("username")
      .not()
      .isEmpty()
      .withMessage("Please Fill The Box")
      .trim()
      .escape()
      .isLength({ min: 5 })
      .withMessage("Min Char 5")
      .isLength({ max: 25 })
      .withMessage("Max Char 25"),
    check("email")
      .not()
      .isEmpty()
      .withMessage("Please Fill The Box")
      .isEmail()
      .withMessage("Invalid Email")
      .normalizeEmail()
      .trim(),
    check("password")
      .not()
      .isEmpty()
      .withMessage("Please Fill The Box")
      .trim()
      .isLength({ min: 6 })
      .withMessage("Min Char 6")
      .isLength({ max: 25 })
      .withMessage("Max Char 25")
  ],
  userController.users
);

//Login
router.post(
  "/login",
  [
    check("email")
      .not()
      .isEmpty()
      .withMessage("Please Fill the Box")
      .trim(),
    check("password")
      .not()
      .isEmpty()
      .withMessage("Please Fill the Box")
      .trim()
  ],
  loginController.login
);

//Create Task
router.post(
  "/createtask",
  [
    check("fullname")
      .not()
      .isEmpty()
      .withMessage("Please Fill the Box")
      .trim(),
    check("username")
      .not()
      .isEmpty()
      .withMessage("Please Fill  the Box")
      .trim(),
    check("taskName")
      .not()
      .isEmpty()
      .withMessage("Please Fill the Box")
      .isLength({ min: 5, max: 25 })
      .withMessage("Min Length 5 and Max Length 25")
      .trim(),
    check("deadline")
      .not()
      .isEmpty()
      .withMessage("Please Fill  the Box")
      .trim(),
    check("taskDetail")
      .not()
      .isEmpty()
      .withMessage("Please Fill  the Box")
      .trim()
  ],
  taskController.task
);

//Contact Us
router.post(
  "/contact",
  [
    check("name")
      .not()
      .isEmpty()
      .withMessage("Please Fill the Box")
      .trim()
      .not()
      .isNumeric()
      .isLength({ min: 3, max: 25 })
      .withMessage("Min Length is 3 and Max Length is 25"),
    check("email")
      .not()
      .isEmpty()
      .withMessage("Please Fill the Box")
      .isEmail()
      .withMessage("Email is Invalid")
      .normalizeEmail()
      .trim(),
    check("subject")
      .not()
      .isEmpty()
      .withMessage("Please Fill the Box")
      .trim()
      .isLength({ min: 5, max: 30 })
      .withMessage("Min Length is 5 and Max Length is 30"),
    check("message")
      .not()
      .isEmpty()
      .withMessage("Please Fill the Box")
      .trim()
      .isLength({ min: 5, max: 200 })
      .withMessage("Min Length 5 and Max Length 200")
  ],
  contactUsController.contact
);

//Forget Password
router.post(
  "/forgetPassword",
  [
    check("email")
      .not()
      .isEmpty()
      .withMessage("Please Fill the Box")
      .isEmail()
      .withMessage("Invalid Email")
      .normalizeEmail()
      .trim()
  ],
  forgetPassword.forget
);

//JWT Token Authorization
router.get("/authorization", auth);

//All Tasks Admin
router.get("/alltasks", userTaskController.allTasks);

//All Tasks Admin
router.get("/taskspending", userTaskController.tasksPending);

//All Tasks Admin
router.get("/taskscompleted", userTaskController.tasksCompleted);

//Task Detail
router.get("/taskdetail/:id", userTaskController.taskDetail);

//User Task
router.get("/usertasks/:username", userTaskController.userTasks);

//User Task Pending
router.get("/usertaskspending/:username", userTaskController.userTasksPending, auth);

//User Task Pending
router.get("/usertaskscompleted/:username", userTaskController.userTasksCompleted, auth);

//User Task Update
router.put("/usertaskUpdate/:id", userTaskController.userTaskUpdate);

//Admin Task Update
router.put("/admintaskupdate/:id", userTaskController.adminTaskUpdate);

//User Get Admin
router.get("/userdetails/:username", user.getloginUser);

//User Get Update
router.put("/userdetailsupdate/:username",
  [
    check("fullname")
      .not()
      .isEmpty()
      .withMessage("Please Fill The Box")
      .trim()
      .escape()
      .not()
      .isNumeric()
      .withMessage("Please Enter Only Alphabets")
      .isLength({ min: 3 })
      .withMessage("Min Char 3")
      .isLength({ max: 25 })
      .withMessage("Max Char 25")
  ], user.getUserUpdate);

//Get All Users
router.get("/allusersdetails", user.getUser);

//Change Password
router.put("/changepassword/:email",
  [
    check("newPassword")
      .not()
      .isEmpty()
      .withMessage("Please Fill The Box")
      .trim()
      .isLength({ min: 6 })
      .withMessage("Min Char 6")
      .isLength({ max: 25 })
      .withMessage("Max Char 25")
  ], user.changePassword);

// Chat Update
router.put("/chat/:id/:fullname", userTaskController.userChatUpdate);

// Get Chat 
router.get("/getchat/:id", userTaskController.getChat);

//Export Router
module.exports = router;
