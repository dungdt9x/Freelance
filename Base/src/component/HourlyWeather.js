import React, { useEffect, useRef, useState } from "react";
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import Loading from './Loading';
import Api from '../api/Api';
import fonts from '../constants/fonts';
import colors from '../constants/colors';
import _ from 'lodash';
import moment from 'moment/moment';
import device from '../constants/device';
import Lottie from 'lottie-react-native';
import helper from '../ultity/helper';
import {Button, TouchableRipple} from 'react-native-paper';
import strings from "../constants/strings";
import { Modalize } from "react-native-modalize";

const HourlyWeather = location => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [daily, setDaily] = useState([]);
  const [weekly, setWeekly] = useState([]);
  const [currentDateSelect, setCurrentDateSelect] = useState(null);
  const [currentDateSelectData, setCurrentDateSelectData] = useState([]);
  let modalRef = useRef(null);

  useEffect(() => {
    if (location) {
      getDataHourlyWithLocation(location);
    }
  }, [location]);

  useEffect(() => {
    if (data && data.length > 0) {
      let today = moment(new Date()).local().format('YYYY-MM-DD');
      let date = new Date();
      let todayData = data.filter(
        d => d && d.dt_txt && d.dt_txt.startsWith(today),
      );
      if (todayData) {
        todayData.forEach(d => {
          d.isSelect = false;
        });
        setDaily(todayData);
      }
      let others = data.filter(
        d => d && d.dt_txt && !d.dt_txt.startsWith(today),
      );
      if (others) {
        setWeekly(others);
      }
      let tomorrow = date.setDate(date.getDate() + 1);
      setCurrentDateSelect(moment(tomorrow).local().format('YYYY-MM-DD'));
    }
  }, [data]);

  useEffect(() => {
    if (currentDateSelect && weekly && weekly.length > 0) {
      let currentDateData = weekly.filter(
        d => d && d.dt_txt && d.dt_txt.startsWith(currentDateSelect),
      );
      if (currentDateData) {
        currentDateData.forEach(d => {
          d.isSelect = false;
        });
        setCurrentDateSelectData(currentDateData);
      }
    }
  }, [currentDateSelect, weekly]);

  const getDataHourlyWithLocation = value => {
    if (!value || !value.location || _.isEmpty(value.location)) {
      return;
    }
    Api.getWeatherDaily(value.location.latitude, value.location.longitude)
      .then(response => {
        if (response.data.list) {
          setData(response.data.list);
        }
        setIsLoading(false);
      })
      .catch(error => {
        console.log('Error get weather hourly: ', error.message);
      });
  };

  const renderContentRowDaily = d => {
    let object = helper.getIconAndTextFromDataWeather(d);
    let time = d.dt_txt.split(' ')[1].toString().split(':');
    return (
      <View>
        <Text
          style={{
            fontSize: 14,
            fontFamily: fonts.Medium,
            color: d.isSelect ? colors.white : colors.black,
            textAlign: 'center',
            marginTop: 4,
          }}>
          {time[0]}:{time[1]}
        </Text>
        <Lottie
          source={object.icon}
          autoPlay
          loop
          style={{
            width: 50,
            height: 50,
            alignSelf: 'center',
          }}
        />
        <Text
          style={{
            fontFamily: fonts.Medium,
            color: d.isSelect ? colors.white : colors.black,
            textAlign: 'center',
            fontSize: 19,
          }}>
          {d.main.temp.toFixed(0)}°c
        </Text>
        <Text
          style={{
            fontSize: 9,
            fontFamily: fonts.Regular,
            color: d.isSelect ? colors.white : colors.gray,
            textAlign: 'center',
            marginTop: 6,
            textTransform: 'none',
          }}>
          {object.text}
        </Text>
      </View>
    );
  };

  const renderContent = () => {
    if (isLoading) {
      return <Loading />;
    }
    return (
      <View>
        {daily.length > 0 ? (
          <View>
            <Text
              style={{
                fontFamily: fonts.Medium,
                color: colors.black,
                fontSize: 16,
              }}>
              {strings.toDay}
            </Text>
            <ScrollView
              horizontal={true}
              style={{marginTop: 12, marginBottom: 12, alignSelf: 'center'}}>
              {daily.map((d, index) => {
                return (
                  <TouchableRipple
                    key={index.toString()}
                    onPress={() => {
                      // if (d.isSelect) {
                      //   daily[index].isSelect = false;
                      //   setDaily([...daily]);
                      //   return;
                      // }
                      // daily.forEach(d => {
                      //   d.isSelect = false;
                      // });
                      // daily[index].isSelect = true;
                      // setDaily([...daily]);
                    }}
                    rippleColor="rgba(0, 0, 0, 0.1)"
                    borderless={true}
                    style={{
                      width: device.width / 5,
                      height: 168,
                      backgroundColor: d.isSelect
                        ? colors.lightPurple
                        : colors.lightGray2,
                      marginRight: 12,
                      borderRadius: 80,
                      borderWidth: 0.1,
                      borderColor: colors.gray,
                      paddingTop: 12,
                    }}>
                    {renderContentRowDaily(d)}
                  </TouchableRipple>
                );
              })}
            </ScrollView>
          </View>
        ) : null}
        {weekly.length > 0 ? (
          <View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <Text
                style={{
                  fontFamily: fonts.Medium,
                  color: colors.black,
                  fontSize: 16,
                }}>
                {strings.other}
              </Text>
              <Button
                style={{alignSelf: 'flex-start'}}
                icon="calendar-cursor"
                mode="elevated"
                onPress={() => console.log('Pressed')}>
                {moment(new Date(currentDateSelect))
                  .local()
                  .format('DD/MM/YYYY')}
              </Button>
            </View>
            <ScrollView
              horizontal={true}
              style={{marginTop: 12, marginBottom: 12, alignSelf: 'center'}}>
              {currentDateSelectData.map((d, index) => {
                return (
                  <TouchableRipple
                    key={index.toString()}
                    onPress={() => {
                      modalRef.current?.show();
                      // if (d.isSelect) {
                      //   currentDateSelectData[index].isSelect = false;
                      //   setCurrentDateSelectData([...currentDateSelectData]);
                      //   return;
                      // }
                      // currentDateSelectData.forEach(d => {
                      //   d.isSelect = false;
                      // });
                      // currentDateSelectData[index].isSelect = true;
                      // setCurrentDateSelectData([...currentDateSelectData]);
                    }}
                    rippleColor="rgba(0, 0, 0, 0.1)"
                    borderless={true}
                    style={{
                      width: device.width / 5,
                      height: 168,
                      backgroundColor: d.isSelect
                        ? colors.lightPurple
                        : colors.lightGray2,
                      marginRight: 12,
                      borderRadius: 80,
                      borderWidth: 0.1,
                      borderColor: colors.gray,
                      paddingTop: 12,
                    }}>
                    {renderForRowOther(d)}
                  </TouchableRipple>
                );
              })}
            </ScrollView>
          </View>
        ) : null}
      </View>
    );
  };

  const renderForRowOther = d => {
    let object = helper.getIconAndTextFromDataWeather(d);
    let time = d.dt_txt.split(' ')[1].toString().split(':');
    return (
      <View>
        <Text
          style={{
            fontSize: 12,
            fontFamily: fonts.Regular,
            color: d.isSelect ? colors.white : colors.gray,
            textAlign: 'center',
          }}>
          {moment(new Date(currentDateSelect))
            .local()
            .format('ddd')}
        </Text>
        <Text
          style={{
            fontSize: 14,
            fontFamily: fonts.Medium,
            color: d.isSelect ? colors.white : colors.black,
            textAlign: 'center',
            marginTop: 4,
          }}>
          {time[0]}:{time[1]}
        </Text>
        <Lottie
          source={object.icon}
          autoPlay
          loop
          style={{
            width: 50,
            height: 50,
            alignSelf: 'center',
          }}
        />
        <Text
          style={{
            fontFamily: fonts.Medium,
            color: d.isSelect ? colors.white : colors.black,
            textAlign: 'center',
            fontSize: 19,
          }}>
          {d.main.temp.toFixed(0)}°c
        </Text>
        <Text
          style={{
            fontSize: 9,
            fontFamily: fonts.Regular,
            color: d.isSelect ? colors.white : colors.gray,
            textAlign: 'center',
            marginTop: 6,
            textTransform: 'none',
          }}>
          {object.text}
        </Text>
      </View>
    );
  };

  return (
    <View
      style={{
        flex: 1,
        marginTop: 16,
        paddingHorizontal: 12,
        paddingVertical: 12,
      }}>
      {renderContent()}
      <Modalize ref={modalRef}>
        <View style={{width: device.width, height: device.height/2, backgroundColor: 'red'}}>

        </View>
      </Modalize>
    </View>
  );
};

export default HourlyWeather;
