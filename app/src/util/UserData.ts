import URLs from "../constants/urls";
import Authentication from "./Authentication";
import Common from "./CommonUtils";

class UserData {
    private static _instance: UserData;
    private _transactions: object;
    private dataReady: boolean;

    private constructor() {
        this.dataReady = false;
        this._transactions = {};
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
        this._transactions = JSON.parse(transactionStr);
        this.dataReady = true;
    }

    public get transactions() {
        return this._transactions;
    }
}

export default UserData;