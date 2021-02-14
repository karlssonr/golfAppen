import React from 'react';

import { useState, useContext } from 'react';
import { StyleSheet, Text, View, Button, TextInput, Alert } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import Splash from './Splash';
import Theme from '../theme/theme';

export default function SignUpScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { setIsLoggedIn, signUp } = useContext(AuthContext);

  //   useEffect(() => {
  //     console.log("error: ", error);

  //   }, [error])

  const submit = async () => {
    if (password !== confirmPassword) {
      setError('Password do not match');
      Alert.alert(error);

      return;
    }

    try {
      setError('');
      setLoading(true);
      signUp(email, password);
      console.log('submitting sign up');
    } catch {
      setError('Failed to create an account');
      Alert.alert(error);
    }

    setLoading(false);
  };

  if (loading) {
    return <Splash />;
  }

  return (
    <View style={styles.container}>
      <View style={{ width: '50%' }}>
        <Text style={styles.text}>Email</Text>
        <TextInput
          placeholder="Ange emailadress"
          value={email}
          onChangeText={setEmail}
          style={styles.textInput}
          autoCapitalize="none"
          autoCorrect={false}
        />
        <Text style={styles.text}>Lösenord</Text>
        <TextInput
          placeholder="Ange lösenord"
          value={password}
          onChangeText={setPassword}
          style={styles.textInput}
          autoCapitalize="none"
          textContentType="password"
          secureTextEntry={true}
        />
        <Text style={styles.text}>Bekräfta lösenord</Text>
        <TextInput
          placeholder="Bekräfta lösenord"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          style={{ backgroundColor: 'lightgrey', padding: 10, borderRadius: 5 }}
          autoCapitalize="none"
          secureTextEntry={true}
          textContentType="password"
        />

        <Button
          title="Skapa Konto"
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
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    marginTop: 50,
  },
  text: {
    fontWeight: '600',
    fontSize: 16,
    color: Theme.orange,
    fontFamily: Theme.fontFamilyText,
  },
  textInput: {
    backgroundColor: 'lightgrey',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
});
