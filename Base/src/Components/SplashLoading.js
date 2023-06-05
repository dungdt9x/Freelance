import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';
import Colors from '../constants/Colors';
import Images from '../constants/Images';

const SplashLoading = () => {
  return (
    <View style={styles.container}>
      <Image source={Images.logo} style={styles.logo} />
      <ActivityIndicator
        animating={true}
        size={15}
        color={Colors.appColor}
        style={styles.loadingIndicator}
      />
    </View>
  );
};

export default SplashLoading;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 137,
    height: 68,
    resizeMode: 'contain',
  },
  loadingIndicator: {
    marginTop: 30,
    alignSelf: 'center',
  },
});
