import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import Theme from '../theme/theme';

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
  // const styles = StyleSheet.create({});

  return (
    <View
      style={{
        backgroundColor: null,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        width: 200,
        margin: 5,
        marginBottom: viewMarginBottom,
      }}
    >
      <TouchableOpacity style={{ flexDirection: 'row' }} onPress={onPress}>
        <Icon
          name={iconName}
          style={{
            width: iconWidth,
            height: iconHeight,
            color: iconColor,
            fontSize: iconFontSize,
          }}
        />
        {/* <Image
          source={imageSource}
          style={{
            width: imageWidth,
            height: imageHeight,
            tintColor: iconColor,
          }}
        /> */}
        <Text
          style={{
            fontSize: textFontSize,
            marginLeft: 20,
            color: textColor,
          }}
        >
          {title}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default VectorIconAndTextButton;
