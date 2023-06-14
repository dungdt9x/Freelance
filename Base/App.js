/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useReducer, useState} from 'react';
import type {Node} from 'react';
import {NativeModules, StyleSheet, View} from 'react-native';
import RNBootSplash from 'react-native-bootsplash';
import AnimatedSplash from 'react-native-animated-splash-screen';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {AuthContext} from './src/api/Authenticate';
import {createStackNavigator} from '@react-navigation/stack';
import {
  AdEventType,
  AppOpenAd,
  BannerAd,
  BannerAdSize,
} from 'react-native-google-mobile-ads';
import {Host} from 'react-native-portalize';
import images from './src/constants/images';
import Home from './src/screen/Home';
import device from './src/constants/device';
import strings from './src/constants/strings';
import Search from './src/screen/Search';
import keys from './src/constants/keys';

const viLocale = require('moment/locale/vi');
const enLocale = require('moment/locale/es-us');
const frLocale = require('moment/locale/fr');

const initializeState = {};
const Stack = createStackNavigator();

const configMomentLocale = language => {
  const moment = require('moment');
  if (language === 'vi') {
    moment.updateLocale('vi', viLocale);
  } else if (language === 'fr') {
    moment.updateLocale('fr', frLocale);
  } else {
    moment.updateLocale('en', enLocale);
  }
};

const deviceLanguage = device.iOS
  ? NativeModules.SettingsManager.settings.AppleLocale ||
    NativeModules.SettingsManager.settings.AppleLanguages[0]
  : NativeModules.I18nManager.localeIdentifier;

if (deviceLanguage.includes('fr')) {
  strings.setLanguage('fr');
  configMomentLocale('fr');
} else if (deviceLanguage.includes('vi')) {
  strings.setLanguage('vi');
  configMomentLocale('vi');
} else {
  strings.setLanguage('en');
  configMomentLocale('en');
}

const reducer = (state, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

const HomeStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Search" component={Search} />
    </Stack.Navigator>
  );
};

const App: () => Node = () => {
  const [ready, setReady] = useState(false);
  const [state, dispatch] = useReducer(reducer, initializeState);

  const appOpenAd = AppOpenAd.createForAdRequest(
    device.iOS ? keys.iOS_OPEN_ID : keys.APP_OPEN_ID,
    {
      requestNonPersonalizedAdsOnly: true,
      keywords: keys.adKeys,
    },
  );

  useEffect(() => {
    const unsubscribeLoaded = appOpenAd.addAdEventListener(
      AdEventType.LOADED,
      () => {
        appOpenAd.show().then();
      },
    );
    return () => {
      unsubscribeLoaded();
    };
  }, []);

  return (
    <GestureHandlerRootView style={styles.rootView}>
      <NavigationContainer
        onReady={() => {
          RNBootSplash.hide({fade: true}).then(() => {
            setReady(true);
          });
          appOpenAd.load();
        }}>
        <Host>
          <AuthContext.Provider value={{state, dispatch}}>
            <AnimatedSplash
              translucent={true}
              isLoaded={ready}
              logoImage={images.sun}
              backgroundColor={'white'}
              logoHeight={120}
              logoWidth={120}>
              {HomeStack()}
            </AnimatedSplash>
            <View style={styles.bannerView}>
              <BannerAd
                unitId={device.iOS ? keys.iOS_BANNER_ID : keys.BANNER_ID}
                size={BannerAdSize.BANNER}
                requestOptions={{
                  requestNonPersonalizedAdsOnly: true,
                  keywords: keys.adKeys,
                }}
              />
            </View>
          </AuthContext.Provider>
        </Host>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
};

export default App;

const styles = StyleSheet.create({
  rootView: {flex: 1},
  bannerView: {
    position: 'absolute',
    bottom: 0,
    alignSelf: 'center',
    justifyContent: 'center',
  },
});
