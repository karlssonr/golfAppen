import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

const ButtonWithBackround = ({
  color,
  text,
  onPress,
  marginBottom,
  marginTop,
  width,
  height,
  alignSelf,
  marginRight,
}) => {
  const content = (
    <View
      style={[
        styles.button,
        {
          backgroundColor: color,
          marginBottom: marginBottom,
          marginTop: marginTop,
          width: width,
          height: height,
          alignSelf: alignSelf,
          marginRight: marginRight,
        },
      ]}
    >
      <Text style={styles.text}>{text}</Text>
    </View>
  );
  return <TouchableOpacity onPress={onPress}>{content}</TouchableOpacity>;
};

const styles = StyleSheet.create({
  button: {
    padding: 16,
    width: 300,
    borderRadius: 15,
    alignItems: "center",
    margin: 5,
  },
  text: {
    color: "black",
    fontSize: 20,
  },
});

export default ButtonWithBackround;
