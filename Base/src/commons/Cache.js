import {Storages} from '../constants/storages';

class Cache {
  static clearCache() {
    console.log('Clear cache');
    let fcmToken = Storages.getString('fcmToken');
    let user = Storages.getString('userInfo');
    if (fcmToken && fcmToken.length > 0 && user) {
      let userInfo = JSON.parse(user);
      let object = {
        UserEmail: userInfo.email,
        DeviceId: fcmToken,
      };
      console.log(object);
    }
  }
}
export default Cache;
