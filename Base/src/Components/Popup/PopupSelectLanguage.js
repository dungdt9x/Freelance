import {FlatList, Image, Text, TouchableOpacity, View} from 'react-native';
import RNAnimated from 'react-native-animated-component';
import React from 'react';
import Languages from '../../constants/Languages';
import Colors from '../../constants/Colors';
import Images from '../../constants/Images';
import Fonts from '../../constants/Fonts';

const getFlags = currentId => {
  let options = [
    {
      value: 'vi',
      label: Languages.vi,
      color: Colors.black,
      icon: Images.vietnamese,
    },
    {
      value: 'en',
      label: Languages.en,
      color: Colors.black,
      icon: Images.england,
    },
  ];

  if (currentId !== null && currentId !== undefined) {
    options.forEach(d => {
      d.isSelected = d.value === currentId;
    });
  }

  return options;
};
const PopupSelectLanguage = ({onSelect, currentId}) => {
  const renderRow = (rowData, index) => {
    return (
      <RNAnimated appearFrom={'bottom'} animationDuration={300}>
        <TouchableOpacity
          style={{
            paddingVertical: 12,
            borderRadius: 5,
            alignItems: 'center',
            flexDirection: 'row',
            paddingHorizontal: 12,
            marginVertical: 2,
            maxWidth: '99%',
            backgroundColor: rowData.isSelected
              ? Colors.appColor
              : Colors.white,
          }}
          key={index.toString()}
          onPress={() => {
            if (onSelect) {
              onSelect(rowData.value);
            }
          }}>
          <View
            style={{
              width: 30,
              height: 30,
              backgroundColor: '#ECEFF4',
              borderRadius: 15,
              justifyContent: 'center',
              alignItems: 'center',
              marginRight: 12,
            }}>
            <Image
              source={rowData.icon}
              defaultSource={Images.setting}
              style={{
                width: 20,
                height: 20,
                resizeMode: 'contain',
                alignSelf: 'center',
              }}
            />
          </View>
          <View>
            <Text
              style={{
                fontFamily: Fonts.regular,
                fontSize: 14,
                color: rowData.isSelected ? Colors.white : Colors.black,
              }}>
              {rowData.label}
            </Text>
          </View>
        </TouchableOpacity>
      </RNAnimated>
    );
  };

  return (
    <>
      <View style={{paddingTop: 20, paddingBottom: 20}}>
        <Text
          style={{
            fontSize: 13,
            fontFamily: Fonts.medium,
            color: Colors.black,
            marginLeft: 12,
          }}>
          {Languages.language.toUpperCase()}
        </Text>
        <FlatList
          scrollEnabled={false}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          data={getFlags(currentId)}
          renderItem={({item, index}) => renderRow(item, index)}
          style={{
            marginTop: 6,
            marginBottom: 10,
            marginHorizontal: 6,
            paddingBottom: 10,
          }}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </>
  );
};

export default PopupSelectLanguage;
