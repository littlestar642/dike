import firebase from 'firebase';
import firebaseConfig from '../../google-services.json';

class Firebase {
  private static instance: Firebase;

  private auth: firebase.auth.Auth;
  private authListeners: Array<(user: firebase.User | null) => void>;

  private firestore: firebase.firestore.Firestore;

  constructor() {
    firebase.initializeApp(firebaseConfig);

    this.auth = firebase.auth();
    this.authListeners = [];
    this.auth.onAuthStateChanged((user) => {
      this.authListeners.forEach(callback => {
        callback(user);
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

  addAuthChangeListener (callback: (user: firebase.User | null) => void): void {
    this.authListeners.push(callback);
  }

  async createUser (email: string, password: string): Promise<firebase.auth.UserCredential | null> {
    try {
      return await this.auth.createUserWithEmailAndPassword(email, password);
    } catch (err) {
      console.error(`User with email ${email} already exists!`);
    }
    return null;
  }

  async login (email: string, password: string): Promise<firebase.auth.UserCredential | null> {
    try {
      return await this.auth.signInWithEmailAndPassword(email, password);
    } catch (err) {
      console.error(`Login fail! Invalid email or password`);
    }
    return null;
  }

  getFirestore (): firebase.firestore.Firestore {
    return this.firestore;
  }
}

export default Firebase;
