//Modules
const bcrypt = require("bcryptjs"); //Require Bcryptjs
const { validationResult } = require("express-validator"); // Require Express Validator
const jwt = require("jsonwebtoken"); //Require Json Web Token

//Import User Model
const users = require("../models/users");

exports.login = (req, res) => {
  //Check Validations
  const Errors = validationResult(req);
  if (!Errors.isEmpty()) {
    res.send(Errors.array());
  } else {
    //Check is email or username
    checkIsEmail = req.body.email.search(/\@/g);
    checkIsEmailByDot = req.body.email.search(/\./g);

    //If is Username
    if (checkIsEmail === -1 && checkIsEmailByDot === -1) {
      users.findOne(
        { username: req.body.email },
        { username: 1, password: 1, fullname: 1, email: 1, isAdmin: 1, _id: 0 },
        (err, data) => {
          if (err) {
            //If error
            res.send(err);
          } else if (!data) {
            //If Data is null
            res.json({
              Status: 406,
              Message: "Invalid Username"
            });
          } else {
            //Check Password
            const CheckPassword = bcrypt.compareSync(
              req.body.password,
              data.password
            );
            //If Password is Correct
            if (CheckPassword === true) {
              //Generate Token
              const token = jwt.sign(
                {
                  name: data.fullname,
                  username: data.username,
                  email: data.email,
                  isAdmin: data.isAdmin
                },
                process.env.JWT_KEY
              );

              res.json({
                Status: 202,
                Message: "You are login Successfully",
                token: token
              });
            } else {
              //If Password is Incorrect
              res.json({
                Status: 406,
                Message: "Password is Incorrect"
              });
            }
          }
        }
      );
    } else {
      //If is Email
      users.findOne(
        { email: req.body.email },
        { email: 1, password: 1, fullname: 1, username: 1, isAdmin: 1, _id: 0 },
        (err, data) => {
          if (err) {
            //If error
            res.send(err);
          } else if (!data) {
            res.json({
              //If data is null
              Status: 406,
              Message: "Email is not registered"
            });
          } else {
            //Check Password
            const checkPassword = bcrypt.compareSync(
              req.body.password,
              data.password
            );
            //If password Correct
            if (checkPassword === true) {
              //Generate Token
              const token = jwt.sign(
                {
                  name: data.fullname,
                  username: data.username,
                  email: data.email,
                  isAdmin: data.isAdmin
                },
                process.env.JWT_KEY
              );

              var decode = jwt.decode(token, { complete: true });
              res.json({
                token: token,
                payload: decode.payload
              });
            } else {
              //If password is incorrect
              res.json({
                Status: 406,
                Message: "Password is Incorrect"
              });
            }
          }
        }
      );
    }
  }
};
