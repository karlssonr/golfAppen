import React, { useState } from 'react';
import {
  Text,
  View,
  Button,
  Platform,
  Modal,
  TouchableHighlight,
  StyleSheet,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import Theme from '../theme/theme';

const CustomDatePicker = (props) => {
  const { textStyle, defaultDate } = props;

  const [date, setDate] = useState(moment(defaultDate));
  const [show, setShow] = useState(false);

  const onChange = (e, selectedDate) => {
    setDate(moment(selectedDate));
    props.onDateChange(selectedDate);
  };

  const onAndroidChange = (e, selectedDate) => {
    setShow(false);
    if (selectedDate) {
      setDate(moment(selectedDate));
      props.onDateChange(selectedDate);
    }
  };

  const onPressCancel = () => {
    setDate(moment());
    setShow(false);
  };

  const onPressDone = () => {
    // props.onDateChange(date);
    console.log(date);
    setShow(false);
  };

  const renderDatePicker = () => {
    return (
      <DateTimePicker
        // style={{ color: 'black' }}
        timeZoneOffsetInMinutes={0}
        value={new Date(date)}
        mode="date"
        display="spinner"
        minimumDate={
          new Date(moment().subtract(2, 'years').format('YYYY-MM-DD'))
        }
        maximumDate={new Date(moment().format('YYYY-MM-DD'))}
        onChange={Platform.OS === 'ios' ? onChange : onAndroidChange}
      />
    );
  };

  return (
    <TouchableHighlight activeOpacity={0} onPress={() => setShow(true)}>
      <View>
        <Text style={textStyle}>{date.format('MMMM Do, YYYY')}</Text>

        {Platform.OS !== 'ios' && show && renderDatePicker()}

        {Platform.OS === 'ios' && (
          <Modal
            transparent={true}
            animationType="slide"
            visible={show}
            supportedOrientations={['portrait']}
            onRequestClose={() => setShow(false)}
          >
            <View style={{ flex: 1 }}>
              <TouchableHighlight
                style={{
                  flex: 1,
                  alignItems: 'flex-end',
                  flexDirection: 'row',
                }}
                activeOpacity={1}
                visible={show}
                onPress={() => setShow(false)}
              >
                <TouchableHighlight
                  underlayColor={Theme.colors.white}
                  style={{
                    flex: 1,
                    borderTopColor: '#E9E9E9E9',
                    borderTopWidth: 1,
                  }}
                  onPress={() => console.log('datepicker clicked')}
                >
                  <View
                    style={{
                      backgroundColor: Theme.colors.white,
                      height: 256,
                      overflow: 'hidden',
                    }}
                  >
                    <View style={{ marginTop: 20 }}>{renderDatePicker()}</View>
                    <TouchableHighlight
                      underlayColor={'transparent'}
                      onPress={onPressCancel}
                      style={[styles.btnText, styles.btnCancel]}
                    >
                      <Text>Avbryt</Text>
                    </TouchableHighlight>

                    <TouchableHighlight
                      underlayColor={'transparent'}
                      onPress={onPressDone}
                      style={[styles.btnText, styles.btnDone]}
                    >
                      <Text>Ok</Text>
                    </TouchableHighlight>
                  </View>
                </TouchableHighlight>
              </TouchableHighlight>
            </View>
          </Modal>
        )}
      </View>
    </TouchableHighlight>
  );
};

CustomDatePicker.defaultProps = {
  textStyle: {},
  onDateChange: () => {},
};

const styles = StyleSheet.create({
  btnText: {
    position: 'absolute',
    top: 0,
    height: 42,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnCancel: {
    left: 0,
  },
  btnDone: {
    right: 0,
  },
});

export default CustomDatePicker;
