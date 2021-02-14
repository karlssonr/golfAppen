import React from 'react';
import { useState, useContext } from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import Splash from './Splash';
import Theme from '../theme/theme';

export default function ForgotPasswordScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { resetPassword } = useContext(AuthContext);

  const submit = async () => {
    try {
      setError('');
      setLoading(true);
      resetPassword(email);
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
      <Text style={styles.text}></Text>
      <View style={{ width: '50%' }}>
        <Text style={styles.text}>Email</Text>
        <TextInput
          placeholder="Ange emailadress"
          value={email}
          onChangeText={setEmail}
          style={styles.textImputEmail}
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
  textImputEmail: {
    backgroundColor: 'lightgrey',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
});
