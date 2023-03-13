import firebase from "firebase/compat/app";
import 'firebase/compat/auth';
// import { getStorage } from "firebase/storage";

/**
 * Firebase configuration object containing keys and identifiers for your app
 * that we copied from our app's Firebase config object
 */
export const auth = firebase.initializeApp ({
  apiKey: "AIzaSyD-Uf-smOYfAeLlWhyVGAu1h_P-AXCBxpo",
    authDomain: "chatapp-7eff4.firebaseapp.com",
    projectId: "chatapp-7eff4",
    storageBucket: "chatapp-7eff4.appspot.com",
    messagingSenderId: "623040292117",
    appId: "1:623040292117:web:a71c5b66e6305130b2b51c"
}).auth();

// export const storage = getStorage();
