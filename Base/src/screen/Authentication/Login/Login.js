import {useSafeAreaInsets} from 'react-native-safe-area-context';
import React, {useMemo} from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
  Image,
  Text,
} from 'react-native';
import {Appbar, Button} from 'react-native-paper';
import Colors from '../../../constants/colors';
import Fonts from '../../../constants/fonts';
import images from '../../../constants/images';
import Strings from '../../../constants/strings';

const Login = ({navigation}) => {
  const insets = useSafeAreaInsets();

  const renderHeader = useMemo(() => {
    return (
      <View>
        <StatusBar barStyle={'dark-content'} backgroundColor={'white'} />
        <Appbar.Header style={styles.header}>
          <View style={styles.subHeader}>
            <Button
              icon="translate"
              mode="text"
              textColor={Colors.black}
              color={Colors.black}
              uppercase={false}
              labelStyle={styles.buttonLanguageStyle}
              onPress={() => console.log('Pressed')}>
              Tiếng Việt
            </Button>
          </View>
        </Appbar.Header>
      </View>
    );
  }, []);

  const renderContent = () => {
    return (
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <Image source={images.logo} style={styles.logoStyle} />
          <Text style={styles.labelHeader} numberOfLines={0}>
            {`${Strings.welcomeStatus1} ${Strings.appName}`}
          </Text>
        </View>
      </ScrollView>
    );
  };

  return (
    <View style={[styles.container, {paddingTop: insets.top}]}>
      {renderHeader}
      {renderContent()}
    </View>
  );
};
export default Login;
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
    justifyContent: 'flex-end',
    flex: 1,
    alignItems: 'center',
  },
  leftHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  content: {flex: 1},
  buttonSetting: {
    borderRadius: 50,
    marginTop: 50,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  buttonTitle: {
    color: Colors.white,
    fontSize: 13,
    textTransform: 'none',
  },
  buttonLanguageStyle: {fontSize: 14, fontFamily: Fonts.Medium},
  logoStyle: {
    alignSelf: 'center',
    width: 90,
    height: 90,
    resizeMode: 'contain',
    marginTop: 30,
    marginBottom: 20,
  },
  labelHeader: {
    fontSize: 26,
    textAlign: 'center',
    alignSelf: 'center',
    marginTop: 10,
    fontFamily: Fonts.Medium,
  },
});
