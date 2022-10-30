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

const App: () => Node = () => {
  const [ready, setReady] = useState(false);

  useEffect(() => {
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
        <View />
      </SafeAreaView>
    </AnimatedSplash>
  );
};

export default App;
