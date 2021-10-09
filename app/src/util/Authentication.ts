import firebase from 'firebase';
import URLs from '../constants/urls';
import Common from './CommonUtils';
import Firebase from './FirebaseUtils';

export const AuthState = Object.freeze({
    NOTSIGNEDIN: 0,
    NOTREGISTERED: 1,
    REGISTERED: 2,
    CONSENTPROVIDED: 3
});

class Authentication {
    private userAuthState: number | undefined;
    private _unsubscribeDocListener: { (): void; } | null | undefined;
    private _userRegisterStateUpdateCallback: ((state: number) => void) | undefined | null;
    private authListenerId: number;

    public set userRegisterStateUpdateCallback(value: ((state: number) => void) | undefined | null) {
        this._userRegisterStateUpdateCallback = value;
        this.changeAuthState(Firebase.getInstance().getAuth().currentUser);
    }
    
    public get isSignedIn(): boolean {
        return (this.userAuthState || 0) >= AuthState.NOTREGISTERED;
    }
    public get isUserRegistered(): boolean {
        return (this.userAuthState || 0) >= AuthState.REGISTERED;
    }

    constructor(callback?: ((state: number) => void) | null | undefined) {
        this._userRegisterStateUpdateCallback = callback;
        this.authListenerId = Firebase.getInstance().addAuthChangeListener((user) => {this.changeAuthState(user)});
        this.changeAuthState(Firebase.getInstance().getAuth().currentUser);
    }

    public releaseInstance() {
        Firebase.getInstance().removeAuthChangeListener(this.authListenerId);
        this._userRegisterStateUpdateCallback = null;
    }

    private async changeAuthState (user: firebase.User | null) {
        let authState = AuthState.NOTSIGNEDIN;
        if (user !== null && user !== undefined) {
            authState = AuthState.NOTREGISTERED
            let userDoc = Firebase.getInstance().getFirestore().doc(`users/${user.uid}`);
            let userData = await userDoc.get();
            authState = userData.exists ? (userData.data()?.FIDataConsentStatus === 1 ? AuthState.CONSENTPROVIDED : AuthState.REGISTERED) : authState;
            try {
                if (authState === AuthState.NOTREGISTERED || authState === AuthState.REGISTERED) {
                    this._unsubscribeDocListener = userDoc.onSnapshot((snapshot) => {
                        let authState = AuthState.NOTREGISTERED;
                        let data = snapshot.data();
                        if (data !== undefined) {
                            authState = AuthState.REGISTERED;
                            if (data.FIDataConsentStatus === 1) authState = AuthState.CONSENTPROVIDED
                        }
                        this.broadcastAuthState(authState);
                    });
                }
            } catch (err) {
                this._userRegisterStateUpdateCallback = null;
                console.error(err)
            }
        }
        this.broadcastAuthState(authState);
    }
    
    private broadcastAuthState (state: number) {
        if (state === AuthState.CONSENTPROVIDED && this._unsubscribeDocListener !== undefined && this._unsubscribeDocListener !== null)
            this._unsubscribeDocListener();
        if (this.userAuthState !== state && this._userRegisterStateUpdateCallback !== undefined && this._userRegisterStateUpdateCallback !== null)
            this._userRegisterStateUpdateCallback(state);
        this.userAuthState = state;
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
        Firebase.getInstance().getAuth().signOut();
    }

    async registerUser (name: string, phoneNumber: string) {
        let user = Firebase.getInstance().getAuth().currentUser;
        if (user === null || name.trim().length === 0) return false;
        if (user.phoneNumber !== '+91' + phoneNumber) return false;
        await user.updateProfile({displayName: name});
        
        let headers = new Headers();
        let token = await user.getIdToken();
        headers.set('X_FIREBASE_TOKEN', token);
        let uid = user.uid;
        headers.set('X_USER_ID', uid);
        headers.set('Content-Type', 'application/json');
        // console.log(`Token: ${token}`, `Uid: ${uid}`);

        let result = await Common.makeApiRequest('POST', URLs.createUser,
            headers,
            {
                username: name,
                phoneNumber: phoneNumber
            }
        );
        return JSON.parse(result).success; // TODO: Implement after api return change
        // return result === 'user created successfully';
    }

    async getConsent (): Promise<string> {
        let user = Firebase.getInstance().getAuth().currentUser;
        if (user === null) return "";
        
        let headers = new Headers();
        let token = await user.getIdToken();
        headers.set('X_FIREBASE_TOKEN', token);
        let uid = user.uid;
        headers.set('X_USER_ID', uid);
        headers.set('Content-Type', 'application/json');
        // console.log(`Token: ${token}`, `Uid: ${uid}`);

        let phoneNumber = user.phoneNumber?.substr(3, 10);
        let response = await Common.makeApiRequest('GET', URLs.getConsent + phoneNumber, headers);
        let result = JSON.parse(response);
        if (result.success)
        {
            return result.msg;
        }
        return '';
    }
}

export default Authentication;