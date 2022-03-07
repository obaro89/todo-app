const express = require("express");
const connectDB = require("./database/db");

connectDB();
const app = express();

const PORT = process.env.PORT || 5050;

//init middleware

app.use(
  express.json({
    extended: false,
  })
);
//defining our routes
app.use(require("./api/routes/todo"));

app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});
