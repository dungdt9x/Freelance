import strings from '../constants/strings';
import images from '../constants/images';

class helper {
  static getIconAndTextFromDataWeather(data) {
    if (!data) {
      return {
        text: strings.updating,
        icon: images.d10,
        left: -10,
      };
    }
    let {weather} = data;
    if (!weather || weather.length === 0) {
      return {
        text: strings.updating,
        icon: images.d10,
        left: -10,
      };
    }
    let weatherObject = weather[0];
    let object = {
      text: weatherObject.description,
    };

    switch (weatherObject.icon) {
      case '01d':
        object.icon = images.d01;
        object.big = true;
        break;
      case '01n':
        object.icon = images.n01;
        object.big = true;
        break;
      case '02d':
        object.icon = images.d02;
        object.big = true;
        break;
      case '02n':
        object.icon = images.n02;
        object.big = true;
        break;
      case '03d':
        object.icon = images.d03;
        object.big = true;
        object.left = -10;
        break;
      case '03n':
        object.icon = images.n03;
        object.big = true;
        object.left = -10;
        break;
      case '04d':
        object.icon = images.d04;
        object.small = true;
        break;
      case '04n':
        object.icon = images.n04;
        object.small = true;
        break;
      case '09d':
        object.icon = images.d09;
        break;
      case '09n':
        object.icon = images.d09;
        break;
      case '10d':
        object.icon = images.d10;
        break;
      case '10n':
        object.icon = images.n10;
        break;
      case '11d':
        object.icon = images.d11;
        object.big = true;
        break;
      case '11n':
        object.icon = images.n11;
        object.big = true;
        break;
      case '13d':
        object.icon = images.d13;
        object.big = true;
        break;
      case '13n':
        object.icon = images.n13;
        object.big = true;
        break;
      case '50d':
        object.icon = images.d10;
        object.left = -10;
        break;
      case '50n':
        object.icon = images.d10;
        object.left = -10;
        break;
      default:
        object.icon = images.d10;
        object.left = -10;
        break;
    }

    return object;
  }
}
export default helper;
