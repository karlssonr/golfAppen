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
import RNPicker from 'rn-modal-picker';

const RegisterResultScreen = () => {
  const { postGolfRound, getPlayers, postGolfGame } = useContext(PlayerContext);
  const FB = firebase.firestore.Timestamp;

  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [placeHolderText, setPlaceHolderText] = useState('Select player');
  const [selectedText, setSelectedText] = useState('Select player...');
  const [selectedValue, setSelectedValue] = useState('');

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
    // console.log('timeStamp: ', timeStamp);

    return timeStamp;
  };

  const submit = async () => {
    golfGameArray = [];

    let timeStamp = await convertToTimeStamp(date);

    // console.log('newDate: ', timeStamp);

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
        alert('Choose minimum of two players and points needs to be reported');
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

    alert('Round added');
  };

  const mapPlayersFromDB = (playersFromDB) => {
    let array = [{ id: null, name: 'Select player...' }];

    // console.log('playersFromDB: ', playersFromDB);
    playersFromDB.forEach((player) => {
      array.push({
        id: player.userID,
        name: player.name,
      });
    });

    // console.log('playersArray: ', array);
    return array;
  };

  const playersArray = mapPlayersFromDB(players);

  if (loading) {
    return <Splash />;
  }

  // console.log(playersArray);
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
              source={require('../assets/ReportRound.png')}
              style={styles.imageBackground}
            >
              <Text style={styles.header}>Report {'\n'}Round</Text>
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
                <RNPicker
                  dataSource={playersArray}
                  // dummyDataSource={this.state.dataSource}
                  // defaultValue={playersArray[0].name}
                  pickerTitle={'Select player'}
                  // showSearchBar={true}
                  disablePicker={false}
                  changeAnimation={'none'}
                  showPickerTitle={true}
                  pickerStyle={styles.pickerStyle}
                  itemSeparatorStyle={styles.itemSeparatorStyle}
                  pickerItemTextStyle={styles.listTextViewStyle}
                  selectedLabel={playerOne.name}
                  placeHolderLabel={playerOne.name || 'Select player...'}
                  selectLabelTextStyle={styles.selectLabelTextStyle}
                  placeHolderTextStyle={styles.placeHolderTextStyle}
                  dropDownImageStyle={styles.dropDownImageStyle}
                  selectedValue={(index, item) => {
                    if (index === 0) {
                      setPlayerOne({
                        ...playerOne,
                        name: '',
                        userID: item.id,
                      });
                    }

                    setPlayerOne({
                      ...playerOne,
                      name: item.name,
                      userID: item.id,
                    });

                    console.log('item: ', item);

                    console.log('playerOne: ', playerOne);
                  }}
                />

                <TextInput
                  placeholder="Points"
                  value={playerOne.points}
                  onChangeText={(text) =>
                    setPlayerOne({ ...playerOne, points: text })
                  }
                  keyboardType="number-pad"
                  style={{ ...styles.textInput }}
                />

                <TextInput
                  placeholder="Extra"
                  value={playerOne.extraPoints}
                  onChangeText={(text) =>
                    setPlayerOne({ ...playerOne, extraPoints: text })
                  }
                  keyboardType="number-pad"
                  style={{ ...styles.textInput }}
                />
              </View>

              <View style={{ ...styles.textInputView, zIndex: 4 }}>
                <RNPicker
                  dataSource={playersArray}
                  // dummyDataSource={this.state.dataSource}
                  // defaultValue={playersArray[0].name}
                  pickerTitle={'Select player'}
                  // showSearchBar={true}
                  disablePicker={false}
                  changeAnimation={'none'}
                  showPickerTitle={true}
                  pickerStyle={styles.pickerStyle}
                  itemSeparatorStyle={styles.itemSeparatorStyle}
                  pickerItemTextStyle={styles.listTextViewStyle}
                  selectedLabel={playerTwo.name}
                  placeHolderLabel={playerTwo.name || 'Select player...'}
                  selectLabelTextStyle={styles.selectLabelTextStyle}
                  placeHolderTextStyle={styles.placeHolderTextStyle}
                  dropDownImageStyle={styles.dropDownImageStyle}
                  selectedValue={(index, item) => {
                    if (index === 0) {
                      setPlayerTwo({
                        ...playerTwo,
                        name: '',
                        userID: item.id,
                      });
                    }
                    setPlayerTwo({
                      ...playerTwo,
                      name: item.name,
                      userID: item.id,
                    });
                  }}
                />
                <TextInput
                  placeholder="Points"
                  value={playerTwo.points}
                  onChangeText={(text) =>
                    setPlayerTwo({ ...playerTwo, points: text })
                  }
                  keyboardType="number-pad"
                  style={{ ...styles.textInput }}
                />
                <TextInput
                  placeholder="Extra"
                  value={playerTwo.extraPoints}
                  onChangeText={(text) =>
                    setPlayerTwo({ ...playerTwo, extraPoints: text })
                  }
                  keyboardType="number-pad"
                  style={{ ...styles.textInput }}
                />
              </View>

              <View style={{ ...styles.textInputView, zIndex: 3 }}>
                <RNPicker
                  dataSource={playersArray}
                  // dummyDataSource={this.state.dataSource}
                  // defaultValue={playersArray[0].name}
                  // pickerTitle={'Select player'}
                  // showSearchBar={true}
                  disablePicker={false}
                  changeAnimation={'none'}
                  showPickerTitle={true}
                  pickerStyle={styles.pickerStyle}
                  itemSeparatorStyle={styles.itemSeparatorStyle}
                  pickerItemTextStyle={styles.listTextViewStyle}
                  selectedLabel={playerThree.name}
                  placeHolderLabel={playerThree.name || 'Select player...'}
                  selectLabelTextStyle={styles.selectLabelTextStyle}
                  placeHolderTextStyle={styles.placeHolderTextStyle}
                  dropDownImageStyle={styles.dropDownImageStyle}
                  selectedValue={(index, item) => {
                    if (index === 0) {
                      setPlayerThree({
                        ...playerThree,
                        name: '',
                        userID: item.id,
                      });
                    }

                    setPlayerThree({
                      ...playerThree,
                      name: item.name,
                      userID: item.id,
                    });
                  }}
                />
                <TextInput
                  placeholder="Points"
                  value={playerThree.points}
                  onChangeText={(text) =>
                    setPlayerThree({ ...playerThree, points: text })
                  }
                  keyboardType="number-pad"
                  style={{ ...styles.textInput }}
                />
                <TextInput
                  placeholder="Extra"
                  value={playerThree.extraPoints}
                  onChangeText={(text) =>
                    setPlayerThree({ ...playerThree, extraPoints: text })
                  }
                  keyboardType="number-pad"
                  style={{ ...styles.textInput }}
                />
              </View>

              <View style={{ ...styles.textInputView, zIndex: 2 }}>
                <RNPicker
                  dataSource={playersArray}
                  pickerTitle={'Select player'}
                  disablePicker={false}
                  changeAnimation={'none'}
                  showPickerTitle={true}
                  pickerStyle={styles.pickerStyle}
                  itemSeparatorStyle={styles.itemSeparatorStyle}
                  pickerItemTextStyle={styles.listTextViewStyle}
                  selectedLabel={playerFour.name}
                  placeHolderLabel={playerFour.name || 'Select player...'}
                  selectLabelTextStyle={styles.selectLabelTextStyle}
                  placeHolderTextStyle={styles.placeHolderTextStyle}
                  dropDownImageStyle={styles.dropDownImageStyle}
                  selectedValue={(index, item) => {
                    if (index === 0) {
                      setPlayerFour({
                        ...playerFour,
                        name: '',
                        userID: item.id,
                      });
                    }

                    setPlayerFour({
                      ...playerFour,
                      name: item.name,
                      userID: item.id,
                    });
                  }}
                />
                <TextInput
                  placeholder="Points"
                  value={playerFour.points}
                  onChangeText={(text) =>
                    setPlayerFour({ ...playerFour, points: text })
                  }
                  keyboardType="number-pad"
                  style={{ ...styles.textInput }}
                />
                <TextInput
                  placeholder="Extra"
                  value={players.extraPoints}
                  onChangeText={(text) =>
                    setPlayerFour({ ...playerFour, extraPoints: text })
                  }
                  keyboardType="number-pad"
                  style={{ ...styles.textInput }}
                />
              </View>

              <View style={styles.dateView}>
                {/* <Text
                  style={{
                    ...styles.text,
                    alignSelf: 'center',
                    backgroundColor: null,
                  }}
                >
                  Datum
                </Text> */}
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
                style={{
                  // backgroundColor: 'blue',
                  marginTop: 40,
                  // bottom: 30,
                  alignSelf: 'center',
                  // marginBottom: 60
                  alignItems: 'center',
                }}
              >
                <IconAndTextButton
                  imageSource={require('../assets/edit.png')}
                  iconColor={Theme.colors.orange}
                  imageWidth={Theme.fontSize.buttonIcon}
                  imageHeight={Theme.fontSize.buttonIcon}
                  imagemarginLeft={'35%'}
                  title="Done!"
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
    marginTop: 0,
  },
  dateView: {
    flex: 1,
    backgroundColor: null,
    // top: -70,
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 50,
  },

  imageBackground: {
    width: '100%',
    height: undefined,
    aspectRatio: 1.5,
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
    color: Theme.colors.white,
    fontSize: Theme.fontSize.H1,
    alignSelf: 'flex-start',
    marginTop: 40,
    fontFamily: Theme.fontFamily.fontFamilyHeader,
    marginLeft: 20,
  },
  textView: {
    marginTop: 40,
    // top: -90,
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
    // marginTop: 50,
    // top: -90,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  itemSeparatorStyle: {
    height: 1,
    width: '90%',
    alignSelf: 'center',
    backgroundColor: '#D3D3D3',
  },
  searchBarContainerStyle: {
    marginBottom: 10,
    flexDirection: 'row',
    height: 40,
    shadowOpacity: 1.0,
    shadowRadius: 5,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    backgroundColor: 'rgba(255,255,255,1)',
    shadowColor: '#d3d3d3',
    borderRadius: 10,
    elevation: 3,
    marginLeft: 10,
    marginRight: 10,
  },

  selectLabelTextStyle: {
    color: '#000',
    marginLeft: 10,
    textAlign: 'left',
    width: '99%',
    // padding: 10,
    flexDirection: 'row',
    alignSelf: 'center',
  },
  placeHolderTextStyle: {
    color: '#D3D3D3',
    // padding: 10,
    textAlign: 'left',
    width: '99%',
    flexDirection: 'row',
    alignSelf: 'center',
    marginLeft: 10,
  },
  dropDownImageStyle: {
    marginLeft: 10,
    width: 10,
    height: 10,
    alignSelf: 'center',
  },
  listTextViewStyle: {
    color: '#000',
    marginVertical: 10,
    flex: 0.9,
    marginLeft: 20,
    marginHorizontal: 10,
    textAlign: 'left',
    // alignSelf: 'center',
  },
  pickerStyle: {
    width: 160,
    // marginLeft: 18,
    // elevation: 3,
    paddingRight: 30,
    // marginRight: 10,
    marginBottom: 2,
    // shadowOpacity: 1.0,
    // shadowOffset: {
    //   width: 1,
    //   height: 1,
    // },
    // borderWidth: 1,
    // shadowRadius: 10,
    // backgroundColor: 'rgba(255,255,255,1)',
    // shadowColor: '#d3d3d3',
    // borderRadius: 5,
    flexDirection: 'row',

    backgroundColor: Theme.colors.white,
    // width: '40%',
    marginLeft: 10,
    marginTop: 15,
    height: 30,
    borderColor: Theme.colors.grey,
    borderWidth: 2,
    borderRadius: 5,
    // alignItems: 'flex-end',
  },
});

export default RegisterResultScreen;
