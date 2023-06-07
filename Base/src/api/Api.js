import BaseAPI from './BaseAPI';
import keys from '../constants/keys';

class Api {
  static getWeatherData(lat, lon, part) {
    return BaseAPI.AXIOS.get(
      `/onecall?lat=${lat}&lon=${lon}&exclude=${part}&appid=${keys.weatherAPIKey}`,
    );
  }
}

export default Api;
