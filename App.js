import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import SettingsScreen from './src/screens/SettingsScreen';
import WbScreen from './src/screens/WbScreen';
import Menu from './src/components/Menu';

const Drawer = createDrawerNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator drawerContent={(props) => <Menu {...props} />}>
        <Drawer.Screen name="Settings" component={SettingsScreen} />
        <Drawer.Screen name="W&B" component={WbScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default App;
