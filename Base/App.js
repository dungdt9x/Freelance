/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useReducer, useState} from 'react';
import type {Node} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import RNBootSplash from 'react-native-bootsplash';
import AnimatedSplash from 'react-native-animated-splash-screen';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {AuthContext} from './src/api/Authenticate';
import {createStackNavigator} from '@react-navigation/stack';
import images from './src/constants/images';
import Colors from './src/constants/colors';
import {Storages} from './src/constants/storages';
import _ from 'lodash';
import Login from './src/screen/Authentication/Login/Login';
import Strings from './src/constants/strings';

const initializeState = {
  user: Storages.getString('userInfo')
    ? JSON.parse(Storages.getString('userInfo'))
    : null,
};
const Stack = createStackNavigator();

const reducer = (state, action) => {
  switch (action.type) {
    case '':
      return {
        ...state,
      };
    default:
      return state;
  }
};

function Authentication() {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Login" component={Login} />
    </Stack.Navigator>
  );
}

function DetailsScreen() {
  return (
    <View>
      <Text>Details Screen</Text>
    </View>
  );
}

const App: () => Node = () => {
  const [ready, setReady] = useState(false);
  const [state, dispatch] = useReducer(reducer, initializeState);

  useEffect(() => {
    let currentLanguage = Storages.getString('currentLanguage');
    if (currentLanguage) {
      Strings.setLanguage(currentLanguage);
    } else {
      Storages.set('currentLanguage', 'vi');
      Strings.setLanguage('vi');
    }
  }, []);

  const hideSplash = () => {
    setTimeout(() => {
      RNBootSplash.hide({fade: true}).then(() => {
        setReady(true);
      });
    }, 200);
  };

  const AppStack = () => {
    if (
      state.user === null ||
      state.user === undefined ||
      _.isEmpty(state.user)
    ) {
      return Authentication();
    }

    return (
      <Stack.Navigator
        initialRouteName="DetailsScreen"
        screenOptions={{headerShown: false}}>
        {/*<Stack.Screen name="Home" component={HomeScreen} />*/}
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator>
    );
  };

  return (
    <GestureHandlerRootView style={styles.root}>
      <NavigationContainer
        onReady={() => {
          hideSplash();
        }}>
        <AuthContext.Provider value={{state, dispatch}} />
        <AnimatedSplash
          translucent={true}
          isLoaded={ready}
          logoImage={images.tictop_logo_brand}
          backgroundColor={Colors.white}
          logoHeight={128}
          logoWidth={240}>
          {AppStack()}
        </AnimatedSplash>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
};

export default App;

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});
