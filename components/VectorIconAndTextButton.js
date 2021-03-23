import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';

const VectorIconAndTextButton = ({
  title,
  textFontSize,
  textColor,
  iconName,
  iconWidth,
  iconHeight,
  onPress,
  viewWidth,
  viewMarginBottom,
  iconColor,
  iconFontSize,
}) => {
  const styles = StyleSheet.create({
    text: {
      fontSize: textFontSize,
      marginLeft: 10,
      color: textColor,
      alignSelf: 'center',
      width: '80%',
      textAlign: 'left',
      backgroundColor: null,
    },
    icon: {
      width: iconWidth,
      height: iconHeight,
      color: iconColor,
      fontSize: iconFontSize,
      // left: 22,
      marginLeft: 100,
    },
    view: {
      backgroundColor: null,
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      width: '90%',
      margin: 5,
      marginBottom: viewMarginBottom,
    },
    touchableOpacity: { flexDirection: 'row' },
  });

  return (
    <View style={styles.view}>
      <TouchableOpacity style={styles.touchableOpacity} onPress={onPress}>
        <Icon name={iconName} style={styles.icon} />
        <Text style={styles.text}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default VectorIconAndTextButton;
