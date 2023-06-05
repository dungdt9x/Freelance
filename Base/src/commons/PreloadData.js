import API from '../api/API';
import {Storages} from './Storages';
import Keys from '../constants/Keys';
import Route from '../Model/Route';
import Setting from '../Model/Setting';
import Location from '../Model/Location';

export default class PreloadData {
  static userInfo = JSON.parse(Storages.getString(Keys.USER_INFO) ?? '{}');

  static async preloadData() {
    return new Promise(resolve => {
      Promise.all([
        this.getListRoute(),
        this.getUserStatus(),
        this.getUserDefaultSetting(),
      ])
        .then(() => {
          resolve(true);
        })
        .catch(() => {
          resolve(false);
        });
    });
  }
  static async getListRoute() {
    return new Promise(resolve => {
      API.getListRoute(this.userInfo?.email)
        .then(response => {
          let {data} = response;
          if (!data) {
            resolve(false);
            return;
          }
          this.parseRoutesData(data);
          resolve(false);
        })
        .catch(() => {
          resolve(false);
        });
    });
  }

  static getUserDefaultSetting() {
    return new Promise(resolve => {
      API.getUserSettings(this.userInfo?.email)
        .then(response => {
          let {data} = response;
          if (!data) {
            resolve(false);
            return;
          }
          if (data) {
            let settings = new Setting(data);
            Storages.set(Keys.USER_SETTINGS, JSON.stringify(settings));
            if (
              settings.DefaultAddressLatitude !== 0 &&
              settings.DefaultAddressLongitude !== 0
            ) {
              let location = new Location(settings);
              Storages.set(Keys.CURRENT_HOME_ADDRESS, JSON.stringify(location));
            }
          }
          resolve(true);
        })
        .catch(error => {
          resolve(false);
          console.log('Error: ', error);
        });
    });
  }

  static async getUserStatus() {
    return new Promise(resolve => {
      API.getWorkingStatus(this.userInfo?.email)
        .then(response => {
          let {data} = response;
          if (!data) {
            Storages.set(Keys.WORKING_STATUS, 0);
          } else {
            let {WorkingStatus} = data;
            if (WorkingStatus !== null && WorkingStatus !== undefined) {
              Storages.set('WorkingStatus', WorkingStatus);
            } else {
              Storages.set('WorkingStatus', 0);
            }
          }
          resolve(true);
        })
        .catch(() => {
          Storages.set(Keys.WORKING_STATUS, 0);
          resolve(false);
        });
    });
  }
  static parseRoutesData(data) {
    let routes = JSON.parse(Storages.getString(Keys.ROUTES) ?? '[]');
    let latestRoute = data.map(element => {
      return new Route(element);
    });
    let currentRoute = routes.find(route => route && route.current);
    if (latestRoute.length > 0) {
      if (currentRoute) {
        let findIndex = latestRoute.findIndex(
          route => route && route.id === currentRoute.id,
        );
        if (findIndex >= 0) {
          latestRoute[findIndex].current = true;
        } else {
          latestRoute[0].current = true;
        }
      } else {
        latestRoute[0].current = true;
      }
      Storages.set(Keys.ROUTES, JSON.stringify(latestRoute));
    }
  }
}
