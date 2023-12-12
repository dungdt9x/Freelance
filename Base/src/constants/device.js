import {Dimensions, Platform} from 'react-native';

const device = {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height,
  isAndroid: Platform.OS === 'android',
  isIOS: Platform.OS === 'ios',
};

export default device;
