const uuid = require("uuid");
const jwkToPem = require("jwk-to-pem");
const cfg = require("../util/config")
const signature = require("../util/request_signing");

const FINotifcation = (req, res) => {
  var body = req.body;
  let headers = req.headers;
  let obj = JSON.parse(cfg.getSetuPublicKey());
  let pem = jwkToPem(obj);

  console.log("inside fi notificaiton")

  if (signature.validateDetachedJWS(headers["x-jws-signature"], body, pem)) {
    // Do something with body
    // Ideally you wait for this notification and then proceed with Data fetch request.
    const dateNow = new Date();
    res.send({
      ver: "1.0",
      timestamp: dateNow.toISOString(),
      txnid: uuid.v4(),
      response: "OK",
    });
  } else {
    res.send("Invalid Signature");
  }
}

module.exports = FINotifcation
