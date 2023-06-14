import React, {useEffect, useMemo, useState} from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {
  StatusBar,
  Text,
  View,
  StyleSheet,
  ScrollView,
  DeviceEventEmitter,
} from 'react-native';
import {Appbar, Button, IconButton} from 'react-native-paper';
import colors from '../constants/colors';
import fonts from '../constants/fonts';
import {
  check,
  PERMISSIONS,
  request,
  RESULTS,
  openSettings,
} from 'react-native-permissions';
import GetLocation from 'react-native-get-location';
import {Storages} from '../constants/storages';
import _ from 'lodash';
import Lottie from 'lottie-react-native';
import images from '../constants/images';
import strings from '../constants/strings';
import Place from '../component/Place';
import device from '../constants/device';
import Weather from '../component/Weather';
import HourlyWeather from '../component/HourlyWeather';
import {AdEventType, InterstitialAd} from 'react-native-google-mobile-ads';
import keys from '../constants/keys';

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
  const [blocked, setBlocked] = useState(
    _.isEmpty(lastLocation) ? null : false,
  );

  useEffect(() => {
    return interstitial.addAdEventListener(AdEventType.LOADED, () => {
      interstitial.show().then();
    });
  }, []);

  useEffect(() => {
    if (_.isEmpty(currentLocation)) {
      checkAndRequestPermission();
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

  const checkAndRequestPermission = () => {
    if (device.iOS) {
      check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE).then(result => {
        switch (result) {
          case RESULTS.GRANTED:
            console.log('The permission is granted');
            getCurrentLocation();
            break;
          default:
            request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE).then(response => {
              if (response === RESULTS.GRANTED) {
                getCurrentLocation();
              } else {
                setBlocked(true);
              }
            });
            break;
        }
      });
    } else {
      check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION).then(result => {
        switch (result) {
          case RESULTS.GRANTED:
            console.log('The permission is granted');
            getCurrentLocation();
            break;
          default:
            request(PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION).then(
              response => {
                if (response === RESULTS.GRANTED) {
                  getCurrentLocation();
                } else {
                  setBlocked(true);
                }
              },
            );
            break;
        }
      });
    }
  };

  const getCurrentLocation = () => {
    setBlocked(false);
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 60000,
    })
      .then(location => {
        setCurrentLocation(location);
        Storages.set('lastLocation', JSON.stringify(location));
      })
      .catch(error => {
        const {code, message} = error;
        console.warn(code, message);
      });
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
  }, [lastLocation]);

  const renderContent = () => {
    return (
      <ScrollView>
        <View style={styles.content}>{renderData}</View>
      </ScrollView>
    );
  };

  const renderData = useMemo(() => {
    if (blocked === null) {
      return (
        <View style={styles.blockStyle}>
          <Lottie
            source={images.location}
            autoPlay
            loop
            style={styles.locationIcon}
          />
        </View>
      );
    }
    if (blocked) {
      return (
        <View style={styles.blockStyle}>
          <Lottie source={images.sad} autoPlay loop style={styles.iconBlock} />
          <Text style={styles.titleBlock}>{strings.permissionDeniedTitle}</Text>
          <Text style={styles.subTitleBlock}>
            {strings.permissionDeniedSubTitle}
          </Text>
          <Button
            icon="cog"
            mode="contained"
            style={styles.buttonSetting}
            labelStyle={styles.buttonTitle}
            onPress={() => {
              openSettings().catch(() => console.warn('cannot open settings'));
            }}>
            {strings.openSettings}
          </Button>
        </View>
      );
    }
    return (
      <View style={{paddingBottom: 80}}>
        <Weather location={currentLocation} />
        <HourlyWeather location={currentLocation} />
      </View>
    );
  }, [blocked, currentLocation]);

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
  blockStyle: {
    width: device.width,
    height: 300,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 100,
  },
  iconBlock: {width: 120, height: 120, alignSelf: 'center'},
  titleBlock: {fontFamily: fonts.Medium, color: colors.red, fontSize: 15},
  subTitleBlock: {
    fontFamily: fonts.Regular,
    color: colors.orange,
    fontSize: 12,
    textAlign: 'center',
    marginHorizontal: 24,
    marginTop: 8,
  },
  buttonSetting: {
    backgroundColor: colors.gray,
    borderRadius: 50,
    marginTop: 50,
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
