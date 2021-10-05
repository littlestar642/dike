const express = require("express");
const cors = require("cors");
const app = express();
const config = require("./config");
const firebaseUtil = require("./util/firestore")

// middlewares
const auth = require("./middleware/auth")

// routers
var usersRouter = require('./routes/users.routes');
var defaultRouter = require('./routes/default.routes');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

app.use(express.static("public"));

app.use('/', (req, res, next) => {
  req.firestore = firebaseUtil.GetInstance();
  next();
}, defaultRouter)

app.use('/users', (req, res, next) => {
  req.firestore = firebaseUtil.GetInstance();
  next();
}, auth, usersRouter);

// start the server listening for requests
app.listen(config.port || 3000, () => console.log("Server is running..."));