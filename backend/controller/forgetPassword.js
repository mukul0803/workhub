//Modules
const { validationResult } = require("express-validator"); //Require Express Validator
const mailer = require("nodemailer"); //Require Node Mailer

//Import User Model
const userModel = require("../models/users");

module.exports.forget = (req, res) => {
  //Check Validations
  const Errors = validationResult(req);
  if (!Errors.isEmpty()) {
    //If Error in validation
    res.send(Errors.array());
  } else {
    //If all is good
    //Find email in database
    userModel.findOne({ email: req.body.email }, (err, data) => {
      if (err) {
        //If any Error
        res.send(err);
      } else if (!data) {
        //If Email does not exist in database
        res.json({
          Status: 406,
          message: "Email is not registered"
        });
      } else {
        //If Email Exist in database
        //NodeMailer
        const transporter = mailer.createTransport({
          service: "gmail",
          port: 587,
          secure: false,
          auth: {
            user: process.env.USER,
            pass: process.env.PASS
          }
        });

        const forgetData = {
          from: process.env.USER,
          to: req.body.email,
          subject: "Forget Password || TMS",
          html: `<p>Testing Forget Password Link</p>`
        };

        transporter.sendMail(forgetData, (err, data) => {
          if (err) {
            res.send(err);
          } else {
            res.send(data);
          }
        });
      }
    });
  }
};
