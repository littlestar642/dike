const uuid = require("uuid");

const createData = (mobileNumber) => {
  const dateNow = new Date();
  const expiry = new Date(dateNow.getTime() + 600000);
  const consentStart = new Date();
  consentStart.setDate(dateNow.getDate() - 6 * 30)
  const consentEnd = new Date();
  consentEnd.setDate(dateNow.getDate() - 3 * 30)
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
      fiTypes: ["DEPOSIT"],
      DataConsumer: {
        id: "FIU"
      },
      Customer: {
        id: mobileNumber + "@setu-aa"
      },
      Purpose: {
        code: "101",
        refUri: "https://api.rebit.org.in/aa/purpose/101.xml",
        text: "Wealth management service",
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
        value: 3
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
