import React, {useEffect, useMemo, useState} from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {
  StatusBar,
  View,
  StyleSheet,
  ScrollView,
  DeviceEventEmitter,
  Text,
} from 'react-native';
import {Appbar, IconButton, Button} from 'react-native-paper';
import colors from '../constants/colors';
import fonts from '../constants/fonts';
import {Storages} from '../constants/storages';
import _ from 'lodash';
import Lottie from 'lottie-react-native';
import images from '../constants/images';
import Place from '../component/Place';
import device from '../constants/device';
import Weather from '../component/Weather';
import HourlyWeather from '../component/HourlyWeather';
import {AdEventType, InterstitialAd} from 'react-native-google-mobile-ads';
import keys from '../constants/keys';
import Api from '../api/Api';
import strings from '../constants/strings';

const interstitial = InterstitialAd.createForAdRequest(
  device.iOS ? keys.iOS_FEATURE_OPEN_ID : keys.FEATURE_OPEN_ID,
  {
    requestNonPersonalizedAdsOnly: true,
    keywords: keys.adKeys,
  },
);

const Home = ({navigation}) => {
  const insets = useSafeAreaInsets();
  const lastLocation = JSON.parse(Storages.getString('lastLocation') ?? '{}');
  const [currentLocation, setCurrentLocation] = useState(lastLocation);

  useEffect(() => {
    return interstitial.addAdEventListener(AdEventType.LOADED, () => {
      interstitial.show().then();
    });
  }, []);

  useEffect(() => {
    if (_.isEmpty(currentLocation)) {
      getCurrentLocation();
    }
  }, [currentLocation]);

  useEffect(() => {
    let listenEvent = DeviceEventEmitter.addListener(
      'updateLocation',
      value => {
        if (value) {
          setCurrentLocation(value);
        }
      },
    );
    return () => {
      listenEvent.remove();
    };
  }, []);

  const getCurrentLocation = () => {
    Api.getLocationFromIP()
      .then(response => {
        let {result, success} = response.data;
        if (result && success) {
          let location = {
            latitude: result.latitude,
            longitude: result.longitude,
          };
          setCurrentLocation(location);
          Storages.set('lastLocation', JSON.stringify(location));
        }
      })
      .catch(() => {});
  };

  const renderHeader = useMemo(() => {
    return (
      <View>
        <StatusBar barStyle={'dark-content'} backgroundColor={'white'} />
        <Appbar.Header style={styles.header}>
          <View style={styles.subHeader}>
            <View style={styles.leftHeader}>
              <IconButton
                icon="map-marker-radius"
                color={colors.red}
                size={25}
                onPress={() => {
                  interstitial.load();
                  navigation.push('Search');
                }}
              />
              <Place location={currentLocation} />
            </View>
            <Appbar.Action
              icon="magnify"
              onPress={() => {
                interstitial.load();
                navigation.push('Search');
              }}
            />
          </View>
        </Appbar.Header>
      </View>
    );
  }, [currentLocation, navigation]);

  const renderContent = () => {
    return (
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}>
        <View style={styles.content}>{renderData}</View>
      </ScrollView>
    );
  };

  const renderData = useMemo(() => {
    if (_.isEmpty(currentLocation)) {
      return (
        <View style={styles.blockStyle}>
          <Lottie
            source={images.location}
            autoPlay
            loop
            style={styles.locationIcon}
          />
          <Text style={styles.subTitleBlock}>
            {strings.permissionDeniedSubTitle}
          </Text>
          <Button
            icon="map-search-outline"
            mode="contained"
            style={styles.buttonSetting}
            labelStyle={styles.buttonTitle}
            onPress={() => {
              interstitial.load();
              navigation.push('Search');
            }}>
            {strings.openSettings}
          </Button>
        </View>
      );
    }
    return (
      <View style={styles.contentView}>
        <Weather location={currentLocation} />
        <HourlyWeather location={currentLocation} />
      </View>
    );
  }, [currentLocation, navigation]);

  return (
    <View style={[styles.container, {paddingTop: insets.top}]}>
      {renderHeader}
      {renderContent()}
    </View>
  );
};

export default Home;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    backgroundColor: 'white',
    elevation: 0,
  },
  subHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
    alignItems: 'center',
  },
  leftHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  content: {flex: 1},
  contentView: {paddingBottom: 80},
  blockStyle: {
    width: device.width,
    height: device.height / 2 > 300 ? device.height / 2 : 300,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 100,
  },
  iconBlock: {width: 120, height: 120, alignSelf: 'center'},
  titleBlock: {fontFamily: fonts.Medium, color: colors.red, fontSize: 15},
  subTitleBlock: {
    fontFamily: fonts.Regular,
    color: colors.bluePurple,
    fontSize: 14,
    textAlign: 'center',
    marginHorizontal: 24,
    marginTop: 8,
  },
  buttonSetting: {
    backgroundColor: colors.lightPurple,
    borderRadius: 50,
    marginTop: 50,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  buttonTitle: {
    fontFamily: fonts.Regular,
    color: colors.white,
    fontSize: 13,
    textTransform: 'none',
  },
  locationIcon: {
    width: 200,
    height: 200,
    alignSelf: 'center',
  },
});
