import app from "firebase/app";

// Add the Firebase products that you want to use
import "firebase/firestore";
import "firebase/auth";

// TODO: Replace the following with your app's Firebase project configuration
const config = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "sample-e057a.firebaseapp.com",
  databaseURL: "https://sample-e057a.firebaseio.com",
  projectId: "sample-e057a",
  storageBucket: "sample-e057a.appspot.com",
  messagingSenderId: "1026206767527",
  appId: "1:1026206767527:web:5696e21de7661aba037e82",
};

// Initialize Firebase
class Firebase {
  constructor() {
    app.initializeApp(config);
    this.auth = app.auth();
    this.db = app.firestore();
  }

  login(email, password) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  logout() {
    return this.auth.signOut();
  }

  async register(name, email, password) {
    await this.auth.createUserWithEmailAndPassword(email, password);
    return this.auth.currentUser.updateProfile({
      displayName: name,
    });
  }
  addQuote(quote) {
    if (!this.auth.currentUser) {
      return alert("Not authorized");
    }

    return this.db
      .doc(`users_codedamn_video/${this.auth.currentUser.uid}`)
      .set({
        quote,
      });
  }

  isInitialized() {
    return new Promise((resolve) => {
      this.auth.onAuthStateChanged(resolve);
    });
  }

  getCurrentUsername() {
    return this.auth.currentUser && this.auth.currentUser.displayName;
  }

  async getCurrentUserQuote() {
    const quote = await this.db
      .doc(`users_codedamn_video/${this.auth.currentUser.uid}`)
      .get();
    return quote.get("quote");
  }
}
export default new Firebase();
