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

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "view", "build", "index.html"));
  });
}

app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});
