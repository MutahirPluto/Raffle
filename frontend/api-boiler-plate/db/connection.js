require("dotenv").config();
const mongoose = require("mongoose");

let db = {},
  db_connection_string = "";
try {
  const { DB_USERNAME, DB_PASSWORD, DB_NAME, DB_URL, LOCAL_DB } = process.env;

  if (LOCAL_DB) {
    db_connection_string = LOCAL_DB;
  } else {
    db = {
      username: DB_USERNAME,
      password: DB_PASSWORD,
      name: DB_NAME,
      urL: DB_URL,
    };
    db_connection_string = `mongodb+srv://${db.username}:${db.password}${db.urL}/${db.name}`;
  }

  mongoose.connect(
    db_connection_string,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    (error) => {
      if (error) {
        console.log(db.name + " connection failed!", error);
      } else {
        console.log(db.name + " connected successfully!");
      }
    }
  );
} catch (err) {
  console.log("An exception occurred while connecting to database.");
}
