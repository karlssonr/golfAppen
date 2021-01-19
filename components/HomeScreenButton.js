import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

const ButtonWithBackround = ({color, text, marginBottom, onPress}) => {
  const content = (
    <View style={[styles.button, { backgroundColor: color , marginBottom: marginBottom}]}>
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
    color: "white",
    fontSize: 20,
  },
});

export default ButtonWithBackround;
