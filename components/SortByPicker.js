/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';
import Theme from '../theme/theme';
import VectorIconButton from '../components/VectorIconButton';

const SortByPicker = (
  borderColor,
  backgroundColor,
  dateColor,
  pointsColor,
  dateFontWeight,
  pointsFontWeight,
  fontSize
) => {
  return (
    <View
      style={{
        backgroundColor: Theme.colors.grey,
        height: '5%',
        width: '40%',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        alignSelf: 'center',
        borderRadius: 20,
        padding: 0,
        marginVertical: 10,
        borderWidth: 2,
        borderColor: Theme.colors.orange,
      }}
    >
      <TouchableOpacity
        style={{
          backgroundColor: null,
          alignItems: 'center',
          flexDirection: 'row',
        }}
      >
        <Text
          style={{
            color: dateColor,
            fontWeight: dateFontWeight,
            fontSize: fontSize,
          }}
        >
          Date
        </Text>
      </TouchableOpacity>
      <Text style={{ marginHorizontal: 10 }}>|</Text>
      <TouchableOpacity>
        <Text
          style={{
            color: pointsColor,
            fontWeight: pointsFontWeight,
            fontSize: fontSize,
          }}
        >
          Points
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default SortByPicker;
