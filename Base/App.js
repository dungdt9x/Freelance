/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useReducer, useState} from 'react';
import type {Node} from 'react';
import {StatusBar, Text, View} from 'react-native';
import RNBootSplash from 'react-native-bootsplash';
import AnimatedSplash from 'react-native-animated-splash-screen';
import {Appbar} from 'react-native-paper';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {AuthContext} from './src/api/Authenticate';
import {createStackNavigator} from '@react-navigation/stack';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import mobileAds, {
  BannerAd,
  BannerAdSize,
  MaxAdContentRating,
  TestIds,
} from 'react-native-google-mobile-ads';

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

function HomeScreen() {
  const insets = useSafeAreaInsets();
  return (
    <View style={{flex: 1, backgroundColor: 'white', paddingTop: insets.top}}>
      <StatusBar barStyle={'dark-content'} backgroundColor={'white'} />
      <Appbar.Header
        style={{
          backgroundColor: 'white',
          elevation: 0,
        }}>
        <Appbar.BackAction onPress={() => {}} color={'red'} />
        <Appbar.Content title="Title" subtitle="Subtitle" />
        <Appbar.Action icon="magnify" onPress={() => {}} />
        <Appbar.Action icon="dots-vertical" onPress={() => {}} />
      </Appbar.Header>
      <Text>Home Screen</Text>
    </View>
  );
}

function DetailsScreen() {
  return (
    <View>
      <Text>Details Screen</Text>
    </View>
  );
}

const HomeStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Details" component={DetailsScreen} />
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
    <GestureHandlerRootView style={{flex: 1}}>
      <NavigationContainer>
        <AuthContext.Provider value={{state, dispatch}} />
        <AnimatedSplash
          translucent={true}
          isLoaded={ready}
          logoImage={require('./src/assets/icons/sun.png')}
          backgroundColor={'white'}
          logoHeight={100}
          logoWidth={100}>
          {HomeStack()}
        </AnimatedSplash>
        <View
          style={{
            position: 'absolute',
            bottom: 0,
            alignSelf: 'center',
            justifyContent: 'center',
          }}>
          <BannerAd unitId={TestIds.BANNER} size={BannerAdSize.BANNER} />
        </View>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
};

export default App;
