import React from 'react';
import {ScrollView, Text, View} from 'react-native';
import strings from '../constants/strings';
import fonts from '../constants/fonts';
import colors from '../constants/colors';
import Lottie from 'lottie-react-native';
import images from '../constants/images';
import {TouchableRipple} from 'react-native-paper';
const Step1 = ({onNext}) => {
  return (
    <View style={{flex: 1}}>
      <ScrollView>
        <View style={{paddingBottom: 100}}>
          <Text
            style={{
              fontFamily: fonts.Medium,
              color: colors.black,
              fontSize: 18,
              textAlign: 'center',
              marginHorizontal: 24,
              marginTop: 24,
              textTransform: 'uppercase',
            }}>
            {strings.tut1Title}
          </Text>
          <Text
            style={{
              fontFamily: fonts.Regular,
              color: colors.gray,
              fontSize: 14,
              textAlign: 'center',
              marginHorizontal: 24,
              marginTop: 4,
            }}>
            {strings.tut1Title1}
          </Text>
          <Lottie
            source={images.step1}
            autoPlay
            loop
            style={{
              width: 220,
              height: 220,
              marginTop: 20,
              alignSelf: 'center',
            }}
          />
          <Text
            style={{
              fontSize: 16,
              fontFamily: fonts.Regular,
              color: colors.gray,
              textAlign: 'center',
              marginHorizontal: 24,
              marginTop: 100,
            }}>
            {strings.tut1Subtitle}
          </Text>
        </View>
      </ScrollView>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingBottom: 20,
          paddingHorizontal: 12,
        }}>
        <View />
        <TouchableRipple
          onPress={() => {
            if (onNext) {
              onNext();
            }
          }}
          rippleColor="rgba(0, 0, 0, 0.1)"
          borderless={true}
          style={{
            paddingHorizontal: 24,
            paddingVertical: 12,
            backgroundColor: colors.lightPurple,
            marginRight: 12,
            borderRadius: 80,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontSize: 14,
              fontFamily: fonts.Regular,
              color: colors.white,
            }}>
            {strings.next}
          </Text>
        </TouchableRipple>
      </View>
    </View>
  );
};

export default Step1;
