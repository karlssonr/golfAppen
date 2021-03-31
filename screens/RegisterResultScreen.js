/* eslint-disable react-native/no-inline-styles */
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
} from 'react-native';
import { TextInput, ScrollView } from 'react-native-gesture-handler';
// import DropDownPicker from 'react-native-dropdown-picker';
import { PlayerContext } from '../context/PlayerContext';
import Theme from '../theme/theme';
import IconAndTextButton from '../components/IconAndTextButton';
import Splash from './Splash';
import CustomDatePicker from '../components/CustomDatePicker';
import firebase from '../firebase';
import ModalDropdown from 'react-native-modal-dropdown';

const RegisterResultScreen = () => {
  const { postGolfRound, getPlayers, postGolfGame } = useContext(PlayerContext);
  const FB = firebase.firestore.Timestamp;

  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(false);

  const [date, setDate] = useState(new Date());

  let golfGameArray = [];

  const [playerOne, setPlayerOne] = useState({
    name: null,
    points: '',
    extraPoints: '',
    userID: '',
    date: date,
  });

  const [playerTwo, setPlayerTwo] = useState({
    name: null,
    points: '',
    extraPoints: '',
    userID: '',
    date: date,
  });

  const [playerThree, setPlayerThree] = useState({
    name: null,
    points: '',
    extraPoints: '',
    userID: '',
    date: date,
  });

  const [playerFour, setPlayerFour] = useState({
    name: null,
    points: '',
    extraPoints: '',
    userID: '',
    date: date,
  });

  useEffect(() => {
    getPlayers().then(setPlayers);
  }, []);

  const resetPlayerState = () => {
    setPlayerOne({ name: null, points: '', extraPoints: '', userID: '' });
    setPlayerTwo({ name: null, points: '', extraPoints: '', userID: '' });
    setPlayerThree({ name: null, points: '', extraPoints: '', userID: '' });
    setPlayerFour({ name: null, points: '', extraPoints: '', userID: '' });
  };

  const convertToTimeStamp = async (dateToConvert) => {
    let timeStamp = new FB.fromDate(dateToConvert);
    console.log('timeStamp: ', timeStamp);

    return timeStamp;
  };

  const submit = async () => {
    golfGameArray = [];

    let timeStamp = await convertToTimeStamp(date);

    console.log('newDate: ', timeStamp);

    try {
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
        alert('Minst 2 spelare och poäng måste rapporteras');
      }

      if (playersPlayed > 1) {
        golfGameArray.push({
          date: timeStamp,
        });
        if (playerOne.name !== null && playerOne.points !== '') {
          if (playerOne.extraPoints === '') {
            postGolfRound(playerOne.userID, playerOne.points, '0', timeStamp);
            golfGameArray.push({
              name: playerOne.name,
              points: playerOne.points,
              extraPoints: '0',
              userID: playerOne.userID,
            });
          } else {
            postGolfRound(
              playerOne.userID,
              playerOne.points,
              playerOne.extraPoints,
              timeStamp
            );
            golfGameArray.push({
              name: playerOne.name,
              points: playerOne.points,
              extraPoints: playerOne.extraPoints,
              userID: playerOne.userID,
            });
          }
        }
        if (playerTwo.name !== null && playerTwo.points !== '') {
          if (playerTwo.extraPoints === '') {
            postGolfRound(playerTwo.userID, playerTwo.points, '0', timeStamp);
            golfGameArray.push({
              name: playerTwo.name,
              points: playerTwo.points,
              extraPoints: '0',
              userID: playerTwo.userID,
            });
          } else {
            postGolfRound(
              playerTwo.userID,
              playerTwo.points,
              playerTwo.extraPoints,
              timeStamp
            );
            golfGameArray.push({
              name: playerTwo.name,
              points: playerTwo.points,
              extraPoints: playerTwo.extraPoints,
              userID: playerTwo.userID,
            });
          }
        }
        if (playerThree.name !== null && playerThree.points !== '') {
          if (playerThree.extraPoints === '') {
            postGolfRound(
              playerThree.userID,
              playerThree.points,
              '0',
              timeStamp
            );
            golfGameArray.push({
              name: playerThree.name,
              points: playerThree.points,
              extraPoints: '0',
              userID: playerThree.userID,
            });
          } else {
            postGolfRound(
              playerThree.userID,
              playerThree.points,
              playerThree.extraPoints,
              timeStamp
            );
            golfGameArray.push({
              name: playerThree.name,
              points: playerThree.points,
              extraPoints: playerThree.extraPoints,
              userID: playerThree.userID,
            });
          }
        }
        if (playerFour.name !== null && playerFour.points !== '') {
          if (playerFour.extraPoints === '') {
            postGolfRound(playerFour.userID, playerFour.points, '0', timeStamp);
            golfGameArray.push({
              name: playerFour.name,
              points: playerFour.points,
              extraPoints: '0',
              userID: playerFour.userID,
            });
          } else {
            postGolfRound(
              playerFour.userID,
              playerFour.points,
              playerFour.extraPoints,
              timeStamp
            );
            golfGameArray.push({
              name: playerFour.name,
              points: playerFour.points,
              extraPoints: playerFour.extraPoints,
              userID: playerFour.userID,
            });
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

    postGolfGame(golfGameArray);

    alert('Golfrunda skapad');
  };

  const mapPlayersFromDB = (playersFromDB) => {
    let array = ['Select player...'];

    // console.log('playersFromDB: ', playersFromDB);
    playersFromDB.forEach((player) => {
      array.push(player.name);
    });

    console.log('playersArray: ', array);
    return array;
  };

  const playersArray = mapPlayersFromDB(players);

  if (loading) {
    return <Splash />;
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={200}
      style={styles.keyboardAvoidingView}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView style={styles.scrollView}>
          <View style={styles.container}>
            {/* <View style={{ height: '30%' }}> */}
            <ImageBackground
              source={require('../assets/greenball.png')}
              style={styles.imageBackground}
            >
              <Text style={styles.header}>Registrera Resultat</Text>
            </ImageBackground>

            <View>
              <View style={{ ...styles.textView }}>
                {/* <Text
                  style={{
                    ...styles.text,

                    width: 180,
                    alignSelf: 'center',
                    marginLeft: 15,
                  }}
                >
                  Spelare
                </Text> */}
                {/* <Text style={{ ...styles.text, width: '20%' }}>Poäng</Text>
                <Text style={{ ...styles.text, width: '20%' }}>Extra</Text> */}
              </View>
              <View style={{ ...styles.textInputView, zIndex: 5 }}>
                {/* <DropDownPicker
                  placeholder="Välj spelare"
                  items={playersArray}
                  defaultValue={playerOne.name}
                  containerStyle={{ height: 45 }}
                  style={styles.dropDownPickerStyle}
                  itemStyle={{ justifyContent: 'flex-start' }}
                  labelStyle={styles.dropDownLabelStyle}
                  dropDownStyle={{ backgroundColor: Theme.colors.white }}
                  onChangeItem={(item) => {
                    setPlayerOne({
                      ...playerOne,
                      name: item.value,
                      userID: item.userID,
                    });
                  }}
                /> */}

                <ModalDropdown
                  defaultValue="Select player..."
                  options={playersArray}
                  animated={true}
                  dropdownStyle={styles.modalDropdownStyle}
                  style={styles.modalStyle}
                  textStyle={styles.modalTextStyle}
                  onSelect={(index, value) => {
                    if (index === 0) {
                      value = null;
                    }
                    console.log(value);
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
                {/* <DropDownPicker
                  placeholder="Välj spelare"
                  items={playersArray}
                  defaultValue={playerTwo.name}
                  containerStyle={{ height: 45 }}
                  style={styles.dropDownPickerStyle}
                  itemStyle={{ justifyContent: 'flex-start' }}
                  labelStyle={styles.dropDownLabelStyle}
                  dropDownStyle={{ backgroundColor: Theme.colors.white }}
                  onChangeItem={(item) =>
                    setPlayerTwo({
                      ...playerTwo,
                      name: item.value,
                      userID: item.userID,
                    })
                  }
                /> */}

                <ModalDropdown
                  defaultValue="Select player..."
                  options={playersArray}
                  animated={true}
                  dropdownStyle={styles.modalDropdownStyle}
                  style={styles.modalStyle}
                  textStyle={styles.modalTextStyle}
                  onSelect={(index, value) => {
                    if (index === 0) {
                      value = null;
                    }
                    console.log(value);
                  }}
                />
                <TextInput
                  placeholder="Poäng"
                  value={playerTwo.points}
                  onChangeText={(text) =>
                    setPlayerTwo({ ...playerTwo, points: text })
                  }
                  keyboardType="number-pad"
                  style={{ ...styles.textInput }}
                />
                <TextInput
                  placeholder="Extra poäng"
                  value={playerTwo.extraPoints}
                  onChangeText={(text) =>
                    setPlayerTwo({ ...playerTwo, extraPoints: text })
                  }
                  keyboardType="number-pad"
                  style={{ ...styles.textInput }}
                />
              </View>

              <View style={{ ...styles.textInputView, zIndex: 3 }}>
                {/* <DropDownPicker
                  placeholder="Välj spelare"
                  items={playersArray}
                  defaultValue={playerThree.name}
                  containerStyle={{ height: 45 }}
                  style={styles.dropDownPickerStyle}
                  itemStyle={{ justifyContent: 'flex-start' }}
                  labelStyle={styles.dropDownLabelStyle}
                  dropDownStyle={{ backgroundColor: Theme.colors.white }}
                  onChangeItem={(item) =>
                    setPlayerThree({
                      ...playerThree,
                      name: item.value,
                      userID: item.userID,
                    })
                  }
                /> */}

                <ModalDropdown
                  defaultValue="Select player..."
                  options={playersArray}
                  animated={true}
                  dropdownStyle={styles.modalDropdownStyle}
                  style={styles.modalStyle}
                  textStyle={styles.modalTextStyle}
                  onSelect={(index, value) => {
                    if (index === 0) {
                      value = null;
                    }
                    console.log(value);
                  }}
                />
                <TextInput
                  placeholder="Poäng"
                  value={playerThree.points}
                  onChangeText={(text) =>
                    setPlayerThree({ ...playerThree, points: text })
                  }
                  keyboardType="number-pad"
                  style={{ ...styles.textInput }}
                />
                <TextInput
                  placeholder="Extra poäng"
                  value={playerThree.extraPoints}
                  onChangeText={(text) =>
                    setPlayerThree({ ...playerThree, extraPoints: text })
                  }
                  keyboardType="number-pad"
                  style={{ ...styles.textInput }}
                />
              </View>

              <View style={{ ...styles.textInputView, zIndex: 2 }}>
                {/* <DropDownPicker
                  placeholder="Välj spelare"
                  items={playersArray}
                  defaultValue={playerFour.name}
                  containerStyle={{ height: 45 }}
                  style={styles.dropDownPickerStyle}
                  itemStyle={{ justifyContent: 'flex-start' }}
                  labelStyle={styles.dropDownLabelStyle}
                  dropDownStyle={{ backgroundColor: Theme.colors.white }}
                  onChangeItem={(item) =>
                    setPlayerFour({
                      ...playerFour,
                      name: item.value,
                      userID: item.userID,
                    })
                  }
                /> */}

                <ModalDropdown
                  defaultValue="Select player..."
                  options={playersArray}
                  animated={true}
                  dropdownStyle={styles.modalDropdownStyle}
                  style={styles.modalStyle}
                  textStyle={styles.modalTextStyle}
                  onSelect={(index, value) => {
                    if (index === 0) {
                      value = null;
                    }
                    console.log(value);
                  }}
                />
                <TextInput
                  placeholder="Poäng"
                  value={playerFour.points}
                  onChangeText={(text) =>
                    setPlayerFour({ ...playerFour, points: text })
                  }
                  keyboardType="number-pad"
                  style={{ ...styles.textInput }}
                />
                <TextInput
                  placeholder="Extra poäng"
                  value={players.extraPoints}
                  onChangeText={(text) =>
                    setPlayerFour({ ...playerFour, extraPoints: text })
                  }
                  keyboardType="number-pad"
                  style={{ ...styles.textInput }}
                />
              </View>

              <View style={styles.dateView}>
                <Text
                  style={{
                    ...styles.text,
                    alignSelf: 'center',
                    backgroundColor: null,
                  }}
                >
                  Datum
                </Text>
                <View style={{ flex: 1 }} />
                <View style={styles.datePickerView}>
                  <CustomDatePicker
                    textStyle={styles.customDatePicker}
                    onDateChange={(value) => {
                      setDate(value);
                    }}
                  />
                </View>

                <View style={{ flex: 1 }} />
              </View>

              <View
                style={{ bottom: 30, alignSelf: 'center', marginBottom: 60 }}
              >
                <IconAndTextButton
                  imageSource={require('../assets/edit.png')}
                  iconColor={Theme.colors.orange}
                  imageWidth={Theme.fontSize.buttonIcon}
                  imageHeight={Theme.fontSize.buttonIcon}
                  title="Registrera Resultat"
                  textColor={Theme.colors.white}
                  textFontSize={Theme.fontSize.button}
                  onPress={submit}
                />
              </View>
            </View>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  modalTextStyle: {
    fontSize: Theme.fontSize.largeCaption,
    marginTop: 3,
    marginLeft: 3,
    width: '100%',
  },
  modalStyle: {
    backgroundColor: Theme.colors.white,
    width: '40%',
    marginLeft: 10,
    marginTop: 15,
    height: 30,
    borderColor: Theme.colors.grey,
    borderWidth: 2,
    borderRadius: 5,
    alignItems: 'flex-start',
  },

  modalDropdownStyle: {
    width: '35%',
    left: 0,
    fontSize: Theme.fontSize.largeCaption,
  },
  customDatePicker: {
    paddingVertical: 3,
    paddingHorizontal: 20,
    borderColor: Theme.colors.grey,
    borderWidth: 1,
    borderRadius: 5,
  },
  datePickerView: {
    borderColor: Theme.colors.grey,
    borderWidth: 1,
    backgroundColor: Theme.colors.white,
    alignSelf: 'center',
    borderRadius: 5,
  },
  dateView: {
    flex: 1,
    backgroundColor: null,
    top: -70,
    flexDirection: 'column',
    alignItems: 'center',
  },

  imageBackground: {
    width: '100%',
    height: undefined,
    aspectRatio: 1,
    top: -90,
  },
  scrollView: {
    backgroundColor: Theme.colors.black,
  },
  keyboardAvoidingView: {
    flex: 1,
    backgroundColor: Theme.colors.black,
  },
  playerDropdown: {
    marginTop: 20,
    marginRight: 20,
  },

  dropDownPickerStyle: {
    backgroundColor: Theme.colors.white,
    width: 170,
    marginLeft: 10,
    marginTop: 15,
  },
  dropDownLabelStyle: {
    fontSize: Theme.fontSize.paragraph,
    textAlign: 'left',
    color: '#000',
  },

  container: {
    flex: 1,
    backgroundColor: Theme.colors.black,
  },
  textInput: {
    height: 30,
    borderColor: Theme.colors.grey,
    borderWidth: 2,
    backgroundColor: Theme.colors.white,
    marginTop: 15,
    width: '20%',
    borderRadius: 5,
    fontSize: Theme.fontSize.largeCaption,
  },
  header: {
    fontSize: Theme.fontSize.H1,
    marginTop: 120,
    alignSelf: 'center',
    color: Theme.colors.white,
    fontFamily: Theme.fontFamily.fontFamilyHeader,
  },
  textView: {
    top: -90,
    flexDirection: 'row',

    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  text: {
    fontSize: 18,
    color: Theme.colors.white,
    backgroundColor: undefined,
    fontFamily: Theme.fontFamily.fontFamilyText,
  },
  textInputView: {
    top: -90,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
});

export default RegisterResultScreen;
