import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Keyboard,
  Platform,
  Button,
} from 'react-native';
// import firestore from '@react-native-firebase/firestore';
import firebase from '../firebase';
import Theme from '../theme/theme';
import Separator from '../components/Separator';

export default function CreateChatRoom({ navigation }) {
  // ... rest remains same
  const [roomName, setRoomName] = useState('');
  function handleButtonPress() {
    if (roomName.length > 0) {
      // create new thread using firebase & firestore
      firebase
        .firestore()
        .collection('MESSAGE_THREADS')
        .add({
          name: roomName,
          latestMessage: {
            text: `${roomName} created. Welcome!`,
            createdAt: new Date().getTime(),
          },
        })
        .then((docRef) => {
          docRef.collection('MESSAGES').add({
            text: `${roomName} created. Welcome!`,
            createdAt: new Date().getTime(),
            system: true,
          });
          navigation.navigate('ChatRoom');
        });
    }
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <View style={{ width: '50%' }}>
            {/* <Text style={styles.text}>Alias</Text> */}
            <TextInput
              placeholder="Namn på chatt"
              value={roomName}
              onChangeText={setRoomName}
              style={styles.textInput}
              autoCapitalize="none"
              autoCorrect={false}
            />

            <View style={{ marginTop: 30 }}>
              <Button
                title="Skapa chatt"
                color={Theme.colors.orange}
                style={styles.button}
                onPress={handleButtonPress}
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
