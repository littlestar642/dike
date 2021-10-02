class User {
    constructor(ID, username, phoneNumber, FIDataFetchStatus, FIDataConsentStatus, bankProfileID, summaryID, transactionsID, transactionInsightsID, score) {
        this.ID = ID
        this.username = username;
        this.phoneNumber = phoneNumber;
        this.score = score;
        this.FIDataConsentStatus = FIDataConsentStatus;
        this.FIDataFetchStatus = FIDataFetchStatus;
        this.bankProfileID = bankProfileID;
        this.summaryID = summaryID;
        this.transactionsID = transactionsID;
        this.transactionInsightsID = transactionInsightsID;
        return {
            ID: this.ID,
            username: this.username,
            phoneNumber: this.phoneNumber,
            score: this.score,
            FIDataConsentStatus: this.FIDataConsentStatus,
            FIDataFetchStatus: this.FIDataFetchStatus,
            bankProfileID: this.bankProfileID,
            summaryID: this.summaryID,
            transactionsID: this.transactionsID,
            transactionInsightsID: this.transactionInsightsID
        };
    }
}

module.exports = User
