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
  onPress,
  viewWidth,
  viewMarginBottom,
  iconColor,
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
        <Image
          source={imageSource}
          style={{
            width: imageWidth,
            height: imageHeight,
            tintColor: iconColor,
          }}
        />
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

export default IconAndTextButton;
