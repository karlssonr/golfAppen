import React, { createContext, useState, useEffect } from 'react';
import firebase from '../firebase';
import { Alert, Button } from 'react-native';
import { firestore } from 'firebase';
import { set } from 'react-native-reanimated';

export const AuthContext = createContext();
const auth = firebase.auth();
// const currentUser = auth.currentUser;

export default function AuthContextProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      setIsLoading(false);
    });

    return unsubscribe;
  });

  const updateUser = async (nickName, displayName, phoneNumber, golfID) => {
    console.log(nickName);
    console.log(displayName);
    console.log(phoneNumber);
    console.log(golfID);

    const ref = firebase
      .firestore()
      .collection('players')
      .doc(auth.currentUser.uid);

    if (nickName !== null) {
      ref.update({
        nickName: nickName,
        userID: auth.currentUser.uid,
      });
    }

    if (displayName !== null) {
      ref.update({
        name: displayName,
        userID: auth.currentUser.uid,
      });
    }

    if (phoneNumber !== null) {
      ref.update({
        phoneNumber: phoneNumber,
        userID: auth.currentUser.uid,
      });
    }

    if (golfID !== null) {
      ref.update({
        golfID: golfID,
        userID: auth.currentUser.uid,
      });
    }

    // ref.update({
    //   nickName: nickName,
    //   name: displayName,
    //   golfID: golfID,
    //   phoneNumber: phoneNumber,
    //   userID: auth.currentUser.uid,
    // });

    alert('Profil updaterad');
  };

  const resetPassword = async (email) => {
    return auth
      .sendPasswordResetEmail(email)
      .then(function () {
        alert('Password reset email sent.');
      })
      .catch(function (error) {
        alert(error);
        console.log(error.code);
      });
  };

  const signUp = (email, password) => {
    return auth
      .createUserWithEmailAndPassword(email, password)
      .catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode == 'auth/weak-password') {
          alert('The password is too weak.');
        } else {
          alert(errorMessage);
        }
        console.log(error);
      });
  };

  const logIn = async (email, password) => {
    return auth
      .signInWithEmailAndPassword(email, password)
      .catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode === 'auth/wrong-password') {
          alert('Wrong password.');
        } else {
          alert(errorMessage);
        }
        console.log(error);
      });
  };

  const signOut = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.log('error:', error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isLoading,
        user,
        logIn,
        signOut,
        signUp,
        resetPassword,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
