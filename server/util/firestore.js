var admin = require("firebase-admin");
const fs = require("fs");
const cfg = require("./config")

class FirestoreUtils {
    static instance;
    firestore;

    constructor () {
        let adminConfig = cfg.getFirebaseAdminConfig()
        admin.initializeApp({
            credential: admin.credential.cert(adminConfig)
        });
        this.firestore = admin.firestore();
    }

    static GetInstance () {
        if (FirestoreUtils.instance === null || FirestoreUtils.instance === undefined) {
            FirestoreUtils.instance = new FirestoreUtils();
        }
        return FirestoreUtils.instance;
    }

    isDoc (path) {
        return path.split('/').length % 2 === 0;
    }

    async get (path) {
        try {
            if (this.isDoc(path)) {
                let doc = this.firestore.doc(path);
                let data = await doc.get();
                return data?.data() ?? null;
            }
        } catch (ex) {
            console.error(`Error reading doc: ${path}`, ex.message);
        }
        return null;
    }

    async set (path, data) {
        try {
            if (this.isDoc(path)) {
                let doc = this.firestore.doc(path);
                await doc.set(data, {merge: true});
                return true;
            }
        } catch (ex) {
            console.error(`Error writing doc: ${path}, data: ${data}`, ex.message);
        }
        return false;
    }

    async update (path, data){
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

    async del (path) {
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

module.exports= FirestoreUtils;