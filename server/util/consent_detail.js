const uuid = require("uuid");

const createData = (mobileNumber) => {
  const dateNow = new Date();
  const expiry = new Date();
  expiry.setDate(dateNow.getDate() + 7)
  const consentStart = new Date();
  consentStart.setDate(dateNow.getDate() - 6 * 30)
  const consentEnd = new Date();
  consentEnd.setDate(dateNow.getDate() - 5 * 30)
  var data = JSON.stringify({
    ver: "1.0",
    timestamp: dateNow.toISOString(),
    txnid: uuid.v4(),
    ConsentDetail: {
      consentStart: dateNow.toISOString(),
      consentExpiry: expiry.toISOString(),
      consentMode: "VIEW",
      fetchType: "ONETIME",
      consentTypes: ["TRANSACTIONS", "PROFILE", "SUMMARY"],
      fiTypes: ["DEPOSIT","CREDIT_CARD","MUTUAL_FUNDS", "TERM_DEPOSIT", "SIP"],
      DataConsumer: {
        id: "FIU"
      },
      Customer: {
        id: mobileNumber + "@setu-aa"
      },
      Purpose: {
        code: "102",
        refUri: "https://api.rebit.org.in/aa/purpose/101.xml",
        text: "Customer spending patterns, budget or other reportings",
        Category: {
          type: "string"
        },
      },
      FIDataRange: {
        from: consentStart.toISOString(),
        to: consentEnd.toISOString(),
      },
      DataLife: {
        unit: "MONTH",
        value: 0
      },
      Frequency: {
        unit: "MONTH",
        value: 4
      },
      DataFilter: [{
        type: "TRANSACTIONAMOUNT",
        operator: ">=",
        value: "10",
      }, ],
    },
  });

  return data;
};

module.exports = createData;
