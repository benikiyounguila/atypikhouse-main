const mongoose = require("mongoose");

const connectWithDB = () => {
  mongoose.set("strictQuery", false);

  const dbUrl = process.env.DB_URL;
  console.log("Connecting to DB with URL:", dbUrl); // Vérification de DB_URL

  if (!dbUrl) {
    console.error("DB_URL is not defined in the environment variables");
    process.exit(1);
  }

  mongoose
    .connect(dbUrl)
    .then(() => {
      console.log("DB connected successfully");
    })
    .catch((err) => {
      console.log("DB connection failed");
      console.log(err);
      process.exit(1);
    });
};

module.exports = connectWithDB;
