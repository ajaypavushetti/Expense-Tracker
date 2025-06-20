const express = require("express");
const dbConnect = require("./dbConnect.js");
const app = express();
app.use(express.json());

const userRoute = require("./routes/UsersRoute.js");

app.use("/api/users/", userRoute);

app.listen(3000, () => {
  console.log("server running on port 3000");
});
