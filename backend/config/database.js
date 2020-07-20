//Modules
const mongoose = require("mongoose");
const DBURL = process.env.DB_URL;

//Mongoose Connection
module.exports.connect = () => {
  mongoose.connect(
    DBURL,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    },
    (err, data) => {
      if (err) {
        console.log(err);
      } else {
        console.log(data);
        console.log("Database is connected sucessfully");
      }
    }
  );
};
