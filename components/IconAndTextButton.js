import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Theme from '../theme/theme';

const IconAndTextButton = ({
  title,
  textFontSize,
  textColor,
  imageSource,
  imageWidth,
  imageHeight,
  imagemarginLeft,
  onPress,
  viewMarginBottom,
  iconColor,
}) => {
  const styles = StyleSheet.create({
    view: {
      backgroundColor: null,
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      width: '90  %',
      margin: 5,
      marginBottom: viewMarginBottom,
    },
    text: {
      fontSize: textFontSize,
      marginLeft: 20,
      color: textColor,
      alignSelf: 'center',
      width: '80%',
      textAlign: 'left',
      backgroundColor: null,
      fontFamily: Theme.fontFamily.fontFamilyText,
    },
    image: {
      width: imageWidth,
      height: imageHeight,
      tintColor: iconColor,
      // left: 22,
      marginLeft: imagemarginLeft ? imagemarginLeft : '30%',
    },
    touchableOpacity: {
      flexDirection: 'row',
    },
  });
  return (
    <View style={styles.view}>
      <TouchableOpacity style={styles.touchableOpacity} onPress={onPress}>
        <Image source={imageSource} style={styles.image} />
        <Text style={styles.text}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default IconAndTextButton;
