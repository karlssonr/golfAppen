import React from 'react';
import { useState, useContext } from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import Splash from './Splash';
import Theme from '../theme/theme';

export default function LogIn({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { setIsLoggedIn, logIn } = useContext(AuthContext);

  const submit = async () => {
    try {
      setError('');
      setLoading(true);
      logIn(email, password);
      console.log('submitting sign up');
    } catch {
      setError('Failed reset password');
      console.log(error);
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
          fontWeight: 'bold',
          fontSize: 24,
          marginBottom: 10,
          color: Theme.orange,
          fontFamily: Theme.fontFamilyText,
        }}
      ></Text>
      <View style={{ width: '50%' }}>
        <Text style={styles.text}>Email</Text>
        <TextInput
          autoCorrect={true}
          placeholder="Enter email"
          value={email}
          onChangeText={setEmail}
          style={{
            backgroundColor: 'lightgrey',
            padding: 10,
            borderRadius: 5,
            marginBottom: 10,
          }}
          autoCapitalize="none"
        />
        <Text style={styles.text}>Lösenord</Text>
        <TextInput
          placeholder="Enter password"
          value={password}
          onChangeText={setPassword}
          style={{ backgroundColor: 'lightgrey', padding: 10, borderRadius: 5 }}
          autoCapitalize="none"
          secureTextEntry={true}
        />
        <Button
          title="Logga In"
          onPress={submit}
          color={Theme.orange}
          style={styles.button}
        />
        <Button
          title="Skapa Konto"
          onPress={() => navigation.navigate('SignUpScreen')}
          color={Theme.orange}
          style={styles.button}
        />

        <Button
          title="Glömt lösenord?"
          onPress={() => navigation.navigate('ForgotPasswordScreen')}
          color={Theme.orange}
          style={styles.button}
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
});
