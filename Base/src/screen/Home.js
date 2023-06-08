import React, {useEffect} from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {
  StatusBar,
  Text,
  View,
  StyleSheet,
  ScrollView,
  Platform,
} from 'react-native';
import {Appbar, Button, IconButton, TouchableRipple} from 'react-native-paper';
import colors from '../constants/colors';
import moment from 'moment';
import fonts from '../constants/fonts';
import {check, PERMISSIONS, request} from 'react-native-permissions';

const Home = () => {
  const insets = useSafeAreaInsets();

  useEffect(() => {
    if (Platform.OS === 'ios') {
      check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE).then(result => {
        console.log('RESULT: ', result);
      });
    } else {
      check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION).then(result => {});
    }

    // request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE).then(result => {
    //   console.log('DDDD: ', result);
    //   // …
    // });
  }, []);

  const renderHeader = () => {
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
                onPress={() => console.log('Pressed')}
              />
              <View>
                <Text style={styles.locationHeaderText}>Ha Noi</Text>
                <Text style={styles.timeHeaderText}>
                  {moment(new Date()).local().format('dddd, DD MMMM YYYY')}
                </Text>
              </View>
            </View>
            <Appbar.Action icon="magnify" onPress={() => {}} />
          </View>
        </Appbar.Header>
      </View>
    );
  };

  const renderContent = () => {
    return (
      <ScrollView>
        <View />
      </ScrollView>
    );
  };

  return (
    <View style={[styles.container, {paddingTop: insets.top}]}>
      {renderHeader()}
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
  locationHeaderText: {
    fontSize: 18,
    fontFamily: fonts.Medium,
    color: colors.black,
  },
  timeHeaderText: {
    fontSize: 13,
    fontFamily: fonts.Regular,
    color: colors.gray,
  },
});
