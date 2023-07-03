import {
  Fade,
  Placeholder,
  PlaceholderLine,
  PlaceholderMedia,
} from 'rn-placeholder';
import {StyleSheet, View} from 'react-native';
import React from 'react';
import device from '../constants/device';

const Loading = () => {
  return (
    <View style={styles.container}>
      <Placeholder
        style={styles.loadingHolderBlock}
        Animation={Fade}
        Left={PlaceholderMedia}>
        <PlaceholderLine width={40} style={styles.loadingHolderLine1} />
        <PlaceholderLine width={80} style={styles.loadingHolderLine2} />
        <PlaceholderLine width={60} style={styles.loadingHolderLine2} />
        <PlaceholderLine width={80} style={styles.loadingHolderLine2} />
      </Placeholder>
    </View>
  );
};

export default Loading;

const styles = StyleSheet.create({
  container: {maxWidth: device.width},
  loadingHolderBlock: {marginTop: 16, marginLeft: 16},
  loadingHolderLine1: {marginTop: 2, marginLeft: 16},
  loadingHolderLine2: {marginTop: 0, marginLeft: 16},
});
