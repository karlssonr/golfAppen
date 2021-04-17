/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';
import Theme from '../theme/theme';
import VectorIconButton from '../components/VectorIconButton';

const Stats = () => {
  return (
    <View
      style={{
        backgroundColor: 'grey',
        height: '6%',
        width: '40%',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        alignSelf: 'center',
        borderRadius: 20,
        padding: 8,
        marginTop: 10,
        borderWidth: 2,
        borderColor: 'orange',
      }}
    >
      {/* <Text style={{ marginLeft: '25%' }}>Sort by: </Text> */}
      <TouchableOpacity
        style={{
          backgroundColor: null,
          alignItems: 'center',
          flexDirection: 'row',
        }}
      >
        <Text>Date</Text>
      </TouchableOpacity>
      <Text style={{ margin: 9 }}>|</Text>
      <TouchableOpacity>
        <Text>Points</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Stats;
