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
  const [displayName, setDisplayName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [golfUserID, setGolfUserID] = useState('');
  const [loading, setLoading] = useState(false);

  const { setIsLoggedIn, updateUser } = useContext(AuthContext);

  const submit = async () => {
    try {
      setLoading(true);
      updateUser(displayName, phoneNumber, golfUserID);
      console.log('submitting sign up');
    } catch (er) {
      Alert.alert(er);
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
            <Text style={styles.text}>Namn</Text>
            <TextInput
              placeholder="Ange namn"
              value={displayName}
              onChangeText={setDisplayName}
              style={styles.textInput}
              autoCapitalize="none"
              autoCorrect={false}
            />
            <Text style={styles.text}>Telefonummer</Text>
            <TextInput
              placeholder="Ange telefonummer"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              style={styles.textInput}
              autoCapitalize="none"
            />
            <Text style={styles.text}>Golf ID</Text>
            <TextInput
              placeholder="Ange golf ID"
              value={golfUserID}
              onChangeText={setGolfUserID}
              style={{
                backgroundColor: 'lightgrey',
                padding: 10,
                borderRadius: 5,
              }}
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
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
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
