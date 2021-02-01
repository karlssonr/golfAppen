import React , { useContext } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import ButtonWithBackround from "../components/HomeScreenButton";
import { AuthContext } from '../context/AuthContext'

const HomeScreen = ({ navigation }) => {
  const { setIsLoggedIn, signOut } = useContext(AuthContext);

  const submit = () => {
    signOut();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>KGHIO 2021</Text>
      <View style={styles.homeView}>
        <ButtonWithBackround
          text="Registrera Resultat"
          color="#ff4500"
          width={300}
          padding={15}
          onPress={() => {
            console.log("button was pressed");
            // navigation.setOptions({ title: 'Registrera Resultat'})
            navigation.navigate("RegisterResultScreen");
          }}
        />
        <ButtonWithBackround
          text="Tabell"
          color="#ff4500"
          width={300}
          padding={15}
          onPress={() => navigation.navigate("ChartListScreen")}
        />
               <ButtonWithBackround
          text="Profil"
          color="#ff4500"
          width={300}
          padding={15}
          onPress={() => navigation.navigate("ProfileScreen")}
        />
        <ButtonWithBackround
          text="Statestik"
          color="#853017"
          width={300}
          padding={15}
        />
        <ButtonWithBackround
          text="Medlemmar"
          color="#ff4500"
          marginBottom={60}
          width={300}
          padding={15}
          onPress={() => navigation.navigate("MemberScreen")}
        />

        <Button style={{ }} title="Logga Ut" onPress={submit} color='#ff4500'/>
        



      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    //alignItems: "center",
    justifyContent: "flex-start",
  },
  homeView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
    backgroundColor: "black",
    marginBottom: 30
  },
  header: {
    color: "white",
    fontSize: 60,
    alignSelf: "center",
    marginBottom: 10,
  },
});

export default HomeScreen;
