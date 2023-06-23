import React, {useEffect, useRef, useState} from 'react';
import {
  Animated,
  FlatList,
  ScrollView,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import strings from '../constants/strings';
import fonts from '../constants/fonts';
import colors from '../constants/colors';
import Lottie from 'lottie-react-native';
import images from '../constants/images';
import {TouchableRipple} from 'react-native-paper';
import device from '../constants/device';

const Step2 = ({onNext, onPrevious}) => {
  const data = [
    {
      title: strings.tut2Subtitle1,
      subtitle: strings.tut2Subtitle12,
      icon: images.filter,
    },
    {
      title: strings.tut2Subtitle2,
      subtitle: strings.tut2Subtitle21,
      icon: images.sticker,
    },
    {
      title: strings.tut2Subtitle3,
      subtitle: strings.tut2Subtitle31,
      icon: images.draw,
    },
    {
      title: strings.tut2Subtitle4,
      subtitle: strings.tut2Subtitle41,
      icon: images.text,
    },
  ];
  const [page, setPage] = useState(0);
  const flatListRef = useRef(null);
  const scrollX = useRef(new Animated.Value(0)).current;
  let pageRef = useRef(page);

  useEffect(() => {
    pageRef.current = page;
  }, [page]);

  const handlePageChange = event => {
    const roundIndex = Math.floor(
      Math.floor(event.nativeEvent.contentOffset.x) /
        Math.floor(event.nativeEvent.layoutMeasurement.width),
    );
    if (roundIndex !== pageRef.current) {
      setPage(roundIndex);
    }
  };

  const handleDotPress = index => {
    setPage(index);
    flatListRef.current?.scrollToIndex({
      index: index,
      animated: true,
      viewPosition: 0.5,
    });
  };

  const renderDot = index => {
    const dotStyle = {
      width: 8,
      height: 8,
      borderRadius: 8,
      marginHorizontal: 5,
      backgroundColor: index === page ? colors.purple : colors.lightGray,
    };

    return (
      <TouchableWithoutFeedback
        key={index.toString()}
        onPress={() => handleDotPress(index)}>
        <Animated.View style={dotStyle} />
      </TouchableWithoutFeedback>
    );
  };

  const renderItem = (item, index) => {
    return (
      <View
        style={{
          flex: 1,
          width: device.width,
          paddingHorizontal: 12,
          justifyContent: 'center',
          paddingVertical: 12,
        }}
        key={index.toString()}>
        <Lottie
          source={item.icon}
          autoPlay
          loop
          style={{
            width: 220,
            height: 220,
            marginTop: 12,
            alignSelf: 'center',
          }}
        />
        <Text
          style={{
            textAlign: 'center',
            fontSize: 16,
            fontFamily: fonts.Medium,
            color: colors.black,
            marginTop: 60,
            marginHorizontal: 32,
            textTransform: 'uppercase',
          }}>
          {item.title}
        </Text>
        <Text
          style={{
            textAlign: 'center',
            fontSize: 14,
            fontFamily: fonts.Regular,
            color: colors.gray,
            marginTop: 6,
            marginHorizontal: 32,
          }}>
          {item.subtitle}
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
            {strings.tut2Title}
          </Text>
          <FlatList
            showsHorizontalScrollIndicator={false}
            data={data}
            horizontal={true}
            pagingEnabled={true}
            scrollEnabled={true}
            renderItem={({item, section, index}) => renderItem(item, index)}
            style={{marginTop: 12, marginBottom: 12}}
            keyExtractor={(item, index) => index.toString()}
            onScroll={Animated.event(
              [{nativeEvent: {contentOffset: {x: scrollX}}}],
              {
                useNativeDriver: false,
                listener: handlePageChange,
              },
            )}
            scrollEventThrottle={16}
            onScrollToIndexFailed={({index}) => {
              const wait = new Promise(resolve => setTimeout(resolve, 500));
              wait.then(() => {
                flatListRef.current?.scrollToIndex({
                  index: index,
                  animated: true,
                  viewPosition: 0.5,
                });
              });
            }}
          />
        </View>
      </ScrollView>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          marginBottom: 20,
          paddingBottom: 34,
          marginTop: 12,
        }}>
        {data.map((_, index) => renderDot(index))}
      </View>
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

export default Step2;
