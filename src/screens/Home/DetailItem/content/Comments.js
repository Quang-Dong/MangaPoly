import React, {useState} from 'react';
import {StyleSheet, View, Text, Pressable, Image} from 'react-native';
import {FlatList, TextInput} from 'react-native-gesture-handler';

import {wp, hp} from '../../../../lib/responsive';

import ic_user from '../../../../Assets/icon/ic_user.png';
import ic_send from '../../../../Assets/icon/ic_send.png';
import data from '../../../../core/data/dataCmt';

const Comments = () => {
  const [size, setSize] = useState(50);
  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={({item}) => (
          <Pressable
            android_ripple={{color: 'white', radius: wp(200)}}
            style={styles.cmtLayout}>
            <Image
              source={ic_user}
              resizeMode="cover"
              style={styles.avaLayout}
            />
            {/* eslint-disable-next-line react-native/no-inline-styles */}
            <View style={{flex: 4}}>
              <Text style={styles.nameLayout}>{item.name}</Text>
              <Text style={styles.contentLayout}>{item.content}</Text>
              <Text style={styles.uploadedLayout}>{item.uploaded}</Text>
            </View>
          </Pressable>
        )}
        keyExtractor={(item) => item.id}
      />
      <View style={styles.writeCmtLayout}>
        <TextInput
          placeholder="Viết bình luận . . ."
          style={styles.txtInputLayout}
        />
        <Pressable
          onPressIn={() => {
            setSize(60);
          }}
          onPressOut={() => {
            setSize(50);
          }}
          style={styles.icSendLayout}>
          <Image
            source={ic_send}
            resizeMode="cover"
            style={styles.icSend(size)}
          />
        </Pressable>
      </View>
    </View>
  );
};

export default Comments;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cmtLayout: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: wp(10),
    alignItems: 'flex-start',
  },
  avaLayout: {width: wp(70), height: hp(70), flex: 1},
  nameLayout: {fontSize: wp(17), fontWeight: 'bold'},
  contentLayout: {fontWeight: 'bold'},
  uploadedLayout: {fontSize: wp(13), color: 'grey', fontWeight: 'bold'},
  writeCmtLayout: {
    flexDirection: 'row',
    paddingLeft: wp(10),
  },
  txtInputLayout: {flex: 4.3, fontSize: wp(17), height: hp(60)},
  icSendLayout: {
    flex: 0.7,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icSend: (size) => ({width: wp(size), height: hp(size)}),
});
