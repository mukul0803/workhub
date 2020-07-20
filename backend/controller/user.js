const { validationResult } = require("express-validator"); //Require Express Validator
const bcrypt = require("bcryptjs"); //Require Bcryptjs


const userModel = require("../models/users");

module.exports.getUser = (req, res) => {

    userModel.find((err, data) => {
        if (err) {
            res.send(err);
        } else {
            res.send(data);
        }
    });
};

module.exports.getUserUpdate = (req, res) => {

    //Check Validations
    const Errors = validationResult(req);
    if (!Errors.isEmpty()) {
        res.send(Errors.array());
    } else {
        const user_fullname =
            req.body.fullname.charAt(0).toUpperCase() + req.body.fullname.slice(1);

        Username = req.params.username;

        userModel.updateOne({ username: Username }, { fullname: user_fullname }, (err, data) => {
            if (err) {
                res.send(err);
            } else {
                res.send(data);
            }
        });
    }


};

module.exports.changePassword = (req, res) => {

    userEmail = req.params.email;
    currentPassword = req.body.currentPassword;
    newPassword = req.body.newPassword;
    confirmPassword = req.body.confirmPassword;

    console.log(userEmail, currentPassword, newPassword, confirmPassword);

    //Check Validations
    const Errors = validationResult(req);
    if (!Errors.isEmpty()) {
        res.send(Errors.array());
    } else {

        userModel.findOne({ email: userEmail }, { password: 1, _id: 0 }, (err, data) => {

            if (err) {
                console.log("Something went wrong.");
            }
            else {

                const CheckPassword = bcrypt.compareSync(currentPassword, data.password);

                if (CheckPassword === true) {


                    if (newPassword === confirmPassword) {

                        hashedPassword = bcrypt.hashSync(newPassword, 10);

                        userModel.update({ email: userEmail }, { password: hashedPassword }, (err, data) => {

                            if (err) {
                                res.send("Password Does not Updated");
                            }
                            else {
                                res.send(data);
                            }

                        })

                    }

                }
                else {
                    res.send("Password is Incorrect.");
                }

            }

        });

    }


}




module.exports.getloginUser = (req, res) => {

    Username = req.params.username;

    userModel.findOne({ username: Username }, (err, data) => {
        if (err) {
            res.send(err);
        } else {
            res.send(data);
        }
    });
};


