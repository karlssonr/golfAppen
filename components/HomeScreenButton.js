import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Theme from '../theme/theme';

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
  zIndex,
  marginLeft,
}) => {
  const content = (
    <View
      style={[
        styles.button,
        {
          backgroundColor: color,
          marginBottom: marginBottom,
          width: width,
          height: height,
          alignSelf: alignSelf,
          marginRight: marginRight,
          padding: padding,
          marginLeft: marginLeft,
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
        zIndex: zIndex,
        marginTop: marginTop,
      }}
    >
      {content}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    margin: 5,
  },
  text: {
    color: Theme.colors.black,
    fontSize: Theme.fontSize.button,
    fontFamily: Theme.fontFamilyText,
  },
});

export default ButtonWithBackround;
