import React, { useContext } from 'react';
import { StyleSheet, Text, View, Button, ImageBackground } from 'react-native';
import IconAndTextButton from '../components/IconAndTextButton';
import VectorIconAndTextButton from '../components/VectorIconAndTextButton';

import Theme from '../theme/theme';

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/image8.png')}
        style={styles.imageBackgroundStyle}
      >
        <Text style={styles.header}>KGHIO 2021</Text>
      </ImageBackground>

      <View style={styles.homeView}>
        <IconAndTextButton
          imageSource={require('../assets/edit.png')}
          imageWidth={30}
          iconColor={Theme.colors.orange}
          imageHeight={30}
          title="Registrera Resultat"
          textColor={Theme.colors.white}
          textFontSize={Theme.fontSize.button}
          onPress={() => navigation.navigate('RegisterResultScreen')}
        />
        <IconAndTextButton
          imageSource={require('../assets/golfbag.png')}
          imageWidth={30}
          imageHeight={30}
          iconColor={Theme.colors.orange}
          title="Senaste rundorna"
          textColor={Theme.colors.white}
          textFontSize={Theme.fontSize.button}
          onPress={() => navigation.navigate('LatestGolfRoundsScreen')}
        />
        <IconAndTextButton
          imageSource={require('../assets/list.png')}
          imageWidth={30}
          imageHeight={30}
          iconColor={Theme.colors.orange}
          title="Tabell"
          textColor={Theme.colors.white}
          textFontSize={Theme.fontSize.button}
          onPress={() => navigation.navigate('ChartListScreen')}
        />

        {/* <IconAndTextButton
          imageSource={require('../assets/stats.png')}
          imageWidth={30}
          imageHeight={30}
          title="Chat"
          textColor="white"
          iconColor={Theme.orange}
          textFontSize={20}
          onPress={() => navigation.navigate('ChatRoom')}
        /> */}

        <VectorIconAndTextButton
          iconName="wechat"
          iconWidth={30}
          iconHeight={30}
          iconFontSize={25}
          title="Chatt"
          textColor={Theme.colors.white}
          iconColor={Theme.colors.orange}
          textFontSize={Theme.fontSize.button}
          onPress={() => navigation.navigate('ChatRoom')}
        />

        <IconAndTextButton
          imageSource={require('../assets/stats.png')}
          imageWidth={30}
          imageHeight={30}
          title="Statestik"
          textColor={Theme.colors.white}
          iconColor={Theme.colors.grey}
          textFontSize={Theme.fontSize.button}
          onPress={() => navigation.navigate('ChatRoom')}
        />
        <IconAndTextButton
          imageSource={require('../assets/golfSwing.png')}
          imageWidth={30}
          imageHeight={30}
          iconColor={Theme.colors.orange}
          title="Medlemmar"
          textColor={Theme.colors.white}
          textFontSize={Theme.fontSize.button}
          onPress={() => navigation.navigate('MemberScreen')}
        />
        <IconAndTextButton
          imageSource={require('../assets/crown.png')}
          imageWidth={30}
          imageHeight={30}
          title="Champs"
          textColor={Theme.colors.grey}
          textFontSize={Theme.fontSize.button}

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
  },

  container: {
    flex: 1,
    backgroundColor: Theme.colors.black,

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
    color: Theme.colors.white,
    fontSize: Theme.fontSize.header,
    alignSelf: 'center',
    marginBottom: 10,
    fontFamily: Theme.fontFamilyHeader,
    marginTop: 80,
  },
});

export default HomeScreen;
