import firebase from 'firebase';
import URLs from '../constants/urls';
import Common from './CommonUtils';
import Firebase from './FirebaseUtils';

class Authentication {
    private firebaseInstance: Firebase;
    private _user: firebase.User | null;
    private _isSignedIn: boolean;
    
    public get currentUser(): firebase.User | null {
        return this._user;
    }
    public get isSignedIn(): boolean {
        return this._isSignedIn;
    }

    constructor() {
        this.firebaseInstance = Firebase.getInstance();
        this.firebaseInstance.addAuthChangeListener(this.changeAuthState);
        this._user = this.firebaseInstance.getAuth().currentUser;
        if (this._user !== null) this._isSignedIn = true;
        else this._isSignedIn = false;
    }

    private changeAuthState (user: firebase.User | null) {
        this._user = user;
        if (user !== null) {
            this._isSignedIn = true;
        } else {
            this._isSignedIn = false;
        }
    }

    async beginPhoneVerification (phoneNumber: string, verifyRef: firebase.auth.ApplicationVerifier): 
        Promise<((verificationCode: string) => Promise<boolean>) | null> {
        try {
            let provider = new firebase.auth.PhoneAuthProvider();
            let verificationId = await provider.verifyPhoneNumber(phoneNumber, verifyRef);
            return this.getVerifyPhoneAuthCallback(verificationId);
        } catch (err) {
            console.error(`Phone auth failed to generate Id`, err);
        }
        return null;
    }

    private getVerifyPhoneAuthCallback(verificationId: string) {
        return async (verificationCode: string): Promise<boolean> => {
            const credentials = firebase.auth.PhoneAuthProvider.credential(
                verificationId,
                verificationCode
            );
            try {
                await Firebase.getInstance().getAuth().signInWithCredential(credentials);
                return true;
            } catch (err: any) {
                console.error(err.message);
                return false;
            }
        }
    }

    signOut () {
        this.firebaseInstance.getAuth().signOut();
    }

    async registerUser (name: string, phoneNumber: string) {
        if (this._user === null || name.trim().length === 0) return false;
        if (this._user.phoneNumber !== '+91' + phoneNumber) return false;
        await this._user.updateProfile({displayName: name});
        
        let headers = new Headers();
        headers.set('X_FIREBASE_TOKEN', await this._user.getIdToken());
        headers.set('X_USER_ID', this._user.uid);
        headers.set('Content-Type', 'application/json');

        let result = await Common.makePostRequest(URLs.createUser,
            {
                username: name,
                phoneNumber: phoneNumber
            },
            headers
        );
        // return JSON.parse(result).result; // TODO: Implement after api return change
        return result === 'user created successfully';
    }

    async isUserRegistered () {
        if (this._user === null) return false;
        let userDoc = this.firebaseInstance.getFirestore().doc(`users/${this._user.uid}`);
        return (await userDoc.get()).exists;
    }
}

export default Authentication;