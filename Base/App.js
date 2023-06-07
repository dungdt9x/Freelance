/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useReducer, useState} from 'react';
import type {Node} from 'react';
import {StyleSheet, View} from 'react-native';
import RNBootSplash from 'react-native-bootsplash';
import AnimatedSplash from 'react-native-animated-splash-screen';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {AuthContext} from './src/api/Authenticate';
import {createStackNavigator} from '@react-navigation/stack';
import {BannerAd, BannerAdSize, TestIds} from 'react-native-google-mobile-ads';
import images from './src/constants/images';
import Home from './src/screen/Home';
import Detail from './src/screen/Detail';

const initializeState = {};
const Stack = createStackNavigator();

const reducer = (state, action) => {
  switch (action.type) {
    case 'A':
      return {
        ...state,
      };
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
      <Stack.Screen name="Details" component={Detail} />
    </Stack.Navigator>
  );
};

const App: () => Node = () => {
  const [ready, setReady] = useState(false);
  const [state, dispatch] = useReducer(reducer, initializeState);

  useEffect(() => {
    setTimeout(() => {
      RNBootSplash.hide({fade: true}).then(() => {
        setReady(true);
      });
    }, 500);
  }, []);

  return (
    <GestureHandlerRootView style={styles.rootView}>
      <NavigationContainer>
        <AuthContext.Provider value={{state, dispatch}} />
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
          <BannerAd unitId={TestIds.BANNER} size={BannerAdSize.BANNER} />
        </View>
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
