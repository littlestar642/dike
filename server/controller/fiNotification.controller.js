const uuid = require("uuid");
const jwkToPem = require("jwk-to-pem");
const config = require("../config");
const axios = require("axios");
const cfg = require("../util/config")
const signature = require("../util/request_signing");

const FINotifcation = (req, res) => {
    var body = req.body;
    let headers = req.headers;
    let obj = JSON.parse(cfg.getSetuPublicKey());
    let pem = jwkToPem(obj);
  
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

  const fi_data_fetch = (session_id, encryption_privateKey, keyMaterial) => {
    const privateKey = cfg.getAAPrivateKey()
    let detachedJWS = signature.makeDetachedJWS(
      privateKey,
      "/FI/fetch/" + session_id
    );
    var requestConfig = {
      method: "get",
      url: config.api_url + "/FI/fetch/" + session_id,
      headers: {
        "Content-Type": "application/json",
        client_api_key: config.client_api_key,
        "x-jws-signature": detachedJWS,
      },
    };
    
    axios(requestConfig)
      .then(function (response) {
        decrypt_data(response.data.FI, encryption_privateKey, keyMaterial);
      })
      .catch(function (error) {
        console.log(error);
        console.log("Error");
      });
  };

  module.exports = FINotifcation