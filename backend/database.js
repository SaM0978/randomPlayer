const mongoose = require("mongoose");

function conntectToDataBase() {
  mongoose.connect("mongodb://localhost:27017/randomPlayer");
  setTimeout(() => {
    console.log("Connected To DataBase");
  }, 1000);
}

module.exports = conntectToDataBase;
1;
