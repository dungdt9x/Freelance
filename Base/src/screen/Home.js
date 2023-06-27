import React, {useEffect, useMemo, useRef, useState} from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {StatusBar, View, StyleSheet, Text, Image, Alert} from 'react-native';
import {Appbar, Button, IconButton, TouchableRipple} from 'react-native-paper';
import colors from '../constants/colors';
import fonts from '../constants/fonts';
import {Storages} from '../constants/storages';
import device from '../constants/device';
import {AdEventType, InterstitialAd} from 'react-native-google-mobile-ads';
import keys from '../constants/keys';
import images from '../constants/images';
import Lottie from 'lottie-react-native';
import strings from '../constants/strings';
import PopupIntro from '../component/PopupIntro';
import {requestMultiple, PERMISSIONS} from 'react-native-permissions';
import {openPicker} from '@baronha/react-native-multiple-image-picker';
import PhotoEditor from '@baronha/react-native-photo-editor';
import MasonryList from '@react-native-seoul/masonry-list';
import uuid from 'react-native-uuid';
import {ImageGallery} from '@georstat/react-native-image-gallery';
import ActionSheet from 'react-native-actionsheet';

const interstitial = InterstitialAd.createForAdRequest(
  device.iOS ? keys.iOS_FEATURE_OPEN_ID : keys.FEATURE_OPEN_ID,
  {
    requestNonPersonalizedAdsOnly: true,
    keywords: keys.adKeys,
  },
);

