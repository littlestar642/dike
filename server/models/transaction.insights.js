class TransactionInsights {
    constructor(startDate, endDate, totalCredits, totalDebits) {
        this.totalCredits = totalCredits;
        this.totalDebits = totalDebits;
        this.startDate = startDate;
        this.endDate = endDate
        return {
            totalCredits: this.totalCredits,
            totalDebits: this.totalDebits,
            startDate:this.startDate,
            endDate:this.endDate
        }
    }
}

module.exports = TransactionInsights
