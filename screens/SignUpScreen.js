import React, { useEffect } from "react";
// import { Alert } from 'react-bootstrap'
import { useState, useContext } from "react";
import { StyleSheet, Text, View, Button, TextInput, Alert } from "react-native";
import { AuthContext } from "../context/AuthContext";
import Splash from "./Splash";

export default function SignUpScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [secureTextEntry, setSecureTextEntry] = useState(false);

  const { setIsLoggedIn, signUp } = useContext(AuthContext);

  //   useEffect(() => {
  //     console.log("error: ", error);

  //   }, [error])

  const submit = async () => {
    if (password !== confirmPassword) {
      setError("Password do not match");
      Alert.alert(error);

      return;
    }

    try {
      setError("");
      setLoading(true);
      signUp(email, password);
      console.log("submitting sign up");
    } catch {
      setError("Failed to create an account");
      Alert.alert(error);
    }

    setLoading(false);
  };

  if (loading) {
      return <Splash />
  }

  return (
 
    <View style={styles.container}>
      <Text
        style={{
          fontWeight: "bold",
          fontSize: 24,
          marginBottom: 10,
          color: "#ff4500",
        }}
      ></Text>
      <View style={{ width: "50%" }}>
        <Text style={{ fontWeight: "600", fontSize: 16, color: "#ff4500" }}>
          Email
        </Text>
        <TextInput
          placeholder="Ange emailadress"
          value={email}
          onChangeText={setEmail}
          style={{
            backgroundColor: "lightgrey",
            padding: 10,
            borderRadius: 5,
            marginBottom: 10,
          }}
          autoCapitalize="none"
          autoCorrect={false}
        />
        <Text style={{ fontWeight: "600", fontSize: 16, color: "#ff4500" }}>
          Lösenord
        </Text>
        <TextInput
          placeholder="Ange lösenord"
          value={password}
          onChangeText={setPassword}
          style={{
            backgroundColor: "lightgrey",
            padding: 10,
            borderRadius: 5,
            marginBottom: 10,
          }}
          autoCapitalize="none"
          textContentType="password"
          secureTextEntry={true}
    
        />
        <Text style={{ fontWeight: "600", fontSize: 16, color: "#ff4500" }}>
          Bekräfta lösenord
        </Text>
        <TextInput
          placeholder="Bekräfta lösenord"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          style={{ backgroundColor: "lightgrey", padding: 10, borderRadius: 5 }}
          autoCapitalize="none"
          secureTextEntry={true}
          textContentType="password"
       
        />

        <Button
          title="Skapa Konto"
          color="#ff4500"
          style={styles.button}
          disabled={loading}
          onPress={submit}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    marginTop: 50,
  },
});
