/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View } from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';
import Theme from '../theme/theme';
import VectorIconButton from '../components/VectorIconButton';

const Stats = () => {
  return (
    <View style={{}}>
      {/* <ModalDropdown
        options={['option 1', 'option 2']}
        style={{
          paddingHorizontal: 40,
          backgroundColor: Theme.colors.white,
          width: 170,
          marginLeft: 10,
          marginTop: 15,
        }}
      /> */}

      <VectorIconButton
        iconName="times-circle"
        iconFontSize={30}
        iconWidth={30}
        iconHeight={30}
        iconColor={Theme.colors.orange}
      />
    </View>
  );
};

export default Stats;
