import React from 'react';

import { useState, useContext } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  Alert,
  Platform,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Keyboard,
} from 'react-native';
import { AuthContext } from '../context/AuthContext';
import Splash from './Splash';
import Theme from '../theme/theme';

export default function SignUpScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { signUp, createUser } = useContext(AuthContext);

  const submit = async () => {
    try {
      setError('');
      setLoading(true);
      await signUp(email, password);
      await createUser();
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
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <View style={{ width: '50%' }}>
            <Text style={styles.text}>Email</Text>
            <TextInput
              placeholder="Enter email"
              value={email}
              onChangeText={setEmail}
              style={styles.textInput}
              autoCapitalize="none"
              autoCorrect={false}
            />
            <Text style={styles.text}>Password</Text>
            <TextInput
              placeholder="Enter password"
              value={password}
              onChangeText={setPassword}
              style={styles.textInput}
              autoCapitalize="none"
              textContentType="password"
              secureTextEntry={true}
            />
            {/* <Text style={styles.text}>Bekräfta lösenord</Text>
            <TextInput
              placeholder="Bekräfta lösenord"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              style={{
                backgroundColor: 'lightgrey',
                padding: 10,
                borderRadius: 5,
              }}
              autoCapitalize="none"
              secureTextEntry={true}
              textContentType="password"
            /> */}

            <View style={{ marginTop: 30 }}>
              <Button
                title="Create account"
                color={Theme.colors.orange}
                style={styles.button}
                disabled={loading}
                onPress={submit}
              />
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.black,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    marginTop: 50,
  },
  text: {
    fontWeight: '600',
    fontSize: Theme.fontSize.formText,
    color: Theme.colors.orange,
    fontFamily: Theme.fontFamilyText,
  },
  textInput: {
    backgroundColor: Theme.colors.lightGrey,
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
});
