const express = require("express");
const cors = require("cors");
const app = express();
const config = require("./config");

// routers
var usersRouter = require('./Routes/users.routes');
var defaultRouter = require('./Routes/default.routes');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded());

app.use(express.static("public"));

app.use('/', defaultRouter)
app.use('/users', usersRouter);

app.use(function(req, res, next) {
  res.status(err.status || 404).json({
    message: "No such route exists"
  })
});

// error handler
app.use(function(err, req, res, next) {
  console.log(err)
  res.status(err.status || 500).json({
    message: "internal server error"
  })
});

// start the server listening for requests
app.listen(config.port || 3000, () => console.log("Server is running..."));
