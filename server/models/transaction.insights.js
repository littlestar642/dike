class TransactionInsights {
    constructor(ID, totalCredits, totalDebits, spendingSources) {
        this.ID = ID;
        this.totalCredits = totalCredits;
        this.totalDebits = totalDebits;
        this.spendingSources = spendingSources;
        return {
            ID: this.ID,
            totalCredits: this.totalCredits,
            totalDebits: this.totalDebits,
            spendingSources: this.spendingSources
        }
    }
}

module.exports = TransactionInsights
