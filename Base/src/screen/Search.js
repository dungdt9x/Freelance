import React from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {
  StatusBar,
  View,
  StyleSheet,
  DeviceEventEmitter,
  Text,
  Dimensions,
} from 'react-native';
import {Appbar, IconButton} from 'react-native-paper';
import fonts from '../constants/fonts';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import strings from '../constants/strings';
import keys from '../constants/keys';
import colors from '../constants/colors';
import {Storages} from '../constants/storages';

const Search = ({navigation}) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, {paddingTop: insets.top}]}>
      <StatusBar barStyle={'dark-content'} backgroundColor={'white'} />
      <Appbar.Header style={styles.header}>
        <Appbar.BackAction
          onPress={() => {
            navigation.pop();
          }}
          color={'red'}
        />
        <Appbar.Content
          title={strings.search}
          subtitle={strings.enterLocation}
        />
        <IconButton
          icon="map-marker-radius"
          color={colors.red}
          size={25}
          onPress={() => console.log('Pressed')}
        />
      </Appbar.Header>
      <View style={{flex: 1, marginHorizontal: 12, marginTop: 12}}>
        <GooglePlacesAutocomplete
          placeholder={strings.search}
          minLength={2}
          autoFocus={false}
          returnKeyType={'default'}
          fetchDetails={true}
          keepResultsAfterBlur={true}
          textInputProps={{
            color: colors.black,
          }}
          renderRow={(data, index) => (
            <Text
              style={{
                fontSize: 14,
                fontFamily: fonts.Regular,
                color: colors.black,
                maxWidth: Dimensions.get('window').width - 50,
              }}
              numberOfLines={1}>
              {data.description}
            </Text>
          )}
          styles={{
            textInputContainer: {
              backgroundColor: colors.white,
            },
            textInput: {
              height: 38,
              backgroundColor: colors.lightGray2,
              color: colors.black,
              fontSize: 14,
              fontsFamily: fonts.Regular,
            },
            predefinedPlacesDescription: {
              color: '#1faadb',
            },
          }}
          query={{
            key: keys.googleMapAPIKey,
            language: strings.getLanguage(),
          }}
          onPress={(value, detail) => {
            if (detail) {
              let {geometry} = detail;
              if (geometry) {
                let {location} = geometry;
                let object = {
                  latitude: location.lat,
                  longitude: location.lng,
                };
                Storages.set('lastLocation', JSON.stringify(object));
                DeviceEventEmitter.emit('updateLocation', object);
                setTimeout(() => {
                  navigation.pop();
                }, 200);
              }
            } else {
              navigation.pop();
            }
          }}
        />
      </View>
    </View>
  );
};

export default Search;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    backgroundColor: 'white',
    elevation: 0,
  },
});
