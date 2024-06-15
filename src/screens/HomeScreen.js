import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Menu from '../components/Menu';

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Welcome to your React Native app!</Text>
      <Menu />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default HomeScreen;
