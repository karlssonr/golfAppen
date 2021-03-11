import React, { useState, useEffect } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import firebase from '../firebase';

export default function Messages({ route }) {
  const { thread } = route.params;
  const user = firebase.auth().currentUser;

  //   console.log('user: ', route);

  const [messages, setMessages] = useState([
    {
      _id: 0,
      text: 'thread created',
      createdAt: new Date().getTime(),
      system: true,
    },
    {
      _id: 1,
      text: 'hello!',
      createdAt: new Date().getTime(),
      user: {
        _id: 2,
        name: 'Demo',
      },
    },
  ]);

  useEffect(() => {
    const unsubscribeListener = firebase
      .firestore()
      .collection('MESSAGE_THREADS')
      .doc(thread._id)
      .collection('MESSAGES')
      .orderBy('createdAt', 'desc')
      .onSnapshot((querySnapshot) => {
        const messagesSnapshot = querySnapshot.docs.map((doc) => {
          const firebaseData = doc.data();

          const data = {
            _id: doc.id,
            text: '',
            createdAt: new Date().getTime(),
            ...firebaseData,
          };

          if (!firebaseData.system) {
            data.user = {
              ...firebaseData.user,
              name: firebaseData.user.displayName,
            };
          }

          return data;
        });

        setMessages(messagesSnapshot);
      });

    return () => unsubscribeListener();
  }, []);

  console.log('messages: ', messages);

  async function handleSend(newMessage = []) {
    const text = messages[0].text;
    await firebase
      .firestore()
      .collection('MESSAGE_THREADS')
      .doc(thread._id)
      .collection('MESSAGES')
      .add({
        text,
        createdAt: new Date().getTime(),
        user: {
          _id: user.uid,
          displayName: user.displayName,
        },
      });

    await firebase
      .firestore()
      .collection('MESSAGE_THREADS')
      .doc(thread._id)
      .set(
        {
          latestMessage: {
            text,
            createdAt: new Date().getTime(),
          },
        },
        { merge: true }
      );

    setMessages(GiftedChat.append(messages, newMessage));
  }

  return (
    <GiftedChat
      messages={messages}
      onSend={(newMessage) => handleSend(newMessage)}
      user={{
        _id: user.uid,
      }}
    />
  );
}
