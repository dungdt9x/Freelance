import {Dimensions, Platform} from 'react-native';

const device = {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height,
  android: Platform.OS === 'android',
  iOS: Platform.OS === 'ios',
};

export default device;
