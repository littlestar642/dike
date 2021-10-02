const uuid = require("uuid");
const jwkToPem = require("jwk-to-pem");
const config = require("../config");
const axios = require("axios");
const cfg = require("../util/config")
const signature = require("../util/request_signing");
const requestData = require("../util/request_data");

const ConsentNotification = (req, res) => {
    var body = req.body;

    let headers = req.headers;
    let obj = JSON.parse(cfg.getSetuPublicKey());
    let pem = jwkToPem(obj);

    if (signature.validateDetachedJWS(headers["x-jws-signature"], body, pem)) {
        let consent_id = body.ConsentStatusNotification.consentId;
        let consent_status = body.ConsentStatusNotification.consentStatus;

        if (consent_status === "ACTIVE") {
            fetchSignedConsent(consent_id);
        }

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

const fetchSignedConsent = (consent_id) => {
    const privateKey = cfg.getAAPrivateKey()
    let detachedJWS = signature.makeDetachedJWS(
        privateKey,
        "/Consent/" + consent_id
    );
    var requestConfig = {
        method: "get",
        url: config.api_url + "/Consent/" + consent_id,
        headers: {
            "Content-Type": "application/json",
            client_api_key: config.client_api_key,
            "x-jws-signature": detachedJWS,
        },
    };

    axios(requestConfig)
        .then(function (response) {
            fi_data_request(response.data.signedConsent, consent_id);
        })
        .catch(function (error) {
            console.log(error);
            console.log("Error");
        });
};

const fi_data_request = async (signedConsent, consent_id) => {
    let keys = await requestData.generateKeyMaterial();
    let request_body = requestData.requestDataBody(
        signedConsent,
        consent_id,
        keys["KeyMaterial"]
    );
    const privateKey = cfg.getAAPrivateKey()
    let detachedJWS = signature.makeDetachedJWS(privateKey, request_body);
    var requestConfig = {
        method: "post",
        url: config.api_url + "/FI/request",
        headers: {
            "Content-Type": "application/json",
            client_api_key: config.client_api_key,
            "x-jws-signature": detachedJWS,
        },
        data: request_body,
    };

    axios(requestConfig)
        .then(function (response) {
            // Ideally, after this step we save the session ID in your DB and wait for FI notification and then proceed.
            fi_data_fetch(
                response.data.sessionId,
                keys["privateKey"],
                keys["KeyMaterial"]
            );
        })
        .catch(function (error) {
            console.log(error);
            console.log("Error");
        });
};

module.exports = ConsentNotification
