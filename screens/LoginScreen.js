import React from 'react';
import { useState, useContext } from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import { AuthContext } from '../context/AuthContext';

export default function LogIn({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { setIsLoggedIn, logIn } = useContext(AuthContext);

  const submit = () => {

    console.log('submitting log in');
    logIn(email, password);
  };

  return (
    <View style={styles.container}>
      <Text style={{ fontWeight: 'bold', fontSize: 24, marginBottom: 10 , color: '#ff4500'}}>
        
      </Text>
      <View style={{ width: '50%' }}>
        <Text style={{ fontWeight: '600', fontSize: 16 , color: '#ff4500' }}>Email</Text>
        <TextInput
          placeholder="Enter email"
          value={email}
          onChangeText={setEmail}
          style={{
            backgroundColor: 'lightgrey',
            padding: 10,
            borderRadius: 5,
            marginBottom: 10,
          }}
        />
        <Text style={{ fontWeight: '600', fontSize: 16 , color: '#ff4500'}}>Lösenord</Text>
        <TextInput
          placeholder="Enter password"
          value={password}
          onChangeText={setPassword}
          style={{ backgroundColor: 'lightgrey', padding: 10, borderRadius: 5 }}
        />
        <Button title="Logga In" onPress={submit}  color='#ff4500' style={styles.button}/>
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
      
  }
});
