/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect, useContext } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Modal,
  Pressable,
  Alert,
  TextInput,
} from 'react-native';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';

import Splash from './Splash';
import { PlayerContext } from '../context/PlayerContext';
import { AuthContext } from '../context/AuthContext';
import Theme from '../theme/theme';
import firebase from '../firebase';
import moment from 'moment';
import CustomDatePicker from '../components/CustomDatePicker';
import VectorIconButton from '../components/VectorIconButton';

const GolfRoundRow = ({ name, points, extraPoints }) => (
  <View style={{ ...styles.golfRoundRow }}>
    <Text style={{ ...styles.player, backgroundColor: null }}>{name}</Text>

    <Text style={{ ...styles.score, backgroundColor: null }}>{points}</Text>

    <Text style={{ ...styles.extraPoints, backgroundColor: null }}>
      {extraPoints}
    </Text>
  </View>
);

const MyGolfRoundsScreen = () => {
  const { getPlayerScore, loadingPlayerScore, updateGolfRound } = useContext(
    PlayerContext
  );
  const { user } = useContext(AuthContext);

  const [golfGames, setGolfGames] = useState([]);
  const [golfRoundsFromDB, setGolfRoundsFromDB] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  const [score, setScore] = useState('');
  const [extraPoints, setExtraPoints] = useState('');
  const [docID, setDocID] = useState('');
  const [date, setDate] = useState(moment());

  const Moment = require('moment');

  const FB = firebase.firestore.Timestamp;

  useEffect(() => {
    const unsubscribeListener = firebase
      .firestore()
      .collection('players')
      .doc(user.uid)
      .collection('golfRounds')
      .onSnapshot(
        (snapshot) => {
          if (snapshot) {
            getAndSetGolfGames();
            console.log('snapshot');
          }
          return;
        },
        (error) => {
          console.log('error', error);
        }
      );

    return () => unsubscribeListener();
  }, []);

  useEffect(() => {
    sortGolfGamesArray(golfRoundsFromDB);
  }, [golfRoundsFromDB]);

  const getAndSetGolfGames = async () => {
    await getPlayerScore(user.uid).then(setGolfRoundsFromDB);
  };

  const sortGolfGamesArray = (golfGamesArray) => {
    let sortedArray = [];
    let arrayToSort = [];

    golfGamesArray.forEach((golfGame) => {
      let dateFromTimeStamp = golfGame.date.toDate();
      let newDate = moment(dateFromTimeStamp).format('YYYYMMDD');

      arrayToSort.push({
        ...golfGame,
        date: newDate,
      });
    });

    // console.log('golfGame: ', arrayToSort);
    sortedArray = arrayToSort.sort(
      (a, b) =>
        new Moment(a.date).format('YYYYMMDD') -
        new Moment(b.date).format('YYYYMMDD')
    );
    sortedArray.reverse();
    setGolfGames(sortedArray);
  };

  const convertToTimeStamp = async (dateToConvert) => {
    let timeStamp = new FB.fromDate(dateToConvert);
    // console.log('timeStamp: ', timeStamp);

    return timeStamp;
  };

  return (
    <View style={styles.container}>
      <View style={{ marginBottom: 30 }}>
        {loadingPlayerScore && <Splash />}
        {golfGames && (
          <FlatList
            style={{ marginBottom: 50 }}
            data={golfGames}
            renderItem={({ item, index }) => {
              // let date = moment(item.date.date).format('MMMM Do, YYYY');
              let dateFromTimeStamp = new Date(moment(item.date));

              let golfRoundDate = moment(dateFromTimeStamp).format(
                'MMMM Do, YYYY'
              );
              // console.log('item: ', item.date);

              return (
                <TouchableOpacity
                  onPress={() => {
                    setScore(item.points);
                    setExtraPoints(item.extraPoints);
                    setDocID(item.docID);
                    setDate(dateFromTimeStamp);
                    setModalVisible(true);
                  }}
                  style={styles.touchableOpacity}
                >
                  <View
                    style={
                      {
                        // color: 'white',
                        // backgroundColor: 'red',
                        // width: '100%',
                      }
                    }
                  >
                    <Text style={styles.golfRoundDate}>{golfRoundDate}</Text>
                    <View style={styles.namePointsExtra}>
                      <Text
                        style={{ ...styles.culumText, width: '40%', left: 10 }}
                      >
                        Name
                      </Text>

                      <Text
                        style={{
                          ...styles.culumText,
                          textAlign: 'center',
                          width: '15%',
                        }}
                      >
                        Poäng
                      </Text>

                      <Text
                        style={{
                          ...styles.culumText,
                          textAlign: 'right',
                          width: '35%',
                        }}
                      >
                        Extra
                      </Text>
                    </View>
                  </View>

                  <GolfRoundRow
                    name={user.displayName}
                    points={item.points}
                    extraPoints={item.extraPoints}
                  />
                </TouchableOpacity>
              );
            }}
            keyExtractor={(_, index) => index.toString()}
          />
        )}
      </View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.textAndDeleteButtonView}>
              <VectorIconButton
                iconName="times-circle"
                iconFontSize={30}
                iconWidth={30}
                iconHeight={30}
                iconColor={Theme.colors.orange}
                onPress={() => {
                  setModalVisible(false);
                }}
              />
            </View>
            <Text style={styles.modalText}>Update golfround</Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <View style={styles.datePickerView}>
                <CustomDatePicker
                  defaultDate={date}
                  textStyle={styles.customDatePicker}
                  onDateChange={(value) => {
                    setDate(value);
                  }}
                />
              </View>
              <TextInput
                placeholder="Poäng"
                value={score}
                onChangeText={(text) => setScore(text)}
                keyboardType="number-pad"
                style={{ ...styles.textInput }}
              />

              <TextInput
                placeholder="Extra poäng"
                value={extraPoints}
                onChangeText={(text) => setExtraPoints(text)}
                keyboardType="number-pad"
                style={{ ...styles.textInput }}
              />
            </View>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={async () => {
                setModalVisible(!modalVisible);

                const timeStampDate = await convertToTimeStamp(date);
                const name = user.displayName;
                const userID = user.uid;

                updateGolfRound(
                  docID,
                  userID,
                  name,
                  score,
                  extraPoints,
                  timeStampDate
                );

                getAndSetGolfGames();
              }}
            >
              <Text style={styles.textStyle}>Update</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  textAndDeleteButtonView: {
    // backgroundColor: 'white',
    alignSelf: 'flex-end',
  },

  customDatePicker: {
    paddingVertical: 3,
    paddingHorizontal: 20,
    borderColor: Theme.colors.grey,
    borderWidth: 1,
    borderRadius: 5,
    fontSize: Theme.fontSize.mediumCaption,
  },
  datePickerView: {
    borderColor: Theme.colors.grey,
    borderWidth: 1,
    backgroundColor: Theme.colors.white,
    alignSelf: 'center',
    borderRadius: 5,
  },
  touchableOpacity: {
    margin: 10,
    marginBottom: 20,
  },
  golfRoundDate: {
    fontSize: Theme.fontSize.largeCaption,
    paddingHorizontal: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: null,
    color: Theme.colors.white,
    backgroundColor: null,
    alignSelf: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: Theme.colors.black,
    alignItems: 'stretch',
  },
  golfRoundRow: {
    backgroundColor: Theme.colors.lightBlack,
    padding: 1,
    marginVertical: 1,
    marginHorizontal: 1,
    flexDirection: 'row',
  },

  player: {
    fontSize: Theme.fontSize.caption,
    left: 10,
    width: '40%',
    color: 'white',
    fontFamily: Theme.fontFamilyText,
  },
  score: {
    fontSize: Theme.fontSize.caption,
    textAlign: 'center',
    color: Theme.colors.orange,
    fontFamily: Theme.fontFamilyText,
    // marginLeft: 0,
    width: '15%',
    alignSelf: 'center',
  },
  extraPoints: {
    fontSize: Theme.fontSize.caption,
    width: '35%',
    textAlign: 'right',
    color: Theme.colors.white,

    fontFamily: Theme.fontFamilyText,
    right: 10,
  },
  namePointsExtra: {
    width: '100%',
    borderRadius: 2,

    flexDirection: 'row',

    borderColor: Theme.colors.white,
    backgroundColor: Theme.colors.grey,

    borderWidth: 1,
    alignSelf: 'center',
    fontFamily: Theme.fontFamilyText,
  },
  culumText: {
    color: Theme.colors.white,
    fontFamily: Theme.fontFamilyText,
    fontSize: Theme.fontSize.caption,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: Theme.colors.lightBlack,
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 10,
    padding: 8,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: Theme.colors.grey,
    marginTop: 20,
  },
  textStyle: {
    color: Theme.colors.white,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    fontSize: 20,
    marginBottom: 15,
    textAlign: 'center',
    color: Theme.colors.white,
    fontWeight: 'bold',
    // fontWeight: 'bold',
  },
  textInput: {
    height: 33,
    borderColor: Theme.colors.grey,
    borderWidth: 2,
    backgroundColor: Theme.colors.white,
    marginLeft: 5,
    borderRadius: 5,
    width: '20%',
  },
});

export default MyGolfRoundsScreen;
