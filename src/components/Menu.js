import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { DrawerActions } from '@react-navigation/native';

const Menu = ({ navigation }) => {
  const navigateToScreen = (screenName) => {
    navigation.dispatch(DrawerActions.closeDrawer());
    navigation.navigate(screenName);
  };

  return (
    <View style={styles.menu}>
      <TouchableOpacity
        style={styles.menuItem}
        onPress={() => navigateToScreen('Settings')}
      >
        <Text style={styles.menuItemText}>Settings</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.menuItem}
        onPress={() => navigateToScreen('W&B')}
      >
        <Text style={styles.menuItemText}>W&B</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  menu: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuItem: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    marginVertical: 10,
    width: 150, // Adjust width as needed
    alignItems: 'center',
  },
  menuItemText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Menu;
