class MutualFunds {
    constructor(currentValue, investmentValue, holdings) {
        this.currentValue = currentValue;
        this.investmentValue = investmentValue;
        this.holdings = holdings;
        return {
            currentValue: this.currentValue,
            investmentValue: this.investmentValue,
            holdings: this.holdings
        }
    }
}

module.exports = MutualFunds