const Home = ({navigation}) => {
  const insets = useSafeAreaInsets();
  let ready = Storages.getBoolean('ready');
  const [firstTime, setFirstTime] = useState(!ready);
  const saved = JSON.parse(Storages.getString('saved') ?? '[]');
  const [data, setData] = useState(saved);
  let introRef = useRef(null);
  let actionSheet = useRef(null);
  let dataRef = useRef(data);

  let currentIndexRef = useRef(0);
  const [isOpen, setIsOpen] = useState(false);
  const openGallery = () => setIsOpen(true);
  const closeGallery = () => setIsOpen(false);

  useEffect(() => {
    dataRef.current = data;
  }, [data]);
  useEffect(() => {
    return interstitial.addAdEventListener(AdEventType.LOADED, () => {
      interstitial.show().then();
    });
  }, []);

  useEffect(() => {
    if (firstTime) {
      introRef.current?.show();
    }
  }, [firstTime]);

  const renderHeader = useMemo(() => {
    return (
      <View>
        <StatusBar barStyle={'dark-content'} backgroundColor={'#e0d7cc'} />
        <Appbar.Header style={styles.header}>
          <View style={styles.subHeader}>
            <Image
              source={images.logo}
              style={{width: 30, height: 30, borderRadius: 30}}
            />
            <Text
              style={{
                fontFamily: fonts.Medium,
                color: colors.bluePurple,
                fontSize: 18,
                marginLeft: 12,
              }}>
              ePhoto
            </Text>
          </View>
        </Appbar.Header>
      </View>
    );
  }, []);

  const renderContent = () => {
    return <View style={{flex: 1}}>{renderData}</View>;
  };

  const openImagePicker = async () => {
    try {
      let image = await openPicker({
        selectedAssets: [],
        isExportThumbnail: false,
        maxSelectedAssets: 1,
        singleSelectedMode: true,
        usedCameraButton: true,
        isPreview: false,
        doneTitle: strings.done,
        cancelTitle: strings.cancel,
        selectedColor: colors.bluePurple,
        isCrop: false,
        mediaType: 'image',
        selectMessage: strings.select,
        deselectMessage: strings.unSelect,
        emptyMessage: strings.fileNotFound,
        messageTitleButton: strings.ok,
        maximumMessageTitle: null,
        isCropCircle: false,
      });

      setTimeout(() => {
        editPhoto(image.path);
      }, 1000);
    } catch (e) {
      console.log(e.code, e.message);
    }
  };

  const editPhoto = url => {
    console.log('URL: ', url);
    PhotoEditor.open({
      path: url,
      stickers: [],
    })
      .then(result => {
        console.log('result: ', result);
        dataRef.current?.push({
          id: uuid.v4(),
          imgURL: result,
          url: result,
          uri: result,
          randomBool: Math.random() < 0.5,
        });
        Storages.set('saved', JSON.stringify([...dataRef.current]));
        setData([...dataRef.current]);
      })
      .catch(error => {
        console.log('Error: ', error);
      });
  };

  const renderData = useMemo(() => {
    if (data.length === 0) {
      return (
        <View style={styles.blockStyle}>
          <Lottie
            source={images.monkey}
            autoPlay
            loop
            style={styles.locationIcon}
          />
          <Text
            style={{
              fontSize: 18,
              fontFamily: fonts.Medium,
              color: colors.bluePurple,
              textTransform: 'uppercase',
              marginHorizontal: 32,
              textAlign: 'center',
            }}>
            {ready ? strings.welcomeBack : strings.welcome}
          </Text>
          <Text style={styles.subTitleBlock}>{strings.welcome2}</Text>
          <Button
            icon="camera-plus"
            mode="contained"
            style={styles.buttonSetting}
            labelStyle={styles.buttonTitle}
            onPress={() => {
              interstitial.load();
              setTimeout(() => {
                openImagePicker()
                  .then(() => {})
                  .catch(() => {});
              }, 500);
            }}>
            {strings.start}
          </Button>
        </View>
      );
    }

    return (
      <View style={{flex: 1}}>
        <MasonryList
          data={data}
          keyExtractor={(item): string => item.id}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          renderItem={({item, i}) => renderItem(item, i)}
          onEndReachedThreshold={0.1}
          contentContainerStyle={{
            paddingHorizontal: 24,
            alignSelf: 'stretch',
          }}
        />
        <TouchableRipple
          onPress={() => {
            interstitial.load();
            setTimeout(() => {
              openImagePicker()
                .then(() => {})
                .catch(() => {});
            }, 500);
          }}
          rippleColor="rgba(0, 0, 0, 0.1)"
          borderless={true}
          style={{
            width: 50,
            height: 50,
            backgroundColor: colors.lightPurple,
            borderRadius: 50,
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            bottom: 68,
            right: 12,
          }}>
          <IconButton icon={'plus'} size={21} color={colors.white} />
        </TouchableRipple>
      </View>
    );
  }, [data, ready]);

  const renderItem = (item, index) => {
    return (
      <View
        key={index.toString()}
        style={{flex: 1, marginLeft: index % 2 === 0 ? 0 : 12, marginTop: 12}}>
        <TouchableRipple
          onPress={() => {
            currentIndexRef.current = index;
            setTimeout(() => {
              openGallery();
            }, 200);
          }}
          onLongPress={() => {
            console.log('ABC');
            currentIndexRef.current = index;
            actionSheet.current?.show();
          }}
          rippleColor="rgba(0, 0, 0, 0.1)"
          borderless={true}
          style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            source={{uri: item.imgURL}}
            style={{
              height: item.randomBool ? 150 : 280,
              alignSelf: 'stretch',
              borderRadius: 10,
            }}
            resizeMode="cover"
          />
        </TouchableRipple>
      </View>
    );
  };

  const renderHeaderComponent = (image, currentIndex) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingVertical: 6,
          paddingHorizontal: 6,
        }}>
        <Text
          style={{
            fontSize: 14,
            fontFamily: fonts.Regular,
            color: colors.white,
            marginLeft: 4,
          }}>
          {`${strings.image}:  ${currentIndex + 1}/${data.length}`}
        </Text>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <IconButton
            icon={'share-variant'}
            size={21}
            color={colors.white}
            onPress={() => {
              closeGallery();
              Alert.alert(strings.upcoming, strings.featureUpcoming, [
                {
                  text: 'OK',
                  onPress: () => {
                    interstitial.load();
                  },
                },
              ]);
            }}
          />
          <IconButton
            icon={'content-save'}
            size={21}
            color={colors.white}
            onPress={() => {
              closeGallery();
              Alert.alert(strings.upcoming, strings.featureUpcoming, [
                {
                  text: 'OK',
                  onPress: () => {
                    interstitial.load();
                  },
                },
              ]);
            }}
          />
          <IconButton
            icon={'pencil'}
            size={21}
            color={colors.white}
            onPress={() => {
              closeGallery();
              interstitial.load();
              setTimeout(() => {
                console.log('Image: ', image);
                if (image && image.url) {
                  editPhoto(image.url);
                }
              }, 200);
            }}
          />
          <IconButton
            icon={'close'}
            size={21}
            color={colors.white}
            onPress={closeGallery}
          />
        </View>
      </View>
    );
  };

  const renderCustomImage = image => {
    return (
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          width: device.width,
        }}>
        <Image
          resizeMode="contain"
          source={{uri: image.url}}
          style={{
            height: '100%',
            width: device.width,
          }}
        />
      </View>
    );
  };

  return (
    <View style={[styles.container, {paddingTop: insets.top}]}>
      {renderHeader}
      {renderContent()}
      <ImageGallery
        initialIndex={currentIndexRef.current}
        close={closeGallery}
        images={data}
        isOpen={isOpen}
        renderCustomImage={renderCustomImage}
        renderHeaderComponent={renderHeaderComponent}
        resizeMode="contain"
      />
      <ActionSheet
        ref={actionSheet}
        options={[strings.share, strings.save, strings.edit, strings.delete]}
        destructiveButtonIndex={3}
        onPress={index => {
          switch (index) {
            case 0:
              Alert.alert(strings.upcoming, strings.featureUpcoming, [
                {
                  text: 'OK',
                  onPress: () => {
                    interstitial.load();
                  },
                },
              ]);
              break;
            case 1:
              setTimeout(() => {
                Alert.alert(strings.upcoming, strings.featureUpcoming, [
                  {
                    text: 'OK',
                    onPress: () => {
                      interstitial.load();
                    },
                  },
                ]);
              }, 200);
              break;
            case 2:
              interstitial.load();
              setTimeout(() => {
                let image = dataRef.current[currentIndexRef.current];
                console.log('Image: ', image);
                if (image && image.url) {
                  editPhoto(image.url);
                }
              }, 200);
              break;
            case 3:
              let findObject = dataRef.current[currentIndexRef.current];
              if (findObject) {
                let newData = dataRef.current.filter(
                  d => d && d.id !== findObject.id,
                );
                setData(newData);
                Storages.set('saved', JSON.stringify([...newData]));
              }
              setTimeout(() => {
                interstitial.load();
              }, 500);
              break;
            default:
              interstitial.load();
              break;
          }
        }}
      />
      <PopupIntro
        ref={introRef}
        onClose={() => {
          introRef.current?.hide();
          setFirstTime(false);
          Storages.set('ready', true);
          setTimeout(() => {
            requestMultiple([
              PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
              PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
              PERMISSIONS.ANDROID.CAMERA,
              PERMISSIONS.ANDROID.READ_MEDIA_IMAGES,
            ]).then(statuses => {
              console.log('statuses', statuses);
            });
          }, 200);
        }}
      />
    </View>
  );
};

export default Home;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e0d7cc',
  },
  header: {
    backgroundColor: '#e0d7cc',
    elevation: 0,
  },
  subHeader: {
    flexDirection: 'row',
    justifyContent: 'center',
    flex: 1,
    alignItems: 'center',
  },
  leftHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  content: {flex: 1},
  contentView: {paddingBottom: 80},
  blockStyle: {
    width: device.width,
    height: device.height / 2 > 300 ? device.height / 2 : 300,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 80,
  },
  iconBlock: {width: 120, height: 120, alignSelf: 'center'},
  titleBlock: {fontFamily: fonts.Medium, color: colors.red, fontSize: 15},
  subTitleBlock: {
    fontFamily: fonts.Regular,
    color: colors.bluePurple,
    fontSize: 14,
    textAlign: 'center',
    marginHorizontal: 24,
    marginTop: 8,
  },
  buttonSetting: {
    backgroundColor: colors.lightGray2,
    borderRadius: 50,
    marginTop: 50,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  buttonTitle: {
    fontFamily: fonts.Regular,
    color: colors.black,
    fontSize: 13,
    textTransform: 'none',
  },
  locationIcon: {
    width: 220,
    height: 220,
    alignSelf: 'center',
  },
});
