var axios = require("axios");
const e = require("express");
const config = require("./../config");
const firebaseUtil = require("./firestore")

const stocks = "stocks"
const sip = "sip"
const insurance = "insurance"
const imps = "imps"
const ach = "ach"
const bill = "bill"
const other = "other"
const transactionGroupMap = {
  "MOTILAL OS":stocks,
  "ISIP":sip,
  "LIC":insurance,
  "IMPS":imps,
  "ACH":ach,
  "BIL":bill
}

const decrypt_data = (fi, privateKey, keyMaterial, consent_handle) => {
  const fi_data = fi[0];
  const body = {
    base64Data: fi_data["data"][0]["encryptedFI"],
    base64RemoteNonce: fi_data["KeyMaterial"]["Nonce"],
    base64YourNonce: keyMaterial["Nonce"],
    ourPrivateKey: privateKey,
    remoteKeyMaterial: fi_data["KeyMaterial"],
  };
  var requestConfig = {
    method: "post",
    url: config.rahasya_url + "/ecc/v1/decrypt",
    data: body,
  };

  axios(requestConfig)
    .then((res) => {
      let base64Data = res.data["base64Data"];
      let decoded_data = Buffer.from(base64Data, "base64").toString("ascii");
      processDecodedData(JSON.parse(decoded_data), consent_handle)
    })
    .catch((err) => console.log(err));
};

const processDecodedData = (data, consent_handle) => {
  let profileData = data.account.profile.holders
  console.log(profileData)
  processProfileData(profileData, consent_handle)
  let summaryData = data.account.summaryData
  processSummaryData(summaryData,consent_handle)
  let transactions = data.account.transactions.transaction
  processTransactionData(transactions,consent_handle)
  createTransactionInsights(transactions,consent_handle)
}

const processProfileData = (data, consent_handle) => {
  return firebaseUtil.GetInstance().saveProfileData(data, consent_handle)
}

const processSummaryData = (data, consent_handle) =>{
  return firebaseUtil.GetInstance().saveSummaryData(data,consent_handle)
}

const processTransactionData = (data,consent_handle) =>{
  return firebaseUtil.GetInstance().saveTransactionData(data,consent_handle)
}

const createTransactionInsights = (data,consent_handle) =>{
  let totalDebit = 0;
  let totalCredit = 0;
  let score = 0;
  data.forEach(val=>{
    if (val.type == "DEBIT"){
      totalDebit += val.amount
    }else if(val.type == "CREDIT"){
      totalCredit += val.amount
    }

    getTransactionGroup(val.narration)
  })
}

const getTransactionGroup = (narration) =>{
  formatted = ""
  tokenised = narration.split("/")
  tokenised.forEach(val=>{
  })
}

module.exports = decrypt_data;