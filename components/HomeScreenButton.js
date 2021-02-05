import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import Theme from "../theme/Theme";

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
  padding,
  touchableOpacityHeight,
  touchableOpacityWidth,
  zIndex

  // backgroundColor,
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
          padding: padding,
          
          // backgroundColor: backgroundColor
        },
      ]}
    >
      <Text style={styles.text}>{text}</Text>
    </View>
  );
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        width: touchableOpacityWidth,
        height: touchableOpacityHeight,
        // backgroundColor: "white",
        alignSelf: alignSelf,
        zIndex: zIndex
        
      }}
    >
      {content}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 15,
    // width: 0,
    borderRadius: 10,
    alignItems: "center",
    margin: 5,
  },
  text: {
    color: "black",
    fontSize: 20,
    fontFamily: Theme.fontFamilyText,
  },
});

export default ButtonWithBackround;
