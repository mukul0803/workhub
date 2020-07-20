//Modules
const jwt = require("jsonwebtoken"); //Require Json Web Token

module.exports = (req, res) => {
  token = req.headers["x-access-token"] || req.headers["authorization"];

  //If token value starts with Bearer
  if (token.startsWith("Bearer")) {
    token = token.slice(7, token.length);
  }

  //If Token is Invalid
  if (!token) {
    res.json({
      Status: 500,
      Message: "Token is invalid"
    });
  } else {
    //If Token is Correct
    jwt.verify(token, process.env.JWT_KEY, (err, data) => {
      if (err) {
        res.send(err);
      } else {
        user_name = data.name;
        user_username = data.username;
        user_email = data.email;

        res.json({
          name: user_name,
          username: user_username,
          email: user_email
        });
      }
    });
  }
};
