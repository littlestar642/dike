import firebase from 'firebase';
import URLs from '../constants/urls';
import Common from './CommonUtils';
import Firebase from './FirebaseUtils';

export const AuthState = Object.freeze({
    NOTSIGNEDIN: 0,
    NOTREGISTERED: 1,
    REGISTERED: 2
});

class Authentication {
    private _isUserRegistered: boolean;
    private _unsubscribeDocListener: { (): void; (): void; } | null | undefined;
    private _userRegisterStateUpdateCallback: ((state: number) => void) | undefined | null;

    public set userRegisterStateUpdateCallback(value: ((state: number) => void) | undefined | null) {
        this._userRegisterStateUpdateCallback = value;
    }
    
    public get isSignedIn(): boolean {
        return Firebase.getInstance().getAuth().currentUser !== null;
    }
    public get isUserRegistered(): boolean {
        return this._isUserRegistered;
    }

    constructor(callback?: ((state: number) => void) | null | undefined) {
        this._isUserRegistered = false;
        this._userRegisterStateUpdateCallback = callback;
        Firebase.getInstance().addAuthChangeListener((user) => {this.changeAuthState(user)});
    }

    private async changeAuthState (user: firebase.User | null) {
        if (user !== null && user !== undefined) {
            let userDoc = Firebase.getInstance().getFirestore().doc(`users/${user.uid}`);
            this._isUserRegistered = (await userDoc.get()).exists;
            try {
                if (this._userRegisterStateUpdateCallback !== undefined && this._userRegisterStateUpdateCallback !== null)
                this._userRegisterStateUpdateCallback(this._isUserRegistered ? AuthState.REGISTERED : AuthState.NOTREGISTERED);
                if (!this._isUserRegistered) {
                    this._unsubscribeDocListener = userDoc.onSnapshot((snapshot) => {
                        this._isUserRegistered = snapshot.data() !== undefined;
                        if (this._userRegisterStateUpdateCallback !== undefined && this._userRegisterStateUpdateCallback !== null)
                            this._userRegisterStateUpdateCallback(this._isUserRegistered ? AuthState.REGISTERED : AuthState.NOTREGISTERED);
                    });
                }
            } catch (err) {
                this._userRegisterStateUpdateCallback = null;
                console.error(err)
            }
        } else {
            if (this._unsubscribeDocListener !== undefined && this._unsubscribeDocListener !== null) {
                this._unsubscribeDocListener()
            }
            if (this._userRegisterStateUpdateCallback !== undefined && this._userRegisterStateUpdateCallback !== null)
                this._userRegisterStateUpdateCallback(AuthState.NOTSIGNEDIN);
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
}

export default Authentication;