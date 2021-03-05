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

  const getAndSetGolfGames = async () => {
    await getPlayerScore(user.uid).then(setGolfRoundsFromDB);
    // await getPlayer(user.uid);
  };

  const sortGolfGamesArray = (golfGames) => {
    let sortedArray = [];
    let arrayToSort = [];

    golfGames.forEach((golfGame) => {
      let dateFromTimeStamp = golfGame.date.toDate();
      let newDate = moment(dateFromTimeStamp).format('YYYYMMDD');

      arrayToSort.push({
        ...golfGame,
        date: newDate,
      });
    });

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
    console.log('timeStamp: ', timeStamp);

    return timeStamp;
  };

  useEffect(() => {
    getAndSetGolfGames();
  }, []);

  useEffect(() => {
    sortGolfGamesArray(golfRoundsFromDB);
  }, [golfRoundsFromDB]);

  useEffect(() => {
    getAndSetGolfGames();
  }, [score, extraPoints]);

  return (
    <View style={styles.container}>
      <View style={{ marginBottom: 30 }}>
        {loadingPlayerScore && <Splash />}
        {golfGames && (
          <FlatList
            style={{ marginBottom: 50 }}
            data={golfGames}
            renderItem={({ item, index }) => {
              let dateFromTimeStamp = new Date(moment(item.date));

              let golfRoundDate = moment(dateFromTimeStamp).format(
                'MMMM Do, YYYY'
              );

              return (
                <TouchableOpacity
                  onPress={() => {
                    setScore(item.points);
                    setExtraPoints(item.extraPoints);
                    setDocID(item.docID);
                    setDate(dateFromTimeStamp);
                    setModalVisible(true);
                  }}
                  style={{ margin: 10, marginBottom: 20 }}
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
                    <Text
                      style={{
                        fontSize: 15,
                        paddingHorizontal: 10,
                        borderRadius: 5,
                        borderWidth: 1,
                        borderColor: '#fff',
                        color: '#fff',
                        backgroundColor: 'green',
                        // width: '100%',
                        alignSelf: 'center',
                      }}
                    >
                      {golfRoundDate}
                    </Text>
                    <View style={styles.namePointsExtra}>
                      <Text
                        style={{ ...styles.culumText, width: '40%', left: 10 }}
                      >
                        Namn
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
            <Text style={styles.modalText}>Uppdatera golfrunda!</Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <View
                style={{
                  borderColor: 'gray',
                  borderWidth: 1,
                  backgroundColor: 'white',
                }}
              >
                <CustomDatePicker
                  defaultDate={date}
                  textStyle={{
                    paddingVertical: 3,
                    paddingHorizontal: 10,
                    borderColor: 'gray',
                    borderWidth: 1,
                  }}
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
                  score,
                  extraPoints,
                  timeStampDate
                );

                getAndSetGolfGames();
              }}
            >
              <Text style={styles.textStyle}>Updatera</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'stretch',
  },
  golfRoundRow: {
    backgroundColor: Theme.black,
    padding: 1,
    marginVertical: 1,
    marginHorizontal: 1,
    flexDirection: 'row',
  },

  player: {
    fontSize: 15,
    left: 10,
    width: '40%',
    color: 'white',
    fontFamily: Theme.fontFamilyText,
  },
  score: {
    fontSize: 15,
    textAlign: 'center',
    color: Theme.orange,
    fontFamily: Theme.fontFamilyText,
    // marginLeft: 0,
    width: '15%',
    alignSelf: 'center',
  },
  extraPoints: {
    fontSize: 15,
    width: '35%',
    textAlign: 'right',
    color: 'white',

    fontFamily: Theme.fontFamilyText,
    right: 10,
  },
  namePointsExtra: {
    width: '100%',
    borderRadius: 2,

    flexDirection: 'row',

    borderColor: 'white',
    backgroundColor: 'grey',

    borderWidth: 1,
    alignSelf: 'center',
    fontFamily: Theme.fontFamilyText,
  },
  culumText: {
    color: 'white',
    fontFamily: Theme.fontFamilyText,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: Theme.black,
    borderRadius: 20,
    padding: 35,
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
    backgroundColor: 'green',
    marginTop: 20,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    fontSize: 20,
    marginBottom: 15,
    textAlign: 'center',
    color: Theme.orange,
    // fontWeight: 'bold',
  },
  textInput: {
    height: 27,
    borderColor: 'gray',
    borderWidth: 2,
    backgroundColor: 'white',
    marginLeft: 5,
    width: '20%',
  },
});

export default MyGolfRoundsScreen;
