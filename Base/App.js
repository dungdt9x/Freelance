/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useMemo, useReducer, useState} from 'react';
import type {Node} from 'react';
import {StatusBar, StyleSheet, Text, View} from 'react-native';
import RNBootSplash from 'react-native-bootsplash';
import AnimatedSplash from 'react-native-animated-splash-screen';
import {Appbar} from 'react-native-paper';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';
import {NavigationContainer} from '@react-navigation/native';
import {AuthContext} from './src/commons/Authenticate';
import {createStackNavigator} from '@react-navigation/stack';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Storages} from './src/commons/Storages';
import Cache from './src/commons/Cache';
import Keys from './src/constants/Keys';
import SplashLoading from './src/Components/SplashLoading';
import PreloadData from './src/commons/PreloadData';
import Locale from './src/commons/Locale';
import LoginScreen from './src/screen/Authorization/LoginScreen';

const initializeState = {
  user: Storages.getString(Keys.USER_INFO)
    ? JSON.parse(Storages.getString(Keys.USER_INFO))
    : null,
};
const Stack = createStackNavigator();

const reducer = (state, action) => {
  switch (action.type) {
    case Keys.LOGIN:
      if (action.payload.user) {
        Storages.set('userInfo', JSON.stringify(action.payload.user));
      }
      return {
        ...state,
        user: action.payload.user,
      };
    case Keys.REGISTER:
      if (action.payload.user) {
        Storages.set('userInfo', JSON.stringify(action.payload.user));
      }
      return {
        ...state,
        user: action.payload.user,
      };
    case Keys.LOGOUT:
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
  );
};

const AuthenticateStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="LoginScreen"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Home" component={LoginScreen} />
    </Stack.Navigator>
  );
};

Locale.updateAppLanguage();

const App: () => Node = () => {
  const [ready, setReady] = useState(false);
  const [state, dispatch] = useReducer(reducer, initializeState);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    PreloadData.preloadData()
      .then(() => {
        setTimeout(() => {
          RNBootSplash.hide({fade: true}).then(() => {
            setReady(true);
          });
        }, 100);
      })
      .catch(() => {
        setTimeout(() => {
          RNBootSplash.hide({fade: true}).then(() => {
            setReady(true);
          });
        }, 100);
      });
  };

  const MainStacks = useMemo(() => {
    if (!state) {
      return AuthenticateStack();
    }

    if (!state.user) {
      return AuthenticateStack();
    }

    return HomeStack();
  }, [state]);

  const renderSplashContent = useMemo(() => {
    return <SplashLoading />;
  }, []);

  return (
    <GestureHandlerRootView style={styles.container}>
      <PaperProvider>
        <NavigationContainer>
          <AuthContext.Provider value={{state, dispatch}} />
          <AnimatedSplash
            preload={true}
            translucent={true}
            isLoaded={ready}
            backgroundColor={'white'}
            customComponent={renderSplashContent}>
            {MainStacks}
          </AnimatedSplash>
        </NavigationContainer>
      </PaperProvider>
    </GestureHandlerRootView>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
