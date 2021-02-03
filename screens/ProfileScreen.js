import React, { useEffect } from "react";
import { useState, useContext } from "react";
import { StyleSheet, Text, View, Button, TextInput, Alert } from "react-native";
import { AuthContext } from "../context/AuthContext";
import Splash from "./Splash";
import Theme from "../theme/Theme";

export default function SignUpScreen({ navigation }) {
  const [displayName, setDisplayName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [userId, setUserId] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { setIsLoggedIn, updateUser } = useContext(AuthContext);

  const submit = async () => {
    try {
      setError("");
      setLoading(true);
      updateUser(displayName, phoneNumber, userId);
      console.log("submitting sign up");
    } catch (er) {
      setError("Failed to create an account");
      Alert.alert(er);
    }

    setLoading(false);
  };

  if (loading) {
    return <Splash />;
  }

  return (
    <View style={styles.container}>
      <Text
        style={{
          fontWeight: "bold",
          fontSize: 24,
          marginBottom: 10,
          color: Theme.orange,
          fontFamily: Theme.fontFamilyText,
        }}
      ></Text>
      <View style={{ width: "50%" }}>
        <Text
          style={styles.text}
        >
          Namn
        </Text>
        <TextInput
          placeholder="Ange namn"
          value={displayName}
          onChangeText={setDisplayName}
          style={{
            backgroundColor: "lightgrey",
            padding: 10,
            borderRadius: 5,
            marginBottom: 10,
          }}
          autoCapitalize="none"
          autoCorrect={false}
        />
        <Text style={styles.text}>Telefonummer</Text>
        <TextInput
          placeholder="Ange telefonummer"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          style={{
            backgroundColor: "lightgrey",
            padding: 10,
            borderRadius: 5,
            marginBottom: 10,
          }}
          autoCapitalize="none"
        />
        <Text style={styles.text}>
          Golf ID
        </Text>
        <TextInput
          placeholder="Ange ID"
          value={userId}
          onChangeText={setUserId}
          style={{ backgroundColor: "lightgrey", padding: 10, borderRadius: 5 }}
          autoCapitalize="none"
        />

        <Button
          title="Updatera Profil"
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
  text: {
    fontWeight: "600",
    fontSize: 16,
    color: Theme.orange,
    fontFamily: Theme.fontFamilyText,
  },
});
