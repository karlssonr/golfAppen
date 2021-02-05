import React, { useContext } from 'react';
import { StyleSheet, Text, View, Button, ImageBackground } from 'react-native';
import ButtonWithBackround from '../components/HomeScreenButton';
import { AuthContext } from '../context/AuthContext';
import Theme from '../theme/Theme';

const HomeScreen = ({ navigation }) => {
  const { setIsLoggedIn, signOut } = useContext(AuthContext);

  const submit = () => {
    signOut();
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/image8.png')}
        style={{ width: '100%', height: undefined, aspectRatio: 1 }}
      >
        <Text style={styles.header}>KGHIO 2021</Text>
      </ImageBackground>

      <View style={styles.homeView}>
        <ButtonWithBackround
          text="Registrera Resultat"
          color={Theme.orange}
          width={300}
          padding={12}
          zIndex={400}
          onPress={() => {
            console.log('button was pressed');
            // navigation.setOptions({ title: 'Registrera Resultat'})
            navigation.navigate('RegisterResultScreen');
          }}
        />
        <ButtonWithBackround
          text="Tabell"
          color={Theme.orange}
          width={300}
          padding={12}
          zIndex={400}
          onPress={() => navigation.navigate('ChartListScreen')}
        />
        <ButtonWithBackround
          text="Profil"
          color={Theme.orange}
          width={300}
          padding={12}
          zIndex={400}
          onPress={() => navigation.navigate('ProfileScreen')}
        />
        <ButtonWithBackround
          text="Statestik"
          color={Theme.darkOrange}
          width={300}
          zIndex={400}
          padding={12}
        />
        <ButtonWithBackround
          text="Medlemmar"
          color={Theme.orange}
          marginBottom={60}
          width={300}
          padding={12}
          onPress={() => navigation.navigate('MemberScreen')}
        />

        <Button
          style={{}}
          title="Logga Ut"
          onPress={submit}
          color={Theme.orange}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  imageBackgroundStyle: {
    width: '100%',
    height: '80%',
    aspectRatio: 1,
  },

  container: {
    flex: 1,
    backgroundColor: 'black',
    //alignItems: "center",
    justifyContent: 'flex-start',
  },
  homeView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: 'black',
    marginBottom: 30,
  },
  header: {
    color: 'white',
    fontSize: 60,
    alignSelf: 'center',
    marginBottom: 10,
    fontFamily: Theme.fontFamilyHeader,
  },
});

export default HomeScreen;
