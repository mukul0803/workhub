//Modules
const bcrypt = require("bcryptjs"); //Require Bcryptjs
const { validationResult } = require("express-validator"); //Require Express Validator

//Require Users model
const userModel = require("../models/users");

exports.users = (req, res) => {
  //Check Validations
  const Errors = validationResult(req);
  if (!Errors.isEmpty()) {
    res.send(Errors.array());
  } else {
    //Firstname Validation
    const user_fullname =
      req.body.fullname.charAt(0).toUpperCase() + req.body.fullname.slice(1);


    //Username Validation (Check @ and . in username)
    const check_username = req.body.username.search(/\@/g);
    const check_usernameByDot = req.body.username.search(/\./g);

    //If username is valid
    if (check_username === -1 && check_usernameByDot === -1) {
      //Remove space in username
      const user_username = req.body.username.toLowerCase().replace(/\s/g, "");

      //Password Confirmation
      if (req.body.password === req.body.confirmPassword) {
        //Hash password
        hashedPassword = bcrypt.hashSync(req.body.password, 10);

        //Create Model
        const user = new userModel({
          fullname: user_fullname,
          username: user_username,
          email: req.body.email,
          password: hashedPassword,
        });

        //Insert Data in database
        user.save((err, data) => {
          if (err) {
            //If Error
            res.send(err);
          } else {
            //If Data Insert Sucessfully
            res.send(data);
          }
        });
      } else {
        res.json({
          //If Password does not match
          Status: 406,
          Message: "Password Does Not Match"
        });
      }
    } else {
      //If Username is Invalid
      res.json({
        Status: 406,
        Message: "Do Not Use Symbols in username"
      });
    }
  }
};
