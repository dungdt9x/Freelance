import React, {forwardRef, useImperativeHandle, useMemo, useState} from 'react';
import {
  StyleSheet,
  View,
  Modal,
  Dimensions,
  Platform,
  StatusBar,
} from 'react-native';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';

const PopupIntro = forwardRef((props, ref) => {
  const {onClose} = props;
  const [isShow, setIsShow] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  useImperativeHandle(ref, () => ({
    show() {
      setIsShow(true);
    },
    hide() {
      setCurrentStep(1);
      setIsShow(false);
    },
  }));

  const renderContent = useMemo(() => {
    if (currentStep === 1) {
      return (
        <View style={{flex: 1}}>
          <Step1
            onNext={() => {
              console.log('Next');
              setCurrentStep(2);
            }}
          />
        </View>
      );
    }

    if (currentStep === 2) {
      return (
        <View style={{flex: 1}}>
          <Step2
            onNext={() => {
              console.log('Next');
              setCurrentStep(3);
            }}
            onPrevious={() => {
              setCurrentStep(1);
            }}
          />
        </View>
      );
    }
    return (
      <View style={{flex: 1}}>
        <Step3
          onFinish={() => {
            console.log('Next');
            if (onClose) {
              onClose();
            }
          }}
          onPrevious={() => {
            setCurrentStep(2);
          }}
        />
      </View>
    );
  }, [currentStep]);

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isShow}
      style={{backgroundColor: 'transparent'}}
      backButtonClose={false}>
      {Platform.OS === 'android' ? (
        <StatusBar backgroundColor="#00000080" />
      ) : null}
      <View style={styles.centeredView}>
        <View style={[styles.modalView]}>{renderContent}</View>
      </View>
    </Modal>
  );
});

export default PopupIntro;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: '#00000080',
    flexDirection: 'column',
  },
  modalView: {
    backgroundColor: 'white',
    height: Dimensions.get('window').height * 0.8,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
});
