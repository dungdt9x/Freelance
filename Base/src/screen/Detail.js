import React from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {StatusBar, Text, View, StyleSheet} from 'react-native';
import {Appbar} from 'react-native-paper';

const Detail = () => {
  const insets = useSafeAreaInsets();
  return (
    <View style={[styles.container, {paddingTop: insets.top}]}>
      <StatusBar barStyle={'dark-content'} backgroundColor={'white'} />
      <Appbar.Header style={styles.header}>
        <Appbar.BackAction onPress={() => {}} color={'red'} />
        <Appbar.Content title="Title" subtitle="Subtitle" />
        <Appbar.Action icon="magnify" onPress={() => {}} />
        <Appbar.Action icon="dots-vertical" onPress={() => {}} />
      </Appbar.Header>
      <Text>Home Screen</Text>
    </View>
  );
};

export default Detail;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    backgroundColor: 'white',
    elevation: 0,
  },
});
