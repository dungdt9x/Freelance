import BaseAPI from './BaseAPI';

class API {
  static getListRoute(userEmail) {
    return BaseAPI.AXIOS.get(
      `mobileroute/get?userEmail=${userEmail}&projectAppId=MobileRouteApp`,
    );
  }

  static getListStop(userEmail, routeId) {
    return BaseAPI.AXIOS.get(
      `mobilestop/get?userEmail=${userEmail}&routeId=${routeId}&projectAppId=MobileRouteApp`,
    );
  }

  static optimizeStopList(object) {
    return BaseAPI.AXIOS.post(
      'mobileroute/run_optimize?projectAppId=MobileRouteApp',
      object,
    );
  }

  static getPlanRouteById(routeId) {
    return BaseAPI.AXIOS.get(
      `mobileroute/get_plan_route?projectAppId=MobileRouteApp&routeId=${routeId}`,
    );
  }

  static updateWorkingStatus(object) {
    return BaseAPI.AXIOS.post(
      'mobileuser/change_working_status?projectAppId=MobileRouteApp',
      object,
    );
  }

  static getWorkingStatus(userEmail) {
    return BaseAPI.AXIOS.get(
      `mobileuser/get_working_status?userEmail=${userEmail}&projectAppId=MobileRouteApp`,
    );
  }

  static uploadLocalRouteToCloud(route) {
    return BaseAPI.AXIOS.post(
      'mobileroute/insert_or_update?projectAppId=MobileRouteApp',
      route,
    );
  }

  static uploadLocalStopToCloud(stop) {
    return BaseAPI.AXIOS.post(
      'mobilestop/insert_or_update?projectAppId=MobileRouteApp',
      stop,
    );
  }

  static deleteRoute(ids) {
    return BaseAPI.AXIOS.post(
      'mobileroute/delete?projectAppId=MobileRouteApp',
      ids,
    );
  }

  static deleteStop(ids) {
    return BaseAPI.AXIOS.post(
      'mobilestop/delete?projectAppId=MobileRouteApp',
      ids,
    );
  }

  static saveUserLocation(object) {
    return BaseAPI.AXIOS.post(
      'mobileuserlocation/insert_or_update?projectAppId=MobileRouteApp',
      object,
    );
  }

  static saveFCMToken(object) {
    return BaseAPI.AXIOS.post(
      'mobileuser/log_in?projectAppId=MobileRouteApp',
      object,
    );
  }

  static deleteFCMToken(object) {
    return BaseAPI.AXIOS.post(
      'mobileuser/log_out?projectAppId=MobileRouteApp',
      object,
    );
  }

  static getInBoxList(userEmail) {
    return BaseAPI.AXIOS.get(
      `mobilemessage/get?userEmail=${userEmail}&projectAppId=MobileRouteApp`,
    );
  }

  static markAsRead(userEmail, id) {
    return BaseAPI.AXIOS.post(
      `mobilemessage/mark_as_read?userEmail=${userEmail}&projectAppId=MobileRouteApp&id=${id}`,
    );
  }

  static getUserSettings(userEmail) {
    return BaseAPI.AXIOS.get(
      `mobileuser/get_user_setting?userEmail=${encodeURIComponent(
        userEmail,
      )}&projectAppId=MobileRouteApp`,
    );
  }

  static updateSetting(object) {
    return BaseAPI.AXIOS.post(
      'mobileuser/insert_or_update_user_setting?projectAppId=MobileRouteApp',
      object,
    );
  }
}

export default API;
