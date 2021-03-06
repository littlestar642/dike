const uuid = require("uuid");
const jwkToPem = require("jwk-to-pem");
const cfg = require("../util/config")
const signature = require("../util/request_signing");

const FINotifcation = (req, res) => {
  var body = req.body;
  let headers = req.headers;
  let obj = JSON.parse(cfg.getSetuPublicKey());
  let pem = jwkToPem(obj);

  if (signature.validateDetachedJWS(headers["x-jws-signature"], body, pem)) {
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
