import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Theme from '../theme/Theme'

const MemberScreen = () => {


    return(

        <View style={styles.container}>
            <Text style={styles.header}>Medlemmar</Text>
            <View style={styles.namePhoneIDView}>
                <Text style={styles.text}>Namn</Text>
                <Text style={styles.text}>Tel</Text>
                <Text style={styles.text}>ID</Text>
            </View>

        </View>
    )
}

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
    },
    header: {
      color: "white",
      fontSize: 40,
      alignSelf: "center",
      marginTop: 20,
      fontFamily: Theme.fontFamilyHeader
    },
    text: {
      color: 'white',
      fontFamily: Theme.fontFamilyText
    },
    namePhoneIDView: {
      width: '95%',
      borderRadius: 2,
      justifyContent: "space-evenly",
      flexDirection: "row",
      marginTop: 20,
      borderColor: 'white',
      backgroundColor:'grey',
      borderRadius:1,
      borderWidth: 1,
      alignSelf: 'center'


    }
  });

export default MemberScreen;