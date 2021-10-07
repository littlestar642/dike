var admin = require("firebase-admin");
const fs = require("fs");
const {
    use
} = require("../routes/users.routes");
const cfg = require("./config")
const response = require("./response")
const User = require("../models/user")
const constants = require("../constants/constants")

class FirestoreUtils {
    static instance;
    firestore;

    constructor() {
        let adminConfig = cfg.getFirebaseAdminConfig()
        admin.initializeApp({
            credential: admin.credential.cert(adminConfig)
        });
        this.firestore = admin.firestore(); 
    }

    static GetInstance() {
        if (FirestoreUtils.instance === null || FirestoreUtils.instance === undefined) {
            FirestoreUtils.instance = new FirestoreUtils();
        }
        return FirestoreUtils.instance;
    }

    // saveDocument(collectionName, obj) {
    //     this.firestore.collection(collectionName).add(obj).then((ref)=>{
    //         console.log("Document written with ID: ", ref.id);
    //     }).catch(e=>{
    //         console.log("error in saving doc", e)
    //     })
    // }

    async getUserDetailsFromConsentHandle(consent_handle){
        let uid = (await this.firestore.collection("consentHandleMap").doc(consent_handle).get()).data().ID
        return await (await this.firestore.collection("users").doc(uid).get()).data()
    }

    async updateDataConsentStatus(consent_handle, consent_status){
        let userDetails = await this.getUserDetailsFromConsentHandle(consent_handle)
        let status = constants.dataConsentStatus[consent_status]
        let val = await this.firestore.collection("users").doc(userDetails.ID).update({FIDataConsentStatus:status})
        if (val.writeTime){
            return response.Success("updated successfully")
        } else{
            console.log(val)
            return response.Failure("failed updating")
        }
    }

    async updateDataFetchStatus(consent_handle, fetch_status){
        let userDetails = await this.getUserDetailsFromConsentHandle(consent_handle)
        let status = constants.dataFetchStatus[fetch_status]
        let val = await this.firestore.collection("users").doc(userDetails.ID).update({FIDataFetchStatus:status})
        if (val.writeTime){
            return response.Success("updated successfully")
        } else{
            console.log(val)
            return response.Failure("failed updating")
        }
    }

    async saveProfileData(obj, consent_handle) {
        let userDetails = await this.getUserDetailsFromConsentHandle(consent_handle)
        if (userDetails.bankProfileID !== -1){
            let updateRes = await this.firestore.collection("profile").doc(userDetails.bankProfileID).update(obj)
            if (updateRes.writeTime){
                return response.Success(updateRes.writeTime)
            } else{
                console.log(updateRes)
                return response.Failure("error in updating profile data")
            }
        } else {
            this.firestore.collection("profile").add(obj).then(async (ref)=>{
                console.log("Document written with ID: ", ref.id);
                let resp = await this.firestore.collection("users").doc(userDetails.ID).update({bankProfileID:ref.id})
                return response.Success(resp.writeTime)
            }).catch(e=>{
                console.log("error in saving doc", e)
                return response.Failure(e)
            })
        } 
    }

    async saveSummaryData(obj, consent_handle) {
        let userDetails = await this.getUserDetailsFromConsentHandle(consent_handle)
        if (userDetails.summaryID !== -1){
            let updateRes = await this.firestore.collection("summary").doc(userDetails.summaryID).update(obj)
            if (updateRes.writeTime){
                return response.Success(updateRes.writeTime)
            } else{
                console.log(updateRes)
                return response.Failure("error in updating summary data")
            }
        } else {
            this.firestore.collection("summary").add(obj).then(async (ref)=>{
                console.log("Document written with ID: ", ref.id);
                let resp = await this.firestore.collection("users").doc(userDetails.ID).update({summaryID:ref.id})
                return response.Success(resp.writeTime)
            }).catch(e=>{
                console.log("error in saving doc", e)
                return response.Failure(e)
            })
        } 
    }

    async saveTransactionData(obj, consent_handle) {
        let userDetails = await this.getUserDetailsFromConsentHandle(consent_handle)
        if (userDetails.transactionsID !== -1){
            let updateRes = await this.firestore.collection("transactions").doc(userDetails.transactionsID).update(obj)
            if (updateRes.writeTime){
                return response.Success(updateRes.writeTime)
            } else{
                console.log(updateRes)
                return response.Failure("error in updating transactions data")
            }
        } else {
            this.firestore.collection("transactions").add(obj).then(async (ref)=>{
                console.log("Document written with ID: ", ref.id);
                let resp = await this.firestore.collection("users").doc(userDetails.ID).update({transactionsID:ref.id})
                return response.Success(resp.writeTime)
            }).catch(e=>{
                console.log("error in saving doc", e)
                return response.Failure(e)
            })
        } 
    }

    async FetchTrasactionsForUser(uid) {
        let userDetails = await (await this.firestore.collection("users").doc(uid).get()).data()
        return (await this.firestore.collection("transactions").doc(userDetails["transactionsID"]).get()).data()
    }

    async updateConsentHandleForUser(ID, consentHandle) {
        try {
            await this.firestore.collection("users").doc(ID).update({latestConsentHandle:consentHandle})
            await this.firestore.collection("consentHandleMap").doc(consentHandle).create({ID})
            return response.Success("success in updating consent handle")
        } catch (e) {
            console.log("error in updating consent handle for user", e)
            return response.Failure(e)
        }
    }

    async createUser(ID, username, phoneNumber) {
        let user = new User(ID, username, phoneNumber,"", -1, -1, -1, -1, -1, -1, -1)
        try {
            let userRef = await this.firestore.collection("users").doc(ID).create(user)
            return response.Success(userRef)
        } catch (e) {
            console.log("error in creating user", e)
            return response.Failure(e)
        }
    }

    async checkJWTToken(token) {
        try {
            val = await admin.auth().verifyIdToken(token)
            return response.Success(val)
        } catch (e) {
            return response.Failure(e)
        }
    }

    async getUserDetails(userID) {
        try {
            let val = await admin.auth().getUser(userID)
            return response.Success(val)
        } catch (e) {
            console.log("error in getting user details", e)
            return response.Failure(e)
        }
    }

    isDoc(path) {
        return path.split('/').length % 2 === 0;
    }

    async get(path) {
        try {
            if (this.isDoc(path)) {
                let doc = this.firestore.doc(path);
                let data = await doc.get();
                return data ?.data() ?? null;
            }
        } catch (ex) {
            console.error(`Error reading doc: ${path}`, ex.message);
        }
        return null;
    }

    async set(path, data) {
        try {
            if (this.isDoc(path)) {
                let doc = this.firestore.doc(path);
                await doc.set(data, {
                    merge: true
                });
                return true;
            }
        } catch (ex) {
            console.error(`Error writing doc: ${path}, data: ${data}`, ex.message);
        }
        return false;
    }

    async update(path, data) {
        try {
            if (this.isDoc(path)) {
                let doc = this.firestore.doc(path);
                await doc.update(data);
                return true;
            }
        } catch (ex) {
            console.error(`Error updating doc: ${path}, data: ${data}`, ex.message);
        }
        return false;
    }

    async del(path) {
        try {
            if (this.isDoc(path)) {
                let doc = this.firestore.doc(path);
                await doc.delete();
                return true;
            }
        } catch (ex) {
            console.error(`Error deleting doc: ${path}`, ex.message);
        }
        return false;
    }
}

module.exports = FirestoreUtils;
