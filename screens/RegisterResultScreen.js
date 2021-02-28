import React, { useState, useContext, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Keyboard,
  TouchableWithoutFeedback,
  Platform,
  KeyboardAvoidingView,
  Button,
} from 'react-native';
import { TextInput, ScrollView } from 'react-native-gesture-handler';
import DropDownPicker from 'react-native-dropdown-picker';
import { PlayerContext } from '../context/PlayerContext';
import Theme from '../theme/theme';
import IconAndTextButton from '../components/IconAndTextButton';
import Splash from './Splash';
import CustomDatePicker from '../components/CustomDatePicker';

const RegisterResultScreen = () => {
  const { postGolfRound, getPlayers } = useContext(PlayerContext);

  const [players, setPlayers] = useState([]);
  const [registerButtonDisabled, setRegisterButtonDisabled] = useState(false);

  const [loading, setLoading] = useState(false);

  const [playerOne, setPlayerOne] = useState({
    name: null,
    points: '',
    extraPoints: '',
    userID: '',
  });

  const [playerTwo, setPlayerTwo] = useState({
    name: null,
    points: '',
    extraPoints: '',
    userID: '',
  });

  const [playerThree, setPlayerThree] = useState({
    name: null,
    points: '',
    extraPoints: '',
    userID: '',
  });

  const [playerFour, setPlayerFour] = useState({
    name: null,
    points: '',
    extraPoints: '',
    userID: '',
  });

  const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };

  const resetPlayerState = () => {
    setPlayerOne({ name: null, points: '', extraPoints: '', userID: '' });
    setPlayerTwo({ name: null, points: '', extraPoints: '', userID: '' });
    setPlayerThree({ name: null, points: '', extraPoints: '', userID: '' });
    setPlayerFour({ name: null, points: '', extraPoints: '', userID: '' });
  };

  const submit = async () => {
    try {
      // setLoading(true);

      let playersPlayed = 0;

      if (playerOne.name !== null && playerOne.points !== '') {
        playersPlayed++;
      }
      if (playerTwo.name !== null && playerTwo.points !== '') {
        playersPlayed++;
      }
      if (playerThree.name !== null && playerThree.points !== '') {
        playersPlayed++;
      }
      if (playerFour.name !== null && playerFour.points !== '') {
        playersPlayed++;
      }

      if (playersPlayed < 1) {
        alert('Minst 2 spelare och pöäng måste rapporteras');
      }

      if (playersPlayed > 1) {
        if (playerOne.name !== null && playerOne.points !== '') {
          if (playerOne.extraPoints === '') {
            postGolfRound(playerOne.userID, playerOne.points, '0');
          } else {
            postGolfRound(
              playerOne.userID,
              playerOne.points,
              playerOne.extraPoints
            );
          }
        }
        if (playerTwo.name !== null && playerTwo.points !== '') {
          if (playerTwo.extraPoints === '') {
            postGolfRound(playerTwo.userID, playerTwo.points, '0');
          } else {
            postGolfRound(
              playerTwo.userID,
              playerTwo.points,
              playerTwo.extraPoints
            );
          }
        }
        if (playerThree.name !== null && playerThree.points !== '') {
          if (playerThree.extraPoints === '') {
            postGolfRound(playerThree.userID, playerThree.points, '0');
          } else {
            postGolfRound(
              playerThree.userID,
              playerThree.points,
              playerThree.extraPoints
            );
          }
        }
        if (playerFour.name !== null && playerFour.points !== '') {
          if (playerFour.extraPoints === '') {
            postGolfRound(playerFour.userID, playerFour.points, '0');
          } else {
            postGolfRound(
              playerFour.userID,
              playerFour.points,
              playerFour.extraPoints
            );
          }
        }
      } else {
        return;
      }

      resetPlayerState();

      console.log('Posting golf round');
    } catch (er) {
      console.log(er);
    }

    alert('Golfrunda skapad');
    // setLoading(false);
  };

  useEffect(() => {
    getPlayers().then(setPlayers);
  }, []);

  const mapPlayersFromDB = (players) => {
    let array = [];

    players.forEach((player) => {
      array.push({
        label: player.name,
        value: player.name,
        userID: player.userID,
      });
    });

    return array;
  };

  const playersArray = mapPlayersFromDB(players);

  if (loading) {
    return <Splash />;
  }

  return (
    <ScrollView style={{ backgroundColor: 'black' }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.container}>
            {/* <View style={{ height: '30%' }}> */}
            <ImageBackground
              source={require('../assets/greenball.png')}
              style={{
                width: '100%',
                height: undefined,
                aspectRatio: 1,

                top: -90,

                // backgroundColor: 'white'
              }}
            >
              <Text style={styles.header}>Registrera Resultat</Text>
            </ImageBackground>
            {/* </View> */}

            <View>
              <View style={{ ...styles.textView }}>
                <Text
                  style={{
                    ...styles.text,

                    width: 180,
                    alignSelf: 'center',
                    marginLeft: 10,
                  }}
                >
                  Spelare
                </Text>
                <Text style={{ ...styles.text, width: '20%' }}>Poäng</Text>
                <Text style={{ ...styles.text, width: '20%' }}>Extra</Text>
              </View>
              <View style={{ ...styles.textInputView, zIndex: 5 }}>
                <DropDownPicker
                  placeholder="Välj spelare"
                  items={playersArray}
                  defaultValue={playerOne.name}
                  containerStyle={{ height: 45 }}
                  style={styles.dropDownPickerStyle}
                  itemStyle={{ justifyContent: 'flex-start' }}
                  labelStyle={styles.dropDownLabelStyle}
                  dropDownStyle={{ backgroundColor: '#fafafa' }}
                  onChangeItem={(item) => {
                    setPlayerOne({
                      ...playerOne,
                      name: item.value,
                      userID: item.userID,
                    });
                  }}
                />

                <TextInput
                  placeholder="Poäng"
                  value={playerOne.points}
                  onChangeText={(text) =>
                    setPlayerOne({ ...playerOne, points: text })
                  }
                  keyboardType="number-pad"
                  style={{ ...styles.textInput }}
                />

                <TextInput
                  placeholder="Extra poäng"
                  value={playerOne.extraPoints}
                  onChangeText={(text) =>
                    setPlayerOne({ ...playerOne, extraPoints: text })
                  }
                  keyboardType="number-pad"
                  style={{ ...styles.textInput }}
                />
              </View>

              <View style={{ ...styles.textInputView, zIndex: 4 }}>
                <DropDownPicker
                  placeholder="Välj spelare"
                  items={playersArray}
                  defaultValue={playerTwo.name}
                  containerStyle={{ height: 45 }}
                  style={styles.dropDownPickerStyle}
                  itemStyle={{ justifyContent: 'flex-start' }}
                  labelStyle={styles.dropDownLabelStyle}
                  dropDownStyle={{ backgroundColor: '#fafafa' }}
                  onChangeItem={(item) =>
                    setPlayerTwo({
                      ...playerTwo,
                      name: item.value,
                      userID: item.userID,
                    })
                  }
                />
                <TextInput
                  placeholder="Poäng"
                  value={playerTwo.points}
                  onChangeText={(text) =>
                    setPlayerTwo({ ...playerTwo, points: text })
                  }
                  keyboardType="number-pad"
                  style={{ ...styles.textInput }}
                ></TextInput>
                <TextInput
                  placeholder="Extra poäng"
                  value={playerTwo.extraPoints}
                  onChangeText={(text) =>
                    setPlayerTwo({ ...playerTwo, extraPoints: text })
                  }
                  keyboardType="number-pad"
                  style={{ ...styles.textInput }}
                ></TextInput>
              </View>

              <View style={{ ...styles.textInputView, zIndex: 3 }}>
                <DropDownPicker
                  placeholder="Välj spelare"
                  items={playersArray}
                  defaultValue={playerThree.name}
                  containerStyle={{ height: 45 }}
                  style={styles.dropDownPickerStyle}
                  itemStyle={{ justifyContent: 'flex-start' }}
                  labelStyle={styles.dropDownLabelStyle}
                  dropDownStyle={{ backgroundColor: '#fafafa' }}
                  onChangeItem={(item) =>
                    setPlayerThree({
                      ...playerThree,
                      name: item.value,
                      userID: item.userID,
                    })
                  }
                />
                <TextInput
                  placeholder="Poäng"
                  value={playerThree.points}
                  onChangeText={(text) =>
                    setPlayerThree({ ...playerThree, points: text })
                  }
                  keyboardType="number-pad"
                  style={{ ...styles.textInput }}
                ></TextInput>
                <TextInput
                  placeholder="Extra poäng"
                  value={playerThree.extraPoints}
                  onChangeText={(text) =>
                    setPlayerThree({ ...playerThree, extraPoints: text })
                  }
                  keyboardType="number-pad"
                  style={{ ...styles.textInput }}
                ></TextInput>
              </View>

              <View style={{ ...styles.textInputView, zIndex: 2 }}>
                <DropDownPicker
                  placeholder="Välj spelare"
                  items={playersArray}
                  defaultValue={playerFour.name}
                  containerStyle={{ height: 45 }}
                  style={styles.dropDownPickerStyle}
                  itemStyle={{ justifyContent: 'flex-start' }}
                  labelStyle={styles.dropDownLabelStyle}
                  dropDownStyle={{ backgroundColor: '#fafafa' }}
                  onChangeItem={(item) =>
                    setPlayerFour({
                      ...playerFour,
                      name: item.value,
                      userID: item.userID,
                    })
                  }
                />
                <TextInput
                  placeholder="Poäng"
                  value={playerFour.points}
                  onChangeText={(text) =>
                    setPlayerFour({ ...playerFour, points: text })
                  }
                  keyboardType="number-pad"
                  style={{ ...styles.textInput }}
                ></TextInput>
                <TextInput
                  placeholder="Extra poäng"
                  value={players.extraPoints}
                  onChangeText={(text) =>
                    setPlayerFour({ ...playerFour, extraPoints: text })
                  }
                  keyboardType="number-pad"
                  style={{ ...styles.textInput }}
                ></TextInput>
              </View>

              <View
                style={{
                  marginHorizontal: 80,
                  //  marginTop: 50
                  top: -80,
                  backgroundColor: '#FFFFFF',
                }}
              >
                <CustomDatePicker
                  textStyle={{
                    paddingVertical: 10,
                    paddingHorizontal: 10,
                    borderColor: 'gray',
                    borderWidth: 1,
                  }}
                  onDateChange={(value) => console.log('Date changed', value)}
                />
              </View>

              <View style={{ bottom: 50, alignSelf: 'center' }}>
                <IconAndTextButton
                  imageSource={require('../assets/edit.png')}
                  imageWidth={30}
                  imageHeight={30}
                  title="Registrera Resultat"
                  textColor="white"
                  textFontSize={20}
                  onPress={submit}
                />
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  playerDropdown: {
    marginTop: 20,
    marginRight: 20,
  },

  dropDownPickerStyle: {
    backgroundColor: '#fafafa',
    width: 180,
    marginLeft: 10,
    marginTop: 15,
  },
  dropDownLabelStyle: {
    fontSize: 14,
    textAlign: 'left',
    color: '#000',
  },

  container: {
    flex: 1,
    backgroundColor: 'black',
    //alignItems: "center",
    // justifyContent: 'flex-start',
  },
  textInput: {
    height: 30,
    borderColor: 'gray',
    borderWidth: 2,
    backgroundColor: 'white',
    marginTop: 15,
    width: '20%',
  },
  header: {
    fontSize: 40,
    marginTop: 120,
    alignSelf: 'center',
    color: 'white',
    fontFamily: Theme.fontFamilyHeader,
  },
  textView: {
    // marginTop: -30,
    top: -90,
    flexDirection: 'row',

    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  text: {
    fontSize: 22,
    // marginTop: 20,
    // width: '20%',
    color: 'white',
    backgroundColor: undefined,
    fontFamily: Theme.fontFamilyText,
  },
  textInputView: {
    top: -90,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
});

export default RegisterResultScreen;
