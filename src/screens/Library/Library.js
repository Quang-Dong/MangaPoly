import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  StatusBar,
  useWindowDimensions,
} from 'react-native';

import {wp} from '../../lib/responsive';

import ListManga from '../Home/ListItem/ListManga';
import History from './History';
import Bookmark from './Bookmark';

import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();

const Home = ({navigation}) => {
  const openMenu = () => {
    navigation.openDrawer();
  };
  const {width} = useWindowDimensions();
  return (
    <SafeAreaView style={styles.container}>
      <Tab.Navigator
        lazy={true}
        tabBarOptions={{
          labelStyle: styles.labelStyle,
          style: styles.tabBarOptions,
          indicatorStyle: styles.indicatorStyle,
        }}>
        <Tab.Screen
          name="History"
          component={History}
          options={{title: 'Lịch sử'}}
        />
        <Tab.Screen
          name="Bookmark"
          component={Bookmark}
          options={{title: 'Bộ sưu tập'}}
        />
      </Tab.Navigator>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E3F1FA',
  },
  labelStyle: {
    textTransform: 'none',
    fontSize: wp(16),
    fontFamily: 'SF-Pro-Rounded-Medium',
  },
  tabBarOptions: {
    backgroundColor: '#E3F1FA',
    borderWidth: 0,
    elevation: 0,
  },
  indicatorStyle: {
    backgroundColor: 'black',
  },
});

export default Home;
