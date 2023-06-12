import React, {useEffect, useRef, useState} from 'react';
import {FlatList, ScrollView, Text, View} from 'react-native';
import Loading from './Loading';
import device from '../constants/device';
import colors from '../constants/colors';
import {TouchableRipple} from 'react-native-paper';
import fonts from '../constants/fonts';
import strings from '../constants/strings';
import moment from 'moment/moment';
const Calendar = ({array, onSelect, currentDate}) => {
  const renderRow = (item, index) => {
    return (
      <TouchableRipple
        key={index.toString()}
        onPress={() => {
          onSelect(item);
        }}
        rippleColor="rgba(0, 0, 0, 0.1)"
        borderless={true}
        style={{
          height: 50,
          backgroundColor:
            currentDate === item ? colors.lightPurple : colors.lightGray2,
          marginHorizontal: 4,
          marginVertical: 4,
          paddingHorizontal: 12,
          borderRadius: 5,
          borderColor: colors.gray,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View style={{paddingHorizontal: 12}}>
          <Text
            style={{
              textTransform: 'capitalize',
              fontSize: 13,
              fontFamily: fonts.Medium,
              color: currentDate === item ? colors.white : colors.black,
            }}>
            {moment(new Date(item)).local().format('dddd,')}
          </Text>
          <Text
            style={{
              textTransform: 'capitalize',
              fontSize: 13,
              fontFamily: fonts.Regular,
              color: currentDate === item ? colors.white : colors.gray,
              marginTop: 2,
            }}>
            {moment(new Date(item)).local().format('DD MMMM YYYY')}
          </Text>
        </View>
      </TouchableRipple>
    );
  };
  return (
    <View style={{paddingVertical: 24, paddingHorizontal: 12}}>
      <Text
        style={{fontFamily: fonts.Medium, color: colors.black, fontSize: 16}}>
        {strings.selectDate}
      </Text>
      {array && array.length > 0 ? (
        <View
          style={{
            marginVertical: 12,
            alignSelf: 'center',
            flexWrap: 'wrap',
            flexDirection: 'row',
          }}>
          {array.map((d, index) => {
            return renderRow(d, index);
          })}
        </View>
      ) : (
        <Loading />
      )}
    </View>
  );
};

export default Calendar;
