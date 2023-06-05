import {Storages} from './Storages';
import API from '../api/API';
import Keys from '../constants/Keys';

class Cache {
  static clearCache() {
    console.log('Clear cache');
    let fcmToken = Storages.getString(Keys.FCM_TOKEN);
    let user = Storages.getString(Keys.USER_INFO);
    if (fcmToken && fcmToken.length > 0 && user) {
      let userInfo = JSON.parse(user);
      let token = {
        UserEmail: userInfo.email,
        DeviceId: fcmToken,
      };
      API.deleteFCMToken(token)
        .then(() => {
          this.deleteAllKey();
        })
        .catch(() => {
          this.deleteAllKey();
        });
    } else {
      this.deleteAllKey();
    }
  }

  static setDefaultKeyValue() {
    let currentVehicleType = Storages.getNumber(Keys.OVERRIDE_OPTIMIZE);
    if (!currentVehicleType) {
      Storages.set(Keys.OVERRIDE_OPTIMIZE, 0);
    }

    let currentMaxWeight = Storages.getNumber(Keys.MAX_WEIGHT);
    if (!currentMaxWeight) {
      Storages.set(Keys.MAX_WEIGHT, 0);
    }

    let currentMaxVolume = Storages.getNumber(Keys.MAX_VOLUME);
    if (!currentMaxVolume) {
      Storages.set(Keys.MAX_VOLUME, 0);
    }

    let currentDistance = Storages.getNumber(Keys.DISTANCE);
    if (!currentDistance) {
      Storages.set(Keys.DISTANCE, 0);
    }

    let currentSpeed = Storages.getString(Keys.SPEED);
    if (!currentSpeed) {
      Storages.set(Keys.SPEED, 0);
    }

    let currentStopTime = Storages.getNumber(Keys.STOP_TIME);
    if (!currentStopTime) {
      Storages.set(Keys.STOP_TYPE, 0);
    }

    let currentType = Storages.getNumber(Keys.STOP_TYPE);
    if (!currentType) {
      Storages.set(Keys.STOP_TYPE, 0);
    }

    let currentOptionOptimization = Storages.getNumber(
      Keys.OPTIMIZATION_OPTION,
    );
    if (!currentOptionOptimization) {
      Storages.set(Keys.OPTIMIZATION_OPTION, 0);
    }
  }

  static deleteAllKey() {
    let keys = Storages.getAllKeys();
    keys.forEach(key => {
      if (key !== Keys.FCM_TOKEN) {
        Storages.delete(key);
      }
    });
  }
}
export default Cache;
