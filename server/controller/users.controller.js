const createData = require("../util/consent_detail");
const cfg = require("../util/config")
const signature = require("../util/request_signing");
const axios = require("axios");
const config = require("../config");
const rsp = require("../util/response")

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
                `?redirect_url=${config.redirect_url}/redirect`;
            let resp = await req.firestore.updateConsentHandleForUser(req.user.uid, consentHandle)
            if (resp.success) {
                res.status(200).send(rsp.Success(url));
            } else {
                console.log(resp)
                res.status(500).send(resp)
            }

        })
        .catch(function (error) {
            console.log(error);
            res.send(response.Failure("error in getting consent"))
        });
}

const GetUserTransactions = async (req, res) => {
    let val = await req.firestore.FetchTrasactionsForUser(req.user["uid"])
    if (val.success){
        res.send(val)
    } else{
        res.status(500).send(val)
    }
}

const GetUserMutualFunds = async (req, res) => {
    let val = await req.firestore.FetchMFForUser(req.user["uid"])
    if (val.success){
        res.send(val)
    } else{
        res.status(500).send(val)
    }
}

const GenerateUserScore = async(req,res) =>{
    let val = await req.firestore.GenerateAndFetchUserScore(req.user["uid"])
    if (val.success){
        res.send(val)
    } else{
        res.status(500).send(val)
    }
}

const GetProfileDetails = async (req,res)=>{
    let val = await req.firestore.getUserProfileDetails(req.user["uid"])
    if (val.success){
        res.send(val)
    } else{
        res.status(500).send(val)
    }
}

module.exports = {
    Consent,
    GetUserTransactions, 
    GetUserMutualFunds,
    GenerateUserScore,
    GetProfileDetails
}