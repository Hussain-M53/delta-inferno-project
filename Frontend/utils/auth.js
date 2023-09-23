import { auth } from './firebase_options';
import { signInWithPopup, signOut, onAuthStateChanged, GoogleAuthProvider, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";

export const signInWithEmailAndPass = async ({ userName, email, password }) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential;
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    alert(`Error In logging in: ${errorCode} ${errorMessage}`);
  }
};

export const createUser = async ({ userName, email, password }) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return userCredential;
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    alert(`Error In Signing Up: ${errorCode} ${errorMessage}`);
  }
}

export const signInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider)
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    const user = result.user;
    return user;
  }
  catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    alert(errorCode, errorMessage)
  }
}

export const logOff = async () => {
  try {
    const result = await signOut();
    alert('signed out successfully')
    return result
  }
  catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    alert(errorCode, errorMessage)
  }
}

export const checkUserAuthentication = async () => {
  const result = onAuthStateChanged(auth, (user) => {
    if (user) {
      return true;
    } else {
      return false;
    }
  });
  return result;
}
