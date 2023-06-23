import React from 'react';
import {ScrollView, Text, View} from 'react-native';
import strings from '../constants/strings';
import fonts from '../constants/fonts';
import colors from '../constants/colors';
import {IconButton, TouchableRipple} from 'react-native-paper';
import device from '../constants/device';
import Lottie from 'lottie-react-native';
import images from '../constants/images';

const Step3 = ({onFinish, onPrevious}) => {
  const data = [
    {
      title: strings.tut3Title1,
      icon: 'database',
    },
    {
      title: strings.tut3Title2,
      icon: 'camera',
    },
    {
      title: strings.tut3Title3,
      icon: 'image-album',
    },
  ];

  const renderItem = (item, index) => {
    return (
      <View
        style={{flexDirection: 'row', alignItems: 'center', paddingRight: 6}}
        key={index.toString()}>
        <IconButton icon={item.icon} size={21} color={colors.gray} />
        <Text
          style={{
            fontSize: 14,
            fontFamily: fonts.Regular,
            color: colors.black,
            maxWidth: device.width - 80,
          }}>
          {item.title}
        </Text>
      </View>
    );
  };

  return (
    <View style={{flex: 1}}>
      <ScrollView>
        <View>
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
            {strings.tut3Title}
          </Text>
          <Lottie
            source={images.permission}
            autoPlay
            loop
            style={{
              width: 200,
              height: 200,
              marginTop: 12,
              alignSelf: 'center',
            }}
          />
          <View style={{marginTop: 40, paddingHorizontal: 12}}>
            {data.map((item, index) => {
              return renderItem(item, index);
            })}
          </View>
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
        <TouchableRipple
          onPress={() => {
            if (onPrevious) {
              onPrevious();
            }
          }}
          rippleColor="rgba(0, 0, 0, 0.1)"
          borderless={true}
          style={{
            paddingHorizontal: 24,
            paddingVertical: 12,
            backgroundColor: colors.lightGray2,
            marginRight: 12,
            borderRadius: 80,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontSize: 14,
              fontFamily: fonts.Regular,
              color: colors.black,
            }}>
            {strings.previous}
          </Text>
        </TouchableRipple>
        <TouchableRipple
          onPress={() => {
            if (onFinish) {
              onFinish();
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
            {strings.done}
          </Text>
        </TouchableRipple>
      </View>
    </View>
  );
};

export default Step3;
