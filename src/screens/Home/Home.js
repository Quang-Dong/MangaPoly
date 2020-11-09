import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  StatusBar,
  useWindowDimensions,
} from 'react-native';

import {wp} from '../../lib/responsive';

import Header from './Header/Header';
import ForYou from './TopBar/ForYou/ForYou';
import ListMangaGenre from '../ListItem/ListMangaGenre';

import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();

const Home = (props) => {
  const {data} = props.route.params;

  const openMenu = () => {
    props.navigation.openDrawer();
  };

  const {width} = useWindowDimensions();
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={'light-content'} />
      <Header openMenu={openMenu} navigation={props.navigation} />
      <Tab.Navigator
        lazy={true}
        tabBarOptions={{
          scrollEnabled: true,
          labelStyle: styles.labelStyle,
          tabStyle: {width: width / 3.2},
          style: styles.tabBarOptions,
          indicatorStyle: styles.indicatorStyle,
        }}>
        <Tab.Screen
          name="ForYou"
          component={ForYou}
          options={{title: 'Cho bạn'}}
        />
        {data.map((e) => (
          <Tab.Screen key={e.key} name={e.genres} component={ListMangaGenre} />
        ))}
      </Tab.Navigator>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#E3F1FA'},
  labelStyle: {
    textTransform: 'capitalize',
    fontSize: wp(16),
    fontFamily: 'SF-Pro-Rounded-Medium',
  },
  tabBarOptions: {
    backgroundColor: '#E3F1FA',
    borderWidth: 0,
    elevation: 0,
    marginLeft: wp(30),
    marginBottom: wp(20),
  },
  indicatorStyle: {
    backgroundColor: 'black',
    width: wp(70),
    marginLeft: wp(27),
  },
});

export default Home;
