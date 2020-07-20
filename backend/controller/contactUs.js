//Modules
const { validationResult } = require("express-validator"); //Require Express Validator
const mailer = require("nodemailer"); //Require Node Mailer

module.exports.contact = (req, res) => {
  const Errors = validationResult(req);

  //If Errors in validations
  if (!Errors.isEmpty()) {
    res.send(Errors.array());
  } else {
    //If All is Good

    //Node Mailer
    const transporter = mailer.createTransport({
      service: "gmail",
      port: 587,
      secure: false,
      auth: {
        user: process.env.USER,
        pass: process.env.PASS
      }
    });

    const contactInfo = {
      from: "workhub@noreply",
      to: req.body.email,
      subject: req.body.subject,
      html: `<h3>Name : ${req.body.name}</h3>
        <p>${req.body.message}</p>`
    };

    transporter.sendMail(contactInfo, (err, data) => {
      if (err) {
        res.send(err);
      } else {
        res.send(data);
      }
    });
  }
};
