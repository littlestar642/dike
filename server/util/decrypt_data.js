var axios = require("axios");
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
  console.log("%j", fi)
  fi.forEach(val=>{
    val.data.forEach(d=>{
      const body = {
        base64Data: d["encryptedFI"],
        base64RemoteNonce: val["KeyMaterial"]["Nonce"],
        base64YourNonce: keyMaterial["Nonce"],
        ourPrivateKey: privateKey,
        remoteKeyMaterial: val["KeyMaterial"],
      };

      if (val.fidId == "APNB"){
        processBankData(body, requestConfig, consent_handle)
      } else {
        processStocksData(requestConfig, consent_handle)
      } 
    })
    

      
  })
};

const processBankData = (body, requestConfig, consent_handle) =>{
  var requestConfig = {
    method: "post",
    url: config.rahasya_url + "/ecc/v1/decrypt",
    data: body,
  };

  axios(requestConfig)
    .then((res) => {
      let base64Data = res.data["base64Data"];
      let decoded_data = Buffer.from(base64Data, "base64").toString("ascii");

      processDecodedBankData(JSON.parse(decoded_data), consent_handle)
    })
    .catch((err) => console.log(err.data.error));
}

const processStocksData = (requestConfig, consent_handle) =>{
  axios(requestConfig)
    .then((res) => {
      let base64Data = res.data["base64Data"];
      let decoded_data = Buffer.from(base64Data, "base64").toString("ascii");

      processDecodedStocksData(JSON.parse(decoded_data), consent_handle)
    })
    .catch((err) => console.log(err.data.error));
}

const processDecodedBankData = (data, consent_handle) => {
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

    console.log(totalCredit)
    console.log(totalDebit)

    // getTransactionGroup(val.narration)
  })
}

const getTransactionGroup = (narration) =>{
  formatted = ""
  tokenised = narration.split("/")
  tokenised.forEach(val=>{
  })
}

module.exports = decrypt_data;