/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useState} from 'react';
import type {Node} from 'react';
import {SafeAreaView, StatusBar, View} from 'react-native';
import RNBootSplash from 'react-native-bootsplash';
import AnimatedSplash from 'react-native-animated-splash-screen';
import {Appbar} from 'react-native-paper';
import {Storages} from './src/constants/storages';
import DeviceInfo from 'react-native-device-info';

const HomeScreen = () => {
  return (
    <SafeAreaView style={'white'}>
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
      <View />
    </SafeAreaView>
  );
};

const App: () => Node = () => {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    console.log(Storages.getAllKeys());
    console.log(DeviceInfo.getBundleId());
    setTimeout(() => {
      RNBootSplash.hide({fade: true}).then(() => {
        setReady(true);
      });
    }, 500);
  }, []);

  return (
    <AnimatedSplash
      translucent={true}
      isLoaded={ready}
      logoImage={require('./src/assets/icons/sun.png')}
      backgroundColor={'white'}
      logoHeight={100}
      logoWidth={100}>
      <SafeAreaView style={'white'}>
        <StatusBar barStyle={'dark-content'} backgroundColor={'white'} />
        {HomeScreen()}
      </SafeAreaView>
    </AnimatedSplash>
  );
};

export default App;
