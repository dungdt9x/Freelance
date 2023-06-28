import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Loading from './Loading';
import Api from '../api/Api';
import LinearGradient from 'react-native-linear-gradient';
import helper from '../ultity/helper';
import Lottie from 'lottie-react-native';
import fonts from '../constants/fonts';
import colors from '../constants/colors';
import device from '../constants/device';
import {IconButton} from 'react-native-paper';
import images from '../constants/images';
import _ from 'lodash';
import strings from '../constants/strings';

const Weather = location => {
  const [weather, setWeather] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (location) {
      getWeatherWithLocation(location);
    }
  }, [location]);

  const renderTemperature = () => {
    if (!weather || !weather.main || !weather.main.temp) {
      return null;
    }
    return (
      <View style={styles.temperatureView}>
        <Text style={styles.temperatureText}>
          {weather.main.temp.toFixed(0)}°c
        </Text>
        <Text style={styles.temperatureLikeText}>
          {`${strings.feelLike} ${weather.main.feels_like.toFixed(0)}°c`}
        </Text>
        <Lottie source={images.wind} autoPlay loop style={styles.windIcon} />
      </View>
    );
  };

  const renderWeatherIcon = () => {
    let object = helper.getIconAndTextFromDataWeather(weather);
    return (
      <View
        style={{
          maxWidth: device.width / 2,
          height: object.small ? 250 : 200,
          marginTop: device.iOS
            ? object.big
              ? 6
              : -40
            : object.small
            ? -110
            : -60,
        }}>
        <Lottie
          source={object.icon}
          autoPlay
          loop
          style={{
            width: object.small ? 250 : object.big ? 150 : 200,
            height: object.small ? 250 : object.big ? 150 : 200,
            marginLeft: object.small || object.left === -10 ? -10 : 0,
          }}
        />
        <View style={{marginTop: object.small ? -40 : object.big ? 6 : -30}}>
          <Text style={styles.weatherTextStatus}>{object.text}</Text>
        </View>
      </View>
    );
  };

  const renderContent = () => {
    return (
      <View style={styles.mainContent}>
        <View style={styles.content}>
          <LinearGradient
            start={{x: 0.0, y: 0.1}}
            end={{x: 0.7, y: 1.0}}
            locations={[0, 0.4, 0.8, 1.0]}
            colors={['#ea74e8', '#ba92ee', '#9a65de', '#5D69DC']}
            style={styles.weatherBlock}>
            <View style={styles.viewSmallContent}>
              {renderWeatherIcon()}
              {renderTemperature()}
            </View>
          </LinearGradient>
        </View>
        <View style={styles.spacer} />
        <View style={[styles.content, {shadowRadius: 1}]}>
          <LinearGradient
            start={{x: 0.0, y: 0.1}}
            end={{x: 0.7, y: 1.0}}
            locations={[0, 1.0]}
            colors={['#fff', '#fff']}
            style={styles.weatherBlock}>
            <View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 8,
                }}>
                <IconButton
                  icon="weather-snowy-rainy"
                  size={21}
                  color={colors.gray}
                />
                <Text
                  style={{
                    fontSize: 16,
                    fontFamily: fonts.Regular,
                    color: colors.black,
                  }}>
                  {strings.airQuality}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingRight: 12,
                  marginRight: 6,
                  justifyContent: 'space-between',
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    width: (device.width - 24) / 3,
                  }}>
                  <IconButton icon="thermometer" size={21} color={'#B19BE2'} />
                  <View>
                    <Text
                      style={{
                        fontSize: 11,
                        fontFamily: fonts.Regular,
                        color: colors.gray,
                      }}>
                      {strings.atmospheric}
                    </Text>
                    <Text
                      style={{
                        fontSize: 13,
                        fontFamily: fonts.Regular,
                        color: colors.black,
                        marginTop: 4,
                      }}>
                      {weather.main.pressure} hPa
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    width: (device.width - 24) / 3,
                  }}>
                  <IconButton
                    icon="water-percent"
                    size={21}
                    color={'#B19BE2'}
                  />
                  <View>
                    <Text
                      style={{
                        fontSize: 11,
                        fontFamily: fonts.Regular,
                        color: colors.gray,
                      }}>
                      {strings.humidity}
                    </Text>
                    <Text
                      style={{
                        fontSize: 13,
                        fontFamily: fonts.Regular,
                        color: colors.black,
                        marginTop: 4,
                      }}>
                      {weather.main.humidity}%
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    width: (device.width - 24) / 3,
                  }}>
                  <IconButton
                    icon="cloud-outline"
                    size={21}
                    color={colors.bluePurple}
                  />
                  <View>
                    <Text
                      style={{
                        fontSize: 11,
                        fontFamily: fonts.Regular,
                        color: colors.gray,
                      }}>
                      {strings.cloudiness}
                    </Text>
                    <Text
                      style={{
                        fontSize: 13,
                        fontFamily: fonts.Regular,
                        color: colors.black,
                        marginTop: 4,
                      }}>
                      {weather.clouds.all}%
                    </Text>
                  </View>
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingRight: 12,
                  marginRight: 6,
                  marginTop: 4,
                  justifyContent: 'space-between',
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    width: (device.width - 24) / 3,
                  }}>
                  <IconButton
                    icon="speedometer-medium"
                    size={21}
                    color={'#B19BE2'}
                  />
                  <View>
                    <Text
                      style={{
                        fontSize: 11,
                        fontFamily: fonts.Regular,
                        color: colors.gray,
                      }}>
                      {strings.winSpeed}
                    </Text>
                    <Text
                      style={{
                        fontSize: 13,
                        fontFamily: fonts.Regular,
                        color: colors.black,
                        marginTop: 4,
                      }}>
                      {weather.wind.speed} m/s
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    width: (device.width - 24) / 3,
                  }}>
                  <IconButton
                    icon="sign-direction"
                    size={21}
                    color={'#B19BE2'}
                  />
                  <View>
                    <Text
                      style={{
                        fontSize: 11,
                        fontFamily: fonts.Regular,
                        color: colors.gray,
                      }}>
                      {strings.windDirection}
                    </Text>
                    <Text
                      style={{
                        fontSize: 13,
                        fontFamily: fonts.Regular,
                        color: colors.black,
                        marginTop: 4,
                      }}>
                      {weather.wind.deg}°
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    width: (device.width - 24) / 3,
                  }}>
                  <IconButton icon="fan" size={21} color={colors.bluePurple} />
                  <View>
                    <Text
                      style={{
                        fontSize: 11,
                        fontFamily: fonts.Regular,
                        color: colors.gray,
                      }}>
                      {strings.windGust}
                    </Text>
                    <Text
                      style={{
                        fontSize: 13,
                        fontFamily: fonts.Regular,
                        color: colors.black,
                        marginTop: 4,
                      }}>
                      {weather.wind.gust} m/s
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </LinearGradient>
        </View>
      </View>
    );
  };

  // wind.gust

  const getWeatherWithLocation = value => {
    if (!value) {
      return;
    }
    let {latitude, longitude} = value;
    if (value.location) {
      latitude = value.location.latitude;
      longitude = value.location.longitude;
    }

    Api.getCurrentWeather(latitude, longitude)
      .then(response => {
        let result = response.data;
        if (result) {
          setWeather(result);
        }
        setIsLoading(false);
      })
      .catch(error => {
        console.log('error get current Weather: ', error.message);
      });
  };

  const renderLoading = () => {
    return (
      <View>
        <Loading />
        <View style={styles.spacer} />
        <Loading />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {isLoading ? renderLoading() : renderContent()}
    </View>
  );
};

export default Weather;

const styles = StyleSheet.create({
  container: {
    marginTop: device.iOS ? 12 : 24,
  },
  content: {
    borderWidth: 0.5,
    borderRadius: 20,
    borderColor: '#ddd',
    borderBottomWidth: 1,
    shadowColor: '#000000',
    shadowOffset: {
      width: 1,
      height: 2,
    },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    marginHorizontal: 12,
    minHeight: 150,
  },
  spacer: {height: 16},
  weatherBlock: {
    flex: 1,
    borderRadius: 20,
  },
  weatherTextStatus: {
    fontSize: 16,
    fontFamily: fonts.Medium,
    color: colors.white,
    marginLeft: 12,
    textTransform: 'capitalize',
  },
  mainContent: {marginTop: 24},
  temperatureView: {paddingRight: 12, paddingTop: 12},
  temperatureText: {
    fontSize: 34,
    fontFamily: fonts.Medium,
    color: colors.white,
    textAlign: 'right',
  },
  temperatureLikeText: {
    fontSize: 13,
    fontFamily: fonts.Regular,
    color: colors.white,
    textAlign: 'right',
  },
  windIcon: {
    marginTop: 6,
    width: 100,
    height: 100,
  },
  viewSmallContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
