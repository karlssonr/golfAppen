import React from 'react';
import { View } from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';
import Theme from '../theme/theme';

const Stats = () => {
  return (
    <View style={{}}>
      <ModalDropdown
        options={['option 1', 'option 2']}
        style={{
          paddingHorizontal: 40,
          backgroundColor: Theme.colors.white,
          width: 170,
          marginLeft: 10,
          marginTop: 15,
        }}
      />
    </View>
  );
};

export default Stats;
