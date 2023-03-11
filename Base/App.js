/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useReducer, useState} from 'react';
import type {Node} from 'react';
import {ActivityIndicator, Image, StatusBar, Text, View} from 'react-native';
import RNBootSplash from 'react-native-bootsplash';
import AnimatedSplash from 'react-native-animated-splash-screen';
import {Appbar} from 'react-native-paper';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {AuthContext} from './src/api/Authenticate';
import {createStackNavigator} from '@react-navigation/stack';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Storages} from './src/constants/storages';
import Cache from './src/commons/Cache';

const viLocale = require('moment/locale/vi');
const enLocale = require('moment/locale/es-us');

const initializeState = {
  user: Storages.getString('userInfo')
    ? JSON.parse(Storages.getString('userInfo'))
    : null,
};
const Stack = createStackNavigator();

const reducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      if (action.payload.user) {
        Storages.set('userInfo', JSON.stringify(action.payload.user));
      }
      return {
        ...state,
        user: action.payload.user,
      };
    case 'REGISTER':
      if (action.payload.user) {
        Storages.set('userInfo', JSON.stringify(action.payload.user));
      }
      return {
        ...state,
        user: action.payload.user,
      };
    case 'LOGOUT':
      Cache.clearCache();
      return {
        ...state,
        user: null,
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
    // <SafeAreaView style={'white'}>
    //
    //   <View>
    //     <TouchableOpacity
    //       style={{
    //         paddingVertical: 12,
    //         paddingHorizontal: 20,
    //         backgroundColor: 'red',
    //         alignSelf: 'center',
    //         marginTop: 40,
    //       }}
    //       onPress={() => {
    //         MultipleImagePicker.openPicker([
    //           {
    //             selectedAssets: [],
    //             usedCameraButton: true,
    //             mediaType: 'image',
    //           },
    //         ])
    //           .then(response => {
    //             console.log('Response: ', response);
    //           })
    //           .catch(error => {
    //             console.log('Error: ', error);
    //           });
    //       }}>
    //       <Text
    //         style={{fontFamily: Fonts.Regular, color: 'white', fontSize: 13}}>
    //         Open Image picker
    //       </Text>
    //     </TouchableOpacity>
    //   </View>
    // </SafeAreaView>
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
    }, 5000);
  }, []);

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <NavigationContainer>
        <AuthContext.Provider value={{state, dispatch}} />
        <AnimatedSplash
          preload={true}
          translucent={true}
          isLoaded={ready}
          // logoImage={require('./src/assets/icons/sun.png')}
          backgroundColor={'white'}
          // logoHeight={100}
          // logoWidth={100}
          customComponent={
            <View
              style={{
                justifyContent: 'center',
                alignSelf: 'center',
                alignItems: 'center',
              }}>
              <Image
                source={require('./src/assets/icons/sun.png')}
                style={{width: 100, height: 100, tintColor: 'gray'}}
              />
              <ActivityIndicator
                animating={true}
                color={'gray'}
                style={{marginTop: 20, alignSelf: 'center'}}
              />
            </View>
          }>
          {HomeStack()}
        </AnimatedSplash>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
};

export default App;
