import BaseAPI from './BaseAPI';
import keys from '../constants/keys';
import strings from '../constants/strings';

class Api {
  static getCurrentWeather(lat, lon) {
    return BaseAPI.AXIOS1.get(
      `/weather?lat=${lat}&lon=${lon}&lang=${strings.getLanguage()}&units=metric&appid=${
        keys.weatherAPIKey
      }`,
    );
  }

  static getWeatherIn4Days(lat, lon) {
    return BaseAPI.AXIOS2.get(
      `/forecast/hourly?lat=${lat}&lon=${lon}&lang=${strings.getLanguage()}&appid=${
        keys.weatherAPIKey
      }`,
    );
  }

  static getWeatherDaily(lat, lon) {
    return BaseAPI.AXIOS1.get(
      `/forecast?lat=${lat}&lon=${lon}&lang=${strings.getLanguage()}&units=metric&appid=${
        keys.weatherAPIKey
      }`,
    );
  }
  static getWeatherInWeek(lat, lon) {
    return BaseAPI.AXIOS1.get(
      `/forecast/daily?lat=${lat}&lon=${lon}&cnt=7&appid=${keys.weatherAPIKey}`,
    );
  }

  static getWeatherInMonth(lat, lon) {
    return BaseAPI.AXIOS2.get(
      `/forecast/climate?lat=${lat}&lon=${lon}&appid=${keys.weatherAPIKey}`,
    );
  }

  static getAddressFromLocation(lat, lon) {
    return BaseAPI.AXIOS3.get(
      `/geocode/json?address=${lat},${lon}&key=${keys.googleMapAPIKey}`,
    );
  }
}

export default Api;
