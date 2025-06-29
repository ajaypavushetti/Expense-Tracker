const express = require("express");
const dbConnect = require("./dbConnect.js");
const app = express();
app.use(express.json());

const userRoute = require("./routes/UsersRoute.js");
const transactionsRoute = require("./routes/transactionsRoute.js");

app.use("/api/users/", userRoute);
app.use("/api/transactions/", transactionsRoute);

app.listen(3000, () => {
  console.log("server running on port 3000");
});
