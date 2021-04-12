import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';

const VectorIconButton = ({
  iconName,
  iconWidth,
  iconHeight,
  onPress,
  iconColor,
  iconFontSize,
  touchableOpacityBackroundColor,
}) => {
  const styles = StyleSheet.create({
    icon: {
      width: iconWidth,
      height: iconHeight,
      color: iconColor,
      fontSize: iconFontSize,
    },

    touchableOpacity: {
      width: iconWidth,
      height: iconHeight,
      backgroundColor: touchableOpacityBackroundColor,
    },
  });

  return (
    <TouchableOpacity style={styles.touchableOpacity} onPress={onPress}>
      <Icon name={iconName} style={styles.icon} />
    </TouchableOpacity>
  );
};

export default VectorIconButton;
