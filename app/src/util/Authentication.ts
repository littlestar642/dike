import firebase from 'firebase';
import Firebase from './FirebaseUtils';

class Authentication {
    private firebaseInstance: Firebase;
    private _user: firebase.User | null = null;
    private _isSignedIn: boolean = false;
    
    public get currentUser(): firebase.User | null {
        return this._user;
    }
    public get isSignedIn(): boolean {
        return this._isSignedIn;
    }

    constructor() {
        this.firebaseInstance = Firebase.getInstance();
        this.firebaseInstance.addAuthChangeListener(this.changeAuthState);
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
}

export default Authentication;