class User {
    constructor(ID, username, phoneNumber, consentHandle, FIDataFetchStatus, FIDataConsentStatus, bankProfileID, summaryID, transactionsID, transactionInsightsID, score, mutualFundsID) {
        this.ID = ID
        this.username = username;
        this.phoneNumber = phoneNumber;
        this.latestConsentHandle = consentHandle;
        this.score = score;
        this.FIDataConsentStatus = FIDataConsentStatus;
        this.FIDataFetchStatus = FIDataFetchStatus;
        this.bankProfileID = bankProfileID;
        this.summaryID = summaryID;
        this.transactionsID = transactionsID;
        this.transactionInsightsID = transactionInsightsID;
        this.mutualFundsID = mutualFundsID;
        return {
            ID: this.ID,
            username: this.username,
            phoneNumber: this.phoneNumber,
            latestConsentHandle: this.latestConsentHandle,
            score: this.score,
            FIDataConsentStatus: this.FIDataConsentStatus,
            FIDataFetchStatus: this.FIDataFetchStatus,
            bankProfileID: this.bankProfileID,
            summaryID: this.summaryID,
            transactionsID: this.transactionsID,
            transactionInsightsID: this.transactionInsightsID,
            mutualFundsID:this.mutualFundsID
        };
    }
}

module.exports = User