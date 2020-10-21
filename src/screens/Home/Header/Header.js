import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  StatusBar,
} from 'react-native';

import ic_menu from '../../../Assets/icon/menu1.png';
import ic_search from '../../../Assets/icon/search0.png';

import {wp, hp} from '../../../lib/responsive';

const Header = (props) => {
  return (
    <View style={styles.wrapper}>
      <StatusBar barStyle="light-content" backgroundColor="#E3F1FA" />
      <View style={styles.header_row1}>
        <TouchableOpacity onPress={props.openMenu}>
          <Image source={ic_menu} style={styles.header_icon} />
        </TouchableOpacity>
        <Text style={styles.header_title}>MangaPoly</Text>
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate('Search');
          }}>
          <Image source={ic_search} style={styles.header_icon} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  wrapper: {
    marginTop: wp(10),
    height: hp(60),
    backgroundColor: '#E3F1FA',
    justifyContent: 'space-around',
    paddingHorizontal: wp(10),
    paddingBottom: wp(5),
  },
  header_row1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  header_title: {
    color: 'black',
    fontSize: wp(23),
    fontFamily: 'SF-Pro-Rounded-Medium',
    letterSpacing: 5,
  },
  header_icon: {
    width: wp(40),
    height: hp(40),
  },
});
