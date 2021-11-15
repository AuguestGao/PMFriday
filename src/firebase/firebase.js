import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const config = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

firebase.initializeApp(config);
firebase.firestore().settings({ timestampesInSnapshots: true });

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userDocRef = firestore.doc(`users/${userAuth.uid}`);
  const userDocSnapshot = await userDocRef.get();

  if (!userDocSnapshot.exists) {
    const { email } = userAuth;
    const createdAt = new Date().toISOString();

    try {
      await userDocRef.set({
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      if (process.env.NODE_ENV === "development") {
        console.error(error.message);
      }
    }
  }
  return userDocRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export default firebase;
