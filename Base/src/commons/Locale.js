import React, {useEffect} from 'react';
import {NativeModules, Platform} from 'react-native';
import {Storages} from './Storages';
import Keys from '../constants/Keys';
import Languages from '../constants/Languages';
class Locale {
  static updateAppLanguage() {
    let currentSettingLanguageApp = Storages.getString(Keys.CURRENT_LANGUAGE);
    if (currentSettingLanguageApp) {
      Storages.set(Keys.CURRENT_LANGUAGE, currentSettingLanguageApp);
      Languages.setLanguage(currentSettingLanguageApp);
      this.configMomentLocale(currentSettingLanguageApp);
    } else {
      let deviceLanguage =
        Platform.OS === 'ios'
          ? NativeModules.SettingsManager.settings.AppleLocale ||
            NativeModules.SettingsManager.settings.AppleLanguages[0]
          : NativeModules.I18nManager.localeIdentifier;
      if (deviceLanguage.includes('vi')) {
        Storages.set(Keys.CURRENT_LANGUAGE, 'vi');
        Languages.setLanguage('vi');
        this.configMomentLocale('vi');
      } else {
        Storages.set('currentLanguage', 'en');
        Languages.setLanguage('en');
        this.configMomentLocale('en');
      }
    }
  }
  static configMomentLocale(language) {
    const moment = require('moment');
    if (language === 'vi') {
      const viLocale = require('moment/locale/vi');
      moment.updateLocale('vi', viLocale);
    } else {
      const enLocale = require('moment/locale/es-us');
      moment.updateLocale('en', enLocale);
    }
  }
}

export default Locale;
