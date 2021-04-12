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
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <Text style={styles.text}></Text>
          <View style={{ width: '50%' }}>
            <Text style={styles.text}>Email</Text>
            <TextInput
              placeholder="Enter email"
              value={email}
              onChangeText={setEmail}
              style={styles.textImputEmail}
              autoCapitalize="none"
              autoCorrect={false}
            />

            <View style={{ marginTop: 30 }}>
              <Button
                title="Reset password"
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
    fontFamily: Theme.fontFamily.fontFamilyText,
  },
  textImputEmail: {
    backgroundColor: Theme.colors.lightGrey,
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
});
