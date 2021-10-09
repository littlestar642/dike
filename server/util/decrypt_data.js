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
  "MOTILAL OS": stocks,
  "ISIP": sip,
  "LIC": insurance,
  "IMPS": imps,
  "ACH": ach,
  "BIL": bill
}

const decrypt_data = (fi, privateKey, keyMaterial, consent_handle) => {
  fi.forEach(val => {
    val.data.forEach(async d => {
      const body = {
        base64Data: d["encryptedFI"],
        base64RemoteNonce: val["KeyMaterial"]["Nonce"],
        base64YourNonce: keyMaterial["Nonce"],
        ourPrivateKey: privateKey,
        remoteKeyMaterial: val["KeyMaterial"],
      };

      if (val["fipId"] == "APNB") {
        await processBankData(body, consent_handle)
      } else if (val["fipId"] == "APMF") {
        await processStocksData(body, consent_handle)
      }
    })
  })

  firebaseUtil.GetInstance().updateDataFetchStatus(consent_handle)
};

const processBankData = async (body, consent_handle) => {
  var requestConfig = {
    method: "post",
    url: config.rahasya_url + "/ecc/v1/decrypt",
    data: body,
  };

  try {
    let res = await axios(requestConfig)
    let base64Data = res.data["base64Data"];
    let decoded_data = JSON.parse(Buffer.from(base64Data, "base64").toString("ascii"));
    if (decoded_data.account["type"] == "deposit") {
      await processDecodedBankData(decoded_data, consent_handle)
    } else if (decoded_data.account["type"] == "credit_card") {
      await processDecodedCreditCardData(decoded_data, consent_handle)
    }
  } catch (e) {
    console.log(e)
  }
}

const processStocksData = async (body, consent_handle) => {
  var requestConfig = {
    method: "post",
    url: config.rahasya_url + "/ecc/v1/decrypt",
    data: body,
  };

  try {
    let res = await axios(requestConfig)
    let base64Data = res.data["base64Data"];
    let decoded_data = JSON.parse(Buffer.from(base64Data, "base64").toString("ascii"));
    if (decoded_data.account["type"] == "mutual_funds") {
      await processDecodedMFData(decoded_data, consent_handle)
    }
    } catch (e) {
    console.log(e)
    }
}

const processDecodedMFData = async (data, consent_handle) => {
  let summary = data.account["summary"]
  await firebaseUtil.GetInstance().saveMFSummaryData(summary["currentValue"], summary["investmentValue"], summary["investment"]["holdings"]["holding"], consent_handle)
}

const processDecodedCreditCardData = async (data, consent_handle) => {
  await firebaseUtil.GetInstance().saveCreditCardTransactionData(data["account"]["transactions"], consent_handle)
  await createCCTransactionInsights(data["account"]["transactions"], consent_handle)
}

const processDecodedBankData = async (data, consent_handle) => {
  let profileData = data.account.profile.holders
  await processProfileData(profileData, consent_handle)
  let summaryData = data.account.summary
  await processSummaryData(summaryData, consent_handle)
  let transactions = data.account.transactions
  await processTransactionData(transactions, consent_handle)
  await createTransactionInsights(transactions, consent_handle)
}

const processProfileData = async (data, consent_handle) => {
  val = await firebaseUtil.GetInstance().saveProfileData(data, consent_handle)
}

const processSummaryData = (data, consent_handle) => {
  return firebaseUtil.GetInstance().saveSummaryData(data, consent_handle)
}

const processTransactionData = (data, consent_handle) => {
  return firebaseUtil.GetInstance().saveTransactionData(data, consent_handle)
}

const createTransactionInsights = (data, consent_handle) => {
  let totalDebit = 0;
  let totalCredit = 0;
  data["transaction"].forEach(val => {
    if (val.type == "DEBIT") {
      totalDebit += parseFloat(val.amount)
    } else if (val.type == "CREDIT") {
      totalCredit += parseFloat(val.amount)
    }
    // getTransactionGroup(val.narration)
  })
  firebaseUtil.GetInstance().updateTransactionInsights(data["startDate"], data["endDate"], totalCredit, totalDebit, consent_handle)
}

const createCCTransactionInsights = async (data, consent_handle) => {
  let totalDebit = 0;
  let totalCredit = 0;
  data["transaction"].forEach(val => {
    if (val["txnType"] == "DEBIT") {
      totalDebit += parseFloat(val.amount)
    } else if (val["txnType"] == "CREDIT") {
      totalCredit += parseFloat(val.amount)
    }
    // getTransactionGroup(val.narration)
  })
  await firebaseUtil.GetInstance().updateCCTransactionInsights(data["startDate"], data["endDate"], totalCredit, totalDebit, consent_handle)
}

const getTransactionGroup = (narration) => {
  formatted = ""
  tokenised = narration.split("/")
  tokenised.forEach(val => {})
}

module.exports = decrypt_data;