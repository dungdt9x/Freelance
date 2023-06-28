import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import moment from 'moment/moment';
import fonts from '../constants/fonts';
import colors from '../constants/colors';
import device from '../constants/device';
import Api from '../api/Api';
import {
  Fade,
  Placeholder,
  PlaceholderLine,
  PlaceholderMedia,
} from 'rn-placeholder';
import strings from '../constants/strings';

const Place = ({location}) => {
  const [loading, setLoading] = useState(true);
  const [address, setAddress] = useState(null);

  useEffect(() => {
    if (location) {
      getAddress(location);
    }
  }, [location]);

  const getAddress = value => {
    if (!value) {
      return;
    }

    let {latitude, longitude} = value;
    if (value.location) {
      latitude = value.location.latitude;
      longitude = value.location.longitude;
    }

    Api.getAddressFromLocation(latitude, longitude)
      .then(response => {
        let {results} = response.data;
        if (results) {
          setAddress(results);
        }
        setLoading(false);
      })
      .catch(error => {
        console.log('Error get Place: ', error);
        setLoading(false);
      });
  };

  const getAddressName = () => {
    if (!address || address.length === 0) {
      return strings.updating;
    }

    let findAddress = address.find(
      add =>
        add &&
        add.types &&
        add.types.length > 0 &&
        add.types.find(d => d && d === 'administrative_area_level_3'),
    );

    if (!findAddress) {
      findAddress = address.find(
        add =>
          add &&
          add.types &&
          add.types.length > 0 &&
          add.types.find(d => d && d === 'administrative_area_level_2'),
      );
    }

    if (findAddress) {
      return findAddress.formatted_address;
    }
    return strings.updating;
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <View style={styles.container}>
          <Placeholder
            style={styles.loadingHolderBlock}
            Animation={Fade}
            Left={PlaceholderMedia}>
            <PlaceholderLine width={40} style={styles.loadingHolderLine1} />
            <PlaceholderLine width={60} style={styles.loadingHolderLine2} />
          </Placeholder>
        </View>
      ) : (
        <View>
          <Text numberOfLines={1} style={styles.locationHeaderText}>
            {getAddressName()}
          </Text>
          <Text style={styles.timeHeaderText} numberOfLines={1}>
            {moment(new Date()).local().format('dddd, DD MMMM YYYY')}
          </Text>
        </View>
      )}
    </View>
  );
};

export default Place;

const styles = StyleSheet.create({
  locationHeaderText: {
    fontSize: 16,
    fontFamily: fonts.Medium,
    color: colors.black,
  },
  timeHeaderText: {
    fontSize: 13,
    fontFamily: fonts.Regular,
    color: colors.gray,
    marginLeft: 2,
    textTransform: 'capitalize',
  },
  container: {maxWidth: device.width - 120},
  loadingHolderBlock: {marginTop: 16, marginLeft: 16},
  loadingHolderLine1: {marginTop: 2, marginLeft: 16},
  loadingHolderLine2: {marginTop: 0, marginLeft: 16},
});
