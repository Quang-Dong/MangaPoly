import React from 'react';
import {StyleSheet, StatusBar, SafeAreaView} from 'react-native';

import Auth from './screens/Auth/Auth';
import ForgotPass from './screens/Auth/ForgotPass/ForgotPassword';
import Home from './screens/Home/Home';
import Genre from './screens/Genre/Genre';
import Library from './screens/Library/Subscribed';
import Accounts from './screens/Accounts/Accounts';
import Search from './screens/Search/Search';

import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';

const Drawer = createDrawerNavigator();

const App = () => (
  <NavigationContainer>
    <StatusBar barStyle={'dark-content'} />
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen name="Auth" component={Auth} />
      <Drawer.Screen name="ForgotPassword" component={ForgotPass} />
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="Library" component={Library} />
      <Drawer.Screen name="Accounts" component={Accounts} />
      <Drawer.Screen name="Search" component={Search} />
    </Drawer.Navigator>
  </NavigationContainer>
);

const styles = StyleSheet.create({});

export default App;
