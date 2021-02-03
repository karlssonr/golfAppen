import { StatusBar } from "expo-status-bar";
import React, { useState, useContext, useEffect } from "react";
import { StyleSheet, Text, View , ImageBackground, Button} from "react-native";
import PlayerTextInput from "../components/PlayerTextInput";
import { TextInput } from "react-native-gesture-handler";
import ButtonWithBackround from "../components/HomeScreenButton";
import DropDownPicker from "react-native-dropdown-picker";
import { Picker } from "@react-native-picker/picker";
import { PlayerContext } from "../context/PlayerContext";
import Theme from "../theme/Theme";
import firebase from "../firebase";
import Splash from "./Splash";

const RegisterResultScreen = () => {
  const [players, setPlayers] = useState([]);
  

  const { postGolfRound } = useContext(PlayerContext);

  const [value, setValue] = useState(null);
  const [items, setItems] = useState(players);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [playerOne, setPlayerOne] = useState(null);
  const [pointsOne, setPointsOne] = useState("");
  const [extraPointsOne, setExtraPointsone] = useState("");

  const [playerTwo, setPlayerTwo] = useState(null);
  const [pointsTwo, setPointsTwo] = useState("");
  const [extraPointsTwo, setExtraPointsTwo] = useState("");

  const [playerThree, setPlayerThree] = useState(null);
  const [pointsThree, setPointsThree] = useState("");
  const [extraPointsThree, setExtraPointsThree] = useState("");

  const [playerFour, setPlayerFour] = useState(null);
  const [pointsFour, setPointsFour] = useState("");
  const [extraPointsFour, setExtraPointsFour] = useState("");

  const resetPlayerState = () => {
    setPlayerOne(null);
    setPointsOne("");
    setExtraPointsone("");

    setPlayerTwo(null);
    setPointsTwo("");
    setExtraPointsTwo("");

    setPlayerThree(null);
    setPointsThree("");
    setExtraPointsThree("");

    setPlayerFour(null);
    setPointsFour("");
    setExtraPointsFour("");
  };

  const submit = async () => {
    try {
      setError("");
      setLoading(true);

      if (playerOne && playerTwo && playerThree && playerFour !== null) {
        postGolfRound(playerOne, pointsOne, extraPointsOne);
        postGolfRound(playerTwo, pointsTwo, extraPointsTwo);
        postGolfRound(playerThree, pointsThree, extraPointsThree);
        postGolfRound(playerFour, pointsFour, extraPointsFour);
      }

      if (playerOne && playerTwo && playerThree !== null) {
        postGolfRound(playerOne, pointsOne, extraPointsOne);
        postGolfRound(playerTwo, pointsTwo, extraPointsTwo);
        postGolfRound(playerThree, pointsThree, extraPointsThree);
      }

      if (playerOne && playerTwo !== null) {
        postGolfRound(playerOne, pointsOne, extraPointsOne);
        postGolfRound(playerTwo, pointsTwo, extraPointsTwo);
      } else {
        alert("Minst 2 spelare måste rapporteras");
      }

      resetPlayerState();

      console.log("Posting golf round");
    } catch (er) {
      setError("Failed to post golfround");
      console.log(er);
    }

    setLoading(false);
  };

  var databaseRef = firebase.firestore().collection("players");

  const getPlayers = () => {
    setLoading(true);
    databaseRef.get().then((item) => {
      const items = item.docs.map((doc) => doc.data());
      setPlayers(items);
      setLoading(false);
       console.log("items: ",items);
    });
     console.log("players: ",players);
  };

  useEffect(() => {
    getPlayers();

    return () => {
      getPlayers;
    };
  }, []);

  const playersArray = [
    { label: "Robin", value: "Robin" },
    { label: "Stefan", value: "Stefan" },
    { label: "Ida", value: "Ida" },
    { label: "Hampus", value: "Hampus" },
    { label: "Mia", value: "Mia" },
    { label: "Jonas", value: "Jonas" },
  ];

  // const playersArray = () => {


  // }

  if (loading) {
    return <Splash />;
  }

  return (
    <View style={styles.container}>

<ImageBackground
            source={require('../assets/golfBall.png')}
            style={{     width: '100%',
            height: undefined,
            aspectRatio: 1,
            // backgroundColor: 'white'
        }}>

<Text style={styles.header}>Registrera Resultat</Text>


      

      <View style={styles.textView}>
        <Text
          style={{ ...styles.text,  width: "50%" }}
        >
          Spelare
        </Text>
        <Text style={{ ...styles.text }}>Poäng</Text>
        <Text style={{ ...styles.text }}>Extra</Text>
      </View>
      <View style={{ ...styles.textInputView, zIndex: 5 }}>
        <DropDownPicker
          placeholder="Välj spelare"

          items={playersArray}
          defaultValue={playerOne}
          containerStyle={{ height: 50 }}
          style={styles.dropDownPickerStyle}
          itemStyle={{ justifyContent: "flex-start" }}
          labelStyle={styles.dropDownLabelStyle}
          dropDownStyle={{ backgroundColor: "#fafafa" }}
          onChangeItem={(item) => setPlayerOne(item.value)}
        />

        {/* <View style={{ backgroundColor: 'blue' }}>

  
        </View> */}

        <TextInput
          placeholder="Poäng"
          value={pointsOne}
          onChangeText={setPointsOne}
          keyboardType="number-pad"
          style={{ ...styles.textInput }}
        />

        <TextInput
          placeholder="Extra poäng"
          value={extraPointsOne}
          onChangeText={setExtraPointsone}
          keyboardType="number-pad"
          style={{ ...styles.textInput }}
        />
      </View>


      <View style={{ ...styles.textInputView, zIndex: 4 }}>
        <DropDownPicker
          placeholder="Välj spelare"
          items={playersArray}
          defaultValue={playerTwo}
          containerStyle={{ height: 50 }}
          style={styles.dropDownPickerStyle}
          itemStyle={{ justifyContent: "flex-start" }}
          labelStyle={styles.dropDownLabelStyle}
          dropDownStyle={{ backgroundColor: "#fafafa" }}
          onChangeItem={(item) => setPlayerTwo(item.value)}
        />
        <TextInput
          placeholder="Poäng"
          value={pointsTwo}
          onChangeText={setPointsTwo}
          keyboardType="number-pad"
          style={{ ...styles.textInput }}
        ></TextInput>
        <TextInput
          placeholder="Extra poäng"
          value={extraPointsTwo}
          onChangeText={setExtraPointsTwo}
          keyboardType="number-pad"
          style={{ ...styles.textInput }}
        ></TextInput>
      </View>

      <View style={{ ...styles.textInputView, zIndex: 3 }}>
        <DropDownPicker
          placeholder="Välj spelare"
          items={playersArray}
          defaultValue={playerThree}
          containerStyle={{ height: 50 }}
          style={styles.dropDownPickerStyle}
          itemStyle={{ justifyContent: "flex-start" }}
          labelStyle={styles.dropDownLabelStyle}
          dropDownStyle={{ backgroundColor: "#fafafa" }}
          onChangeItem={(item) => setPlayerThree(item.value)}
        />
        <TextInput
          placeholder="Poäng"
          value={pointsThree}
          onChangeText={setPointsThree}
          keyboardType="number-pad"
          style={{ ...styles.textInput }}
        ></TextInput>
        <TextInput
          placeholder="Extra poäng"
          value={extraPointsThree}
          onChangeText={setExtraPointsThree}
          keyboardType="number-pad"
          style={{ ...styles.textInput }}
        ></TextInput>
      </View>

      <View style={{ ...styles.textInputView, zIndex: 2 }}>
        <DropDownPicker
          placeholder="Välj spelare"
          items={playersArray}
          defaultValue={playerFour}
          containerStyle={{ height: 50 }}
          style={styles.dropDownPickerStyle}
          itemStyle={{ justifyContent: "flex-start" }}
          labelStyle={styles.dropDownLabelStyle}

          dropDownStyle={{ backgroundColor: "#fafafa" }}
          onChangeItem={(item) => setPlayerFour(item.value)}
        />
        <TextInput
          placeholder="Poäng"
          value={pointsFour}
          onChangeText={setPointsFour}
          keyboardType="number-pad"
          style={{ ...styles.textInput }}
        ></TextInput>
        <TextInput
          placeholder="Extra poäng"
          value={extraPointsFour}
          onChangeText={setExtraPointsFour}
          keyboardType="number-pad"
          style={{ ...styles.textInput }}
        ></TextInput>
      </View>
      
      </ImageBackground>

      {/* <View style={{ backgroundColor: "white" }} /> */}

      {/* <ButtonWithBackround
        color={Colors.orange}
        text="Registrera"
        marginTop={0}
        width={120}
        alignSelf="flex-end"
        marginRight={10}
        padding={5}
        // backgroundColor=
        onPress={submit}
        touchableOpacityHeight={70}
        touchableOpacityWidth="40%"
      /> */}
      <View
      
      style={{ marginTop: 100}}>
      <Button
      title="Registrera resultat"
      onPress={submit}
      color={Theme.orange}
      
      />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({

//   button: {
// margin: 100
//   },

  playerDropdown: {
    marginTop: 20,
    marginRight: 20,
  },

  dropDownPickerStyle: {
    backgroundColor: "#fafafa",
    width: 180,
    marginLeft: 10,
    marginTop: 15,
  },
  dropDownLabelStyle: {
    fontSize: 14,
    textAlign: "left",
    color: "#000",
  },

  container: {
    flex: 1,
    backgroundColor: "black",
    //alignItems: "center",
    justifyContent: "flex-start",
  },
  textInput: {
    height: 35,
    borderColor: "gray",
    borderWidth: 2,
    backgroundColor: "white",
    marginTop: 15,
    width: "20%",
  },
  header: {
    // backgroundColor: "black",
    fontSize: 40,
    marginTop: 55,
    alignSelf: "center",
    color: "white",
  },
  textView: {
    marginTop: 100,
    flexDirection: "row",
    // backgroundColor: "black",
    alignItems: "flex-start",
    justifyContent: "space-evenly",
  },
  text: {
    fontSize: 25,
    marginTop: 20,
    width: "20%",
    color: "white",
    backgroundColor: undefined,
  },
  textInputView: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
});

export default RegisterResultScreen;
