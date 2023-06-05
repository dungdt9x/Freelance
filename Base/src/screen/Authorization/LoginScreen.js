import React, {useMemo, useRef, useState} from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {StatusBar, StyleSheet, Image, View, Text} from 'react-native';
import {Appbar, Portal, TextInput, TouchableRipple} from 'react-native-paper';
import Languages from '../../constants/Languages';
import Images from '../../constants/Images';
import Colors from '../../constants/Colors';
import RNAnimated from 'react-native-animated-component';
import Fonts from '../../constants/Fonts';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Modalize} from 'react-native-modalize';
import PopupSelectLanguage from '../../Components/Popup/PopupSelectLanguage';

const LoginScreen = () => {
  const insets = useSafeAreaInsets();
  let languageRef = useRef(null);
  const [currentLanguage, setCurrentLanguage] = useState(
    Languages.getLanguage(),
  );
  const [email, setEmail] = useState(null);
  const [errorEmail, setErrorEmail] = useState(false);

  const renderHeader = useMemo(() => {
    console.log('currentLanguage: ', currentLanguage);
    return (
      <View>
        <StatusBar barStyle={'dark-content'} backgroundColor={'white'} />
        <Appbar.Header style={styles.header}>
          <View />
          <TouchableRipple
            onPress={() => {
              console.log('Pressed');
              languageRef.current?.open();
            }}
            rippleColor={Colors.lightGray}
            style={styles.flagButton}>
            <Image
              source={
                Languages.getLanguage() === 'vi'
                  ? Images.vietnamese
                  : Images.england
              }
              style={styles.flagIcon}
            />
          </TouchableRipple>
        </Appbar.Header>
      </View>
    );
  }, [currentLanguage]);

  const renderLogo = useMemo(() => {
    console.log(currentLanguage);
    return (
      <View>
        <RNAnimated appearFrom={'top'} animationDuration={300}>
          <Image source={Images.whiteLogo} style={styles.logo} />
          <Text style={styles.loginText}>{Languages.login}</Text>
        </RNAnimated>
      </View>
    );
  }, [currentLanguage]);

  const validateEmail = () => {
    // if (email && email.length > 0) {
    //   console.log(email);
    //   setErrorEmail(true);
    // } else {
    //   setErrorEmail(false);
    // }
  };

  const renderEmailInput = useMemo(() => {
    return (
      <View>
        <TextInput
          mode={'outlined'}
          label={
            <Text style={styles.emailTextLabel}>{Languages.emailOrId}</Text>
          }
          value={email}
          error={errorEmail}
          placeholder={'Email'}
          onChangeText={text => {
            console.log('TEXT: ', text);
            setErrorEmail(false);
            setEmail(text);
          }}
          outlineColor={Colors.lightGray}
          activeOutlineColor={Colors.border}
          style={styles.emailInput}
          textContentType="emailAddress"
          keyboardType={'email-address'}
          onEndEditing={validateEmail}
          autoCapitalize={'none'}
        />
      </View>
    );
  }, [errorEmail, email]);
  const renderContent = () => {
    return (
      <KeyboardAwareScrollView>
        <View style={{marginTop: 24, padding: 12}}>{renderEmailInput}</View>
      </KeyboardAwareScrollView>
    );
  };

  const renderPopupLanguage = () => {
    return (
      <Portal>
        <Modalize
          handlePosition={'inside'}
          ref={languageRef}
          adjustToContentHeight={true}
          scrollViewProps={{
            keyboardShouldPersistTaps: 'handle',
          }}>
          <PopupSelectLanguage
            onSelect={item => {
              console.log(item);
            }}
            currentId={currentLanguage}
          />
        </Modalize>
      </Portal>
    );
  };
  return (
    <View style={[styles.container, {paddingTop: insets.top}]}>
      {renderHeader}
      {renderLogo}
      {renderContent()}
      {renderPopupLanguage()}
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: 'white'},
  header: {
    backgroundColor: 'white',
    elevation: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  flagButton: {
    padding: 8,
    borderRadius: 20,
    marginRight: 4,
  },
  flagIcon: {width: 23, height: 23},
  logo: {
    width: 150,
    height: 25,
    resizeMode: 'contain',
    marginLeft: 0,
  },
  loginText: {
    fontSize: 34,
    fontFamily: Fonts.bold,
    color: Colors.appColor,
    marginTop: 12,
    marginLeft: 20,
  },
  emailTextLabel: {
    fontSize: 13,
    fontFamily: Fonts.regular,
    color: Colors.black,
  },
  emailInput: {
    fontSize: 13,
    fontFamily: Fonts.regular,
    color: Colors.black,
    marginHorizontal: 12,
    height: 50,
    backgroundColor: Colors.white,
  },
});
