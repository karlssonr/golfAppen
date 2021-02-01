import React, { createContext, useState, useEffect } from "react";
import firebase from "../firebase";
import { Alert } from "react-native";

export const PlayerContext = createContext();

export default function PlayerContextProvider({ children }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState();
    const [isLoading, setIsLoading] = useState(true);
  
    useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged((user) => {
        console.log("user: ", user);
        setUser(user);
        setIsLoading(false);
      });
  
      return unsubscribe;
    });
  
    const updateUser = (displayName, phoneNumber, id) => {
      const number = "123145123";
  
      user
        .updateProfile({
          displayName: displayName,
          phoneNumber: number,
          uid: id,
          photoURL: "https://example.com/jane-q-user/profile.jpg",
        })
        .then(function () {
          alert("Update succesfull");
          console.log("update succesfull: ", user);
        })
        .catch(function (error) {
          alert(error);
          console.log("updateUserError: ", error);
        });
    };
  
    const resetPassword = async (email) => {
      return auth
        .sendPasswordResetEmail(email)
        .then(function () {
          alert("Password reset email sent.");
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
          if (errorCode == "auth/weak-password") {
            alert("The password is too weak.");
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
          if (errorCode === "auth/wrong-password") {
            alert("Wrong password.");
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
        console.log("error:", error);
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
  