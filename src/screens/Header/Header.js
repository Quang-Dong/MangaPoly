import React from 'react';
import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
  Image,
  TextInput,
  StatusBar,
} from 'react-native';

import ic_menu from '../../Assets/icon/menu1.png';
import ic_search from '../../Assets/icon/search0.png';

import {wp, hp} from '../../lib/responsive';

const Header = (props) => {
  return (
    <View style={styles.wrapper}>
      <StatusBar barStyle="light-content" backgroundColor="#E3F1FA" />
      <View style={styles.header_row1}>
        <TouchableOpacity onPress={props.openMenu}>
          <Image source={ic_menu} style={styles.header_icon} />
        </TouchableOpacity>
        <Text style={styles.header_title}>M a n g a P o l y</Text>
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
    marginTop: 10,
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
    fontSize: wp(25),
    fontFamily: 'Avenir',
  },
  header_icon: {
    width: wp(40),
    height: hp(40),
  },
});
