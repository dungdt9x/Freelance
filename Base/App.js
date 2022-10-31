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
import { useSafeAreaInsets } from 'react-native-safe-area-context';

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
          {/*<SafeAreaView style={'white'}>*/}
          {/*  <StatusBar barStyle={'dark-content'} backgroundColor={'white'} />*/}
          {HomeStack()}
          {/*</SafeAreaView>*/}
        </AnimatedSplash>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
};

export default App;
