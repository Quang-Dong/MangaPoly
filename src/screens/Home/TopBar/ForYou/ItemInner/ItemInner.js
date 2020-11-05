import React from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

import {hp, wp} from '../../../../../lib/responsive';

import arrow_right from '../../../../../Assets/icon/arrow_right.png';

const _title = (props) => (
  <TouchableOpacity
    onPress={() => {
      props.navigation.navigate('ListManga', {title: props.title});
    }}
    style={styles.titleContainer}>
    <Text style={styles.titleText}>{props.title}</Text>
    <Image source={arrow_right} style={{width: wp(40), height: hp(40)}} />
  </TouchableOpacity>
);

const _content = (props) => (
  <TouchableOpacity
    style={styles.contentContainer}
    onPress={() => {
      props.navigation.navigate('DetailItem', {
        pic: props.pic,
        title: props.title,
        author: props.author,
        state: props.state,
        totalLikes: props.totalLikes,
        totalReads: props.totalReads,
      });
    }}>
    <Image
      source={{uri: props.pic}}
      resizeMode="cover"
      style={styles.contentImg}
    />
    <View style={styles.contentTextView}>
      <Text style={styles.contentText}>{props.title}</Text>
    </View>
  </TouchableOpacity>
);

export {_title, _content};

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp(20),
    justifyContent: 'space-between',
  },
  titleText: {
    fontSize: wp(17),
    fontFamily: 'SF-Pro-Rounded-Medium',
    letterSpacing: 1,
  },
  contentContainer: {
    marginStart: wp(20),
  },
  contentImg: {
    width: wp(120),
    height: hp(150),
    borderRadius: 10,
  },
  contentTextView: {
    alignItems: 'center',
    width: wp(120),
    height: hp(70),
    justifyContent: 'space-between',
  },
  contentText: {
    fontFamily: 'SF-Pro-Rounded-Medium',
  },
});
