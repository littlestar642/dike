const createData = require("../util/consent_detail");
const cfg = require("../util/config")
const signature = require("../util/request_signing");
const axios = require("axios");
const config = require("../config");

const Consent = (req, res) => {
    let body = createData(req.params.mobileNumber);
    const privateKey = cfg.getAAPrivateKey()
    let detachedJWS = signature.makeDetachedJWS(privateKey, body);
    var requestConfig = {
        method: "post",
        url: config.api_url + "/Consent",
        headers: {
            "Content-Type": "application/json",
            client_api_key: config.client_api_key,
            "x-jws-signature": detachedJWS,
        },
        data: body,
    };

    axios(requestConfig)
        .then(function (response) {
            let url =
                config.app_url +
                "/" +
                response.data.ConsentHandle +
                `?redirect_url=${config.redirect_url}/redirectS`;
            res.send(url);
        })
        .catch(function (error) {
            console.log(error);
            console.log("Error");
        });
}

module.exports = {
    Consent
}