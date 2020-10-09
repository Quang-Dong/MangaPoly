import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  useWindowDimensions,
} from 'react-native';

import {wp, hp} from '../../lib/responsive';

import Header from '../Header/Header';
import ForYou from './TopBar/ForYou';
import Action from './TopBar/Action';
import Aventure from './TopBar/Adventure';
import Fantasy from './TopBar/Fantasy';
import Horror from './TopBar/Horror';
import Romance from './TopBar/Romance';

import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();

const Home = ({navigation}) => {
  const openMenu = () => {
    navigation.openDrawer();
  };
  const {width} = useWindowDimensions();
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#E3F1FA'}}>
      <StatusBar barStyle={'light-content'} />
      <Header openMenu={openMenu} navigation={navigation} />
      <Tab.Navigator
        lazy={true}
        tabBarOptions={{
          scrollEnabled: true,
          labelStyle: {
            textTransform: 'capitalize',
            fontSize: wp(16),
            fontWeight: 'bold',
          },
          tabStyle: {width: width / 3.2},
          style: {
            backgroundColor: '#E3F1FA',
            borderWidth: 0,
            elevation: 0,
            marginLeft: 30,
            marginBottom: 20,
          },
          indicatorStyle: {
            backgroundColor: 'black',
            width: 70,
            marginLeft: 27,
          },
        }}>
        <Tab.Screen
          name="ForYou"
          component={ForYou}
          options={{title: 'Cho bạn'}}
        />
        <Tab.Screen
          name="Action"
          component={Action}
          options={{title: 'Hành động'}}
        />
        <Tab.Screen
          name="Aventure"
          component={Aventure}
          options={{title: 'Mạo hiểm'}}
        />
        <Tab.Screen
          name="Fantasy"
          component={Fantasy}
          options={{title: 'Huyền huyễn'}}
        />
        <Tab.Screen
          name="Horror"
          component={Horror}
          options={{title: 'Kinh dị'}}
        />
        <Tab.Screen
          name="Romance"
          component={Romance}
          options={{title: 'Lãng mạn'}}
        />
      </Tab.Navigator>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default Home;
