import React, { useEffect } from "react";
import { useState, useContext } from "react";
import { StyleSheet, Text, View, Button, TextInput, Alert } from "react-native";
import { AuthContext } from "../context/AuthContext";
import Splash from "./Splash";
import Theme from '../theme/Theme'

export default function ForgotPasswordScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  

  const { resetPassword } = useContext(AuthContext);


  const submit = async () => {


    try {
      setError("");
      setLoading(true);
      resetPassword(email)
      console.log("submitting sign up");
    } catch  {
        setError("Failed reset password");
        console.log(error);
      
    }

    setLoading(false);
  };

  if (loading) {
      return <Splash/>
  }

  return (
    <View style={styles.container}>
      <Text
        style={{
          fontWeight: "bold",
          fontSize: 24,
          marginBottom: 10,
          color: Theme.orange,
          fontFamily: Theme.fontFamilyText
        }}
      ></Text>
      <View style={{ width: "50%" }}>
        <Text style={{ fontWeight: "600", fontSize: 16, color: Theme.orange, fontFamily: Theme.fontFamilyText }}>
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
    
   

        <Button
          title="Återställ lösenord"
          color={Theme.orange}
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
