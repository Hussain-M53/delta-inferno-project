import { auth } from './firebase_options';
import { signOut, signInWithRedirect, onAuthStateChanged, GoogleAuthProvider, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

export const signInWithEmailAndPass = async ({ email, password }) => {
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
    const user = userCredential.user;

    await updateProfile(user, {
      displayName: userName,
    });
    return user;

  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    alert(`Error In Signing Up: ${errorCode} ${errorMessage}`);
  }
}

export const signInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithRedirect(auth, provider)
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
    await signOut(auth);
    return true
  }
  catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    alert(errorMessage)
    return false
  }
}

export const checkUserAuthentication = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      unsubscribe();
      if (user) {
        resolve(user);
      } else {
        resolve(null);
      }
    });
  });
};
