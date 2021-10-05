const jwt = require("jsonwebtoken");

module.exports = async function (req, res, next) {
  const token = req.header("X_FIREBASE_TOKEN");
  const userID = req.header("X_USER_ID")

  if (!token) return res.status(400).send("Access Denied!, no token provided");
  try {
    // const tokenStatus = await req.firestore.checkJWTToken(token)
    if (true) {
      resp = await req.firestore.getUserDetails(userID)
      if (resp.success) {
        req.user = resp.msg;
        next();
      } else {
        res.status(500).send(`unable to fetch user details ${resp.msg}`)
      }
    } else {
      res.status(401).send("Unauthorised user")
    }
  } catch (err) {
    console.log("error in checking auth", err)
    res.status(400).send({
      error: "auth failed, check auth-token222"
    });
  }
};