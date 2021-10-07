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
  fi.forEach(val=>{
    val.data.forEach(d=>{
      const body = {
        base64Data: d["encryptedFI"],
        base64RemoteNonce: val["KeyMaterial"]["Nonce"],
        base64YourNonce: keyMaterial["Nonce"],
        ourPrivateKey: privateKey,
        remoteKeyMaterial: val["KeyMaterial"],
      };

      if (val["fipId"] == "APNB"){
        processBankData(body, consent_handle)
      } else if (val["fipId"] == "APMF")  {
        // processStocksData(body, consent_handle)
      } 
    })     
  })
};

const processBankData = (body, consent_handle) =>{
  var requestConfig = {
    method: "post",
    url: config.rahasya_url + "/ecc/v1/decrypt",
    data: body,
  };

  axios(requestConfig)
    .then((res) => {
      let base64Data = res.data["base64Data"];
      let decoded_data = JSON.parse(Buffer.from(base64Data, "base64").toString("ascii"));
      if (decoded_data.account["type"] == "deposit"){
        processDecodedBankData(decoded_data, consent_handle)
      } else if(decoded_data.account["type"] == "credit_card"){
        processDecodedCreditCardData()
      }
    })
    .catch((err) => console.log(err.data.error));
}

const processStocksData = (body, requestConfig, consent_handle) =>{
  var requestConfig = {
    method: "post",
    url: config.rahasya_url + "/ecc/v1/decrypt",
    data: body,
  };

  axios(requestConfig)
    .then((res) => {
      let base64Data = res.data["base64Data"];
      let decoded_data = Buffer.from(base64Data, "base64").toString("ascii");
      console.log("stocks",decoded_data)

      // processDecodedStocksData(JSON.parse(decoded_data), consent_handle)
    })
    .catch((err) => console.log(err.data.error));
}

const processDecodedCreditCardData = (data,consent_handle) =>{

}

const processDecodedBankData = (data, consent_handle) => {
  let profileData = data.account.profile.holders
  processProfileData(profileData, consent_handle)
  let summaryData = data.account.summary
  processSummaryData(summaryData,consent_handle)
  let transactions = data.account.transactions
  processTransactionData(transactions,consent_handle)
  createTransactionInsights(transactions,consent_handle)
}

const processProfileData = async (data, consent_handle) => {
  val = await firebaseUtil.GetInstance().saveProfileData(data, consent_handle)
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
  data["transaction"].forEach(val=>{
    if (val.type == "DEBIT"){
      totalDebit += parseFloat(val.amount)
    }else if(val.type == "CREDIT"){
      totalCredit += parseFloat(val.amount)
    }
    // getTransactionGroup(val.narration)
  })

  console.log(totalCredit)
  console.log(totalDebit)
}

const getTransactionGroup = (narration) =>{
  formatted = ""
  tokenised = narration.split("/")
  tokenised.forEach(val=>{
  })
}

module.exports = decrypt_data;