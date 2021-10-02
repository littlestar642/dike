const uuid = require("uuid");
var axios = require("axios");
const config = require("./../config");

///// GENERATE KEYS

const generateKeyMaterial = async () => {
  const {
    data: response
  } = await axios.get(
    config.rahasya_url + "/ecc/v1/generateKey"
  );
  return response;
};

///// CREATE BODY FOR DATA REQUEST

const requestDataBody = (signedConsent, consent_id, keys) => {
  const dateNow = new Date();
  const consentStart = new Date();
  consentStart.setDate(dateNow.getDate() - 6 * 30)
  const consentEnd = new Date();
  consentEnd.setDate(dateNow.getDate() - 3 * 30)
  let data = JSON.stringify({
    ver: "1.0",
    timestamp: dateNow.toISOString(),
    txnid: uuid.v4(),
    FIDataRange: {
      from: consentStart.toISOString(),
      to: consentEnd.toISOString(),
    },

    Consent: {
      id: consent_id,
      digitalSignature: signedConsent.split(".")[2],
    },
    KeyMaterial: keys,
  });

  return data;
};

module.exports = {
  requestDataBody,
  generateKeyMaterial
};
