const mongoose = require("mongoose");
const config=require("config")

db=config.get("db")

const connect_db = () => {
  mongoose
    .connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    })
    .then(() => console.log(`connected to database.... ${db}`))
    .catch((err) => {
      console.log("db", db);
      console.log("Connection refused to database because....", err);
    });
};

module.exports = connect_db;
