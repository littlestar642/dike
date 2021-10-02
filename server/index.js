const express = require("express");
const cors = require("cors");
const app = express();
const config = require("./config");
const firebaseUtil = require("./util/firestore")
const fbsUtil = new firebaseUtil();

// middlewares
const auth = require("./middleware/auth")

// routers
var usersRouter = require('./Routes/users.routes');
var defaultRouter = require('./Routes/default.routes');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

app.use(express.static("public"));

app.use('/', (req, res, next) => {
  req.firebase = fbsUtil;
  next();
}, defaultRouter)

app.use('/users', (req, res, next) => {
  req.firebase = fbsUtil;
  next();
}, auth, usersRouter);

// start the server listening for requests
app.listen(config.port || 3000, () => console.log("Server is running..."));
