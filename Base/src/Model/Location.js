import {Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');
class Location {
  constructor(json) {
    let {
      DefaultAddressName,
      DefaultSubAddressName,
      DefaultAddressLatitude,
      DefaultAddressLongitude,
    } = json;
    this.Address = DefaultAddressName;
    this.SubAddress = DefaultSubAddressName;
    this.address = DefaultAddressName;
    this.latitude = DefaultAddressLatitude;
    this.longitude = DefaultAddressLongitude;
    this.latitudeDelta = 0.015;
    this.longitudeDelta = (0.015 * width) / height;
    this.Longitude = DefaultAddressLongitude;
    this.Latitude = DefaultAddressLatitude;
  }
}

export default Location;
