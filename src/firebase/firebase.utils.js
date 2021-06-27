import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyC6Zot4Wn5zRWSiX4NnsWtRoTNot5SmOo8",
    authDomain: "crwn-db-subhod43.firebaseapp.com",
    projectId: "crwn-db-subhod43",
    storageBucket: "crwn-db-subhod43.appspot.com",
    messagingSenderId: "665387019809",
    appId: "1:665387019809:web:fee8ef374772e267d3bd60",
    measurementId: "G-M7G1KC0TF7"
  };

  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({prompt: 'select_account'});
  export const signInWithGoogle = () => auth.signInWithPopup(provider);

  export const createUserProfile = async (userAuth, additionalData) => {
    if(!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapShot = await userRef.get();

    if(!snapShot.exists) {
      const {displayName, email} = userAuth;
      const createdAt = new Date();

      try {
        await userRef.set({
          displayName,
          email,
          createdAt
        })
      } catch(error) {
        console.log('error creating user :', error.message);
      }
    }
    return userRef;
  }

  export default firebase;
