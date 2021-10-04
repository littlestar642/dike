const createData = require("../util/consent_detail");
const cfg = require("../util/config")
const signature = require("../util/request_signing");
const axios = require("axios");
const config = require("../config");
const FirestoreUtils = require("../util/firestore");

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
        .then(async function (response) {
            let consentHandle = response.data.ConsentHandle
            let url =
                config.app_url +
                "/" +
                consentHandle +
                `?redirect_url=${config.redirect_url}/redirectS`;
            let resp = await req.firestore.updateConsentHandleForUser(req.user.uid, consentHandle)
            if (resp.success){
                res.send(url);
            }else{
                console.log(resp)
                res.status(500).send(resp.msg)
            }
            
        })
        .catch(function (error) {
            console.log(error);
            console.log("Error");
        });
}

const GetData = async (req, res) => {
    let val = await firebaseUtil.GetInstance().get("fidata/doc")
    res.send(val);
}

module.exports = {
    Consent,
    GetData
}