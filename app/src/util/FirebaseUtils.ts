import firebase from 'firebase';
import firebaseConfig from './google-services.json';

class Firebase {
    private static instance: Firebase;

    private auth: firebase.auth.Auth;
    private authListeners: Map<number, (user: firebase.User | null) => void>;
    private unique: number;
    
    private firestore: firebase.firestore.Firestore;

    private constructor() {
        firebase.initializeApp(firebaseConfig);

        this.auth = firebase.auth();
        this.auth.signInWithEmailAndPassword('test@test.in', 'password'); // Todo: remove this line to enable normal login
        this.authListeners = new Map();
        this.unique = 0;
        this.auth.onAuthStateChanged((user) => {
            this.authListeners.forEach((callback, id, map) => {
                try {
                    callback(user);
                } catch (err) {
                    map.delete(id);
                }
            });
        })
        this.firestore = firebase.firestore();
    }

    static getInstance(): Firebase {
        if (this.instance === null || this.instance === undefined) {
            this.instance = new Firebase();
        }
        return this.instance;
    }

    addAuthChangeListener (callback: (user: firebase.User | null) => void): number {
        this.authListeners.set(this.unique, callback);
        return this.unique ++;
    }

    removeAuthChangeListener (listenerId: number) {
        this.authListeners.delete(listenerId);
    }

    getAuth (): firebase.auth.Auth {
        return this.auth;
    }

    getFirestore (): firebase.firestore.Firestore {
        return this.firestore;
    }
}

export default Firebase;
