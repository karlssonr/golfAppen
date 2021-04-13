/* eslint-disable react-native/no-inline-styles */
import React, { useContext, useEffect } from 'react';
import { StyleSheet, Text, View, Button, ImageBackground } from 'react-native';
import IconAndTextButton from '../components/IconAndTextButton';
import VectorIconAndTextButton from '../components/VectorIconAndTextButton';
import firebase from '../firebase';
import AuthContext from '../context/AuthContext';

import Theme from '../theme/theme';

const HomeScreen = ({ navigation }) => {
  // const { user } = useContext(AuthContext);

  useEffect(() => {
    firebase.firestore().collection('golfGames').orderBy('date');
  }, []);

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/Start.png')}
        style={styles.imageBackgroundStyle}
      >
        {/* <Text style={styles.header}>KGHIO {'\n'}2021</Text> */}
        <View
          style={{
            color: Theme.colors.white,
            fontSize: Theme.fontSize.H1,
            alignSelf: 'flex-start',
            marginBottom: 10,
            marginLeft: 20,
            fontFamily: Theme.fontFamily.fontFamilyHeader,
            marginTop: 80,
          }}
        >
          <Text
            style={{
              color: Theme.colors.white,
              fontSize: Theme.fontSize.H1,
              alignSelf: 'flex-start',
              // marginBottom: 10,
              marginLeft: 20,
              fontFamily: Theme.fontFamily.fontFamilyHeader,
              // marginTop: 80,
            }}
          >
            KGHIO
          </Text>
          <Text
            style={{
              color: Theme.colors.black,
              fontSize: Theme.fontSize.H1,
              alignSelf: 'flex-start',
              marginBottom: 10,
              marginLeft: 20,
              fontFamily: Theme.fontFamily.fontFamilyHeader,
              // marginTop: 80,
            }}
          >
            2021
          </Text>
        </View>
        {/* <Text style={styles.header}>KGHIO</Text>
        <Text style={styles.header}>2021</Text> */}
      </ImageBackground>

      <View style={styles.homeView}>
        <IconAndTextButton
          imageSource={require('../assets/edit.png')}
          imageWidth={Theme.fontSize.buttonIcon}
          iconColor={Theme.colors.orange}
          imageHeight={Theme.fontSize.buttonIcon}
          // imagemarginLeft={'35%'}
          title="Report Round"
          textColor={Theme.colors.white}
          textFontSize={Theme.fontSize.button}
          onPress={() => navigation.navigate('RegisterResultScreen')}
        />
        <IconAndTextButton
          imageSource={require('../assets/golfbag.png')}
          imageWidth={Theme.fontSize.buttonIcon}
          imageHeight={Theme.fontSize.buttonIcon}
          // imagemarginLeft={'35%'}
          iconColor={Theme.colors.orange}
          title="Played Rounds"
          textColor={Theme.colors.white}
          textFontSize={Theme.fontSize.button}
          onPress={() => navigation.navigate('LatestGolfRoundsScreen')}
        />
        <IconAndTextButton
          imageSource={require('../assets/list.png')}
          imageWidth={Theme.fontSize.buttonIcon}
          imageHeight={Theme.fontSize.buttonIcon}
          // imagemarginLeft={'35%'}
          iconColor={Theme.colors.orange}
          title="The Race"
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
          iconWidth={Theme.fontSize.buttonIcon}
          iconHeight={Theme.fontSize.buttonIcon}
          // iconMarginLeft={'35%'}
          iconFontSize={25}
          title="Chat"
          textColor={Theme.colors.grey}
          iconColor={Theme.colors.grey}
          textFontSize={Theme.fontSize.button}
          // onPress={() => navigation.navigate('ChatRoom')}
        />

        <IconAndTextButton
          imageSource={require('../assets/stats.png')}
          imageWidth={Theme.fontSize.buttonIcon}
          imageHeight={Theme.fontSize.buttonIcon}
          // imagemarginLeft={'35%'}
          title="Stats"
          textColor={Theme.colors.grey}
          iconColor={Theme.colors.grey}
          textFontSize={Theme.fontSize.button}
          // onPress={() => navigation.navigate('Stats')}
        />
        <IconAndTextButton
          imageSource={require('../assets/golfSwing.png')}
          imageWidth={Theme.fontSize.buttonIcon}
          imageHeight={Theme.fontSize.buttonIcon}
          // imagemarginLeft={'35%'}
          iconColor={Theme.colors.orange}
          title="Members"
          textColor={Theme.colors.white}
          textFontSize={Theme.fontSize.button}
          onPress={() => navigation.navigate('MemberScreen')}
        />
        <IconAndTextButton
          imageSource={require('../assets/crown.png')}
          imageWidth={Theme.fontSize.buttonIcon}
          imageHeight={Theme.fontSize.buttonIcon}
          // imagemarginLeft={'35%'}
          title="Champs"
          iconColor={Theme.colors.orange}
          textColor={Theme.colors.white}
          textFontSize={Theme.fontSize.button}
          onPress={() => navigation.navigate('Champs')}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  imageBackgroundStyle: {
    width: '100%',
    height: undefined,
    aspectRatio: 1.5,
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
    marginBottom: 130,
  },
  header: {
    color: Theme.colors.white,
    fontSize: Theme.fontSize.H1,
    alignSelf: 'flex-start',
    marginBottom: 10,
    marginLeft: 20,
    fontFamily: Theme.fontFamily.fontFamilyHeader,
    marginTop: 80,
  },
});

export default HomeScreen;
