import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyCW8AU9S540rEXqYHMkRgj5z2K0ps24M44",
  authDomain: "crwn-clothing-6a9a0.firebaseapp.com",
  projectId: "crwn-clothing-6a9a0",
  storageBucket: "crwn-clothing-6a9a0.appspot.com",
  messagingSenderId: "768808515589",
  appId: "1:768808515589:web:519db7456bb7fc7bcec46c",
  measurementId: "G-J5FT8ZJRNV",
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;