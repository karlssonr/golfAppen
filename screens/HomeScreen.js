import React, { useContext } from 'react';
import { StyleSheet, Text, View, Button, ImageBackground } from 'react-native';
import IconAndTextButton from '../components/IconAndTextButton';

import Theme from '../theme/theme';

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/image8.png')}
        style={{ width: '100%', height: undefined, aspectRatio: 1 }}
      >
        <Text style={styles.header}>KGHIO 2021</Text>
      </ImageBackground>

      <View style={styles.homeView}>
        <IconAndTextButton
          imageSource={require('../assets/edit.png')}
          imageWidth={30}
          iconColor={Theme.orange}
          imageHeight={30}
          title="Registrera Resultat"
          textColor="white"
          textFontSize={20}
          onPress={() => navigation.navigate('RegisterResultScreen')}
        />
        <IconAndTextButton
          imageSource={require('../assets/golfbag.png')}
          imageWidth={30}
          imageHeight={30}
          iconColor={Theme.orange}
          title="Senaste rundorna"
          textColor="white"
          textFontSize={20}
          onPress={() => navigation.navigate('LatestGolfRoundsScreen')}
        />
        <IconAndTextButton
          imageSource={require('../assets/list.png')}
          imageWidth={30}
          imageHeight={30}
          iconColor={Theme.orange}
          title="Tabell"
          textColor="white"
          textFontSize={20}
          onPress={() => navigation.navigate('ChartListScreen')}
        />
        <IconAndTextButton
          imageSource={require('../assets/stats.png')}
          imageWidth={30}
          imageHeight={30}
          title="Chat"
          textColor="white"
          iconColor={Theme.orange}
          textFontSize={20}
          onPress={() => navigation.navigate('ChatRoom')}
        />
        <IconAndTextButton
          imageSource={require('../assets/golfSwing.png')}
          imageWidth={30}
          imageHeight={30}
          iconColor={Theme.orange}
          title="Medlemmar"
          textColor="white"
          textFontSize={20}
          onPress={() => navigation.navigate('MemberScreen')}
        />
        <IconAndTextButton
          imageSource={require('../assets/crown.png')}
          imageWidth={30}
          imageHeight={30}
          title="Champs"
          textColor="grey"
          textFontSize={20}

          // onPress={() => navigation.navigate('RegisterResultScreen')}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  imageBackgroundStyle: {
    width: '100%',
    height: undefined,
    aspectRatio: 1,

    alignItems: 'center',
    justifyContent: 'flex-start',
    marginBottom: '0%',
    backgroundColor: 'black',
  },

  container: {
    flex: 1,
    backgroundColor: 'black',

    justifyContent: 'center',
  },
  homeView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: null,
    marginBottom: 50,
  },
  header: {
    color: 'white',
    fontSize: 40,
    alignSelf: 'center',
    marginBottom: 10,
    fontFamily: Theme.fontFamilyHeader,
    marginTop: 80,
  },
});

export default HomeScreen;
