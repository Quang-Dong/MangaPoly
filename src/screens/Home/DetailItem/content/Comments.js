import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text, Pressable, Image} from 'react-native';
import {FlatList, TextInput} from 'react-native-gesture-handler';

import {wp, hp} from '../../../../lib/responsive';

import ic_user from '../../../../Assets/icon/ic_user.png';
import ic_send from '../../../../Assets/icon/ic_send.png';
import firebaseApp from '../../../../core/firebase/firebaseConfig';

const db = firebaseApp.database().ref('Comments');
const Comments = (props) => {
  const [size, setSize] = useState(50);
  const [data, setData] = useState('');
  const {id, navigation} = props;

  const getCmt = () => {
    db.child(`${id}`).on('value', (snapshot) => {
      var li = [];
      snapshot.forEach((child) => {
        let info = child.child('info').val();
        child.child('cmts').forEach((child1) => {
          let cmt = child1.val();
          let key = child1.key;
          li.push({key, info, cmt});
        });
      });
      // console.log(li);
      setData(li);
    });
  };

  useEffect(() => {
    getCmt();
  }, [db]);

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={({item}) => (
          <Pressable
            key={item.key}
            android_ripple={{color: 'white', radius: wp(500)}}
            style={styles.cmtLayout}>
            <Image
              source={
                item.info.avatar === '' ? ic_user : {uri: item.info.avatar}
              }
              resizeMode="cover"
              style={styles.avaLayout}
            />
            <View style={styles.cmtRightLayout}>
              <View style={styles.cmtRightLayoutNext}>
                <Text style={styles.nameLayout}>{item.info.userName}</Text>
                <Text style={styles.contentLayout}>{item.cmt.userCmt}</Text>
              </View>
              <Text style={styles.uploadedLayout}>{item.cmt.timeCreated}</Text>
            </View>
          </Pressable>
        )}
        keyExtractor={(item) => item.key}
      />
      <Pressable
        onPress={() => {
          navigation.navigate('ListCmt', {data, id});
        }}
        style={styles.writeCmtLayout}>
        <TextInput
          editable={false}
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
      </Pressable>
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
    margin: wp(5),
    alignItems: 'flex-start',
  },
  cmtRightLayout: {
    flex: 4,
    flexDirection: 'column',
    marginHorizontal: wp(5),
  },
  cmtRightLayoutNext: {
    borderRadius: wp(10),
    paddingHorizontal: wp(5),
    paddingBottom: wp(5),
  },
  avaLayout: {
    width: wp(50),
    height: hp(50),
    borderRadius: wp(25),
  },
  nameLayout: {
    fontSize: wp(14),
  },
  contentLayout: {
    fontWeight: 'bold',
    fontSize: wp(16),
  },
  uploadedLayout: {
    fontSize: wp(13),
    color: 'grey',
    fontWeight: 'bold',
    marginLeft: 5,
  },
  writeCmtLayout: {
    flexDirection: 'row',
    paddingLeft: wp(10),
  },
  txtInputLayout: {
    flex: 4.3,
    fontSize: wp(17),
    height: hp(60),
  },
  icSendLayout: {
    flex: 0.7,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icSend: (size) => ({width: wp(size), height: hp(size)}),
});
