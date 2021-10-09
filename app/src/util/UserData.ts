import URLs from "../constants/urls";
import Authentication from "./Authentication";
import Common from "./CommonUtils";

class UserData {
    private static _instance: UserData;
    private _transactions: object;
    private _mutualFunds: object;
    private dataReady: boolean;

    private constructor() {
        this.dataReady = false;
        this._transactions = [];
        this._mutualFunds = {};
        this.fetchAllData();
    }

    static get instance(): UserData {
        if (UserData._instance === null || UserData._instance === undefined) {
            UserData._instance = new UserData();
        }
        return UserData._instance;
    }

    public async refreshData() {
        this.dataReady = false;
        await this.fetchAllData();
        return this.dataReady;
    }

    private async fetchAllData() {
        let headers = await Authentication.getAPIRequestHeader();
        let transactionStr = await Common.makeApiRequest('GET', URLs.getTransactionDetails, headers);
        let data = JSON.parse(transactionStr);
        if (data.success) {
            this._transactions = data.msg;
        }

        let mutualFundsStr = await Common.makeApiRequest('GET', URLs.getMutualFunds, headers);
        let mfData = JSON.parse(mutualFundsStr);
        if (mfData.success) {
            this._mutualFunds = mfData.msg
        }
        this.dataReady = true;
    }

    public get transactions(): object {
        return this._transactions;
    }

    public get mutualFunds(): object {
        return this._mutualFunds;
    }
}

export default UserData;