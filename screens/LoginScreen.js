import React from 'react';
import { useState, useContext } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  Platform,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Keyboard,
} from 'react-native';
import { AuthContext } from '../context/AuthContext';
import Splash from './Splash';
import Theme from '../theme/theme';

export default function LogIn({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { logIn } = useContext(AuthContext);

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
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <View style={{ width: '50%' }}>
            <Text style={styles.text}>Email</Text>
            <TextInput
              autoCorrect={true}
              placeholder="Enter email"
              value={email}
              onChangeText={setEmail}
              style={{ ...styles.textInput, marginBottom: 10 }}
              autoCapitalize="none"
            />
            <Text style={styles.text}>Password</Text>
            <TextInput
              placeholder="Enter password"
              value={password}
              onChangeText={setPassword}
              style={styles.textInput}
              autoCapitalize="none"
              secureTextEntry={true}
            />
            <View style={{ marginTop: 30 }}>
              <View
              // style={{ margin: 5 }}
              >
                <Button
                  title="Log in"
                  onPress={submit}
                  color={Theme.colors.orange}
                  style={styles.button}
                />
              </View>
              <View
              // style={{ margin: 5 }}
              >
                <Button
                  title="Create account"
                  onPress={() => navigation.navigate('SignUpScreen')}
                  color={Theme.colors.orange}
                  style={styles.button}
                />
              </View>
              <View
              // style={{ margin: 5 }}
              >
                <Button
                  title="Forgot password?"
                  onPress={() => navigation.navigate('ForgotPasswordScreen')}
                  color={Theme.colors.orange}
                  style={styles.button}
                />
              </View>
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
    margin: 0,
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
  },
});
