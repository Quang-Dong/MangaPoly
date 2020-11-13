import React, {useState, useEffect, useCallback} from 'react';
import {StyleSheet, View, Text, Pressable, Image} from 'react-native';
import {
  FlatList,
  TextInput,
  TouchableOpacity,
} from 'react-native-gesture-handler';

import {wp, hp} from '../../lib/responsive';

import ic_send from '../../Assets/icon/ic_send.png';
import firebaseApp from '../../core/firebase/firebaseConfig';
import ic_user from '../../Assets/icon/ic_user.png';

const cmtRef = firebaseApp.database().ref('Comments');
const userRef = firebaseApp.database().ref('Users');

const ListCmt = (props) => {
  const [size, setSize] = useState(50);
  const [val, setVal] = useState(''); //dữ liệu của textInput khi viết cmt
  const [data, setData] = useState(''); //dữ liệu get từ firebase về
  const [fullName, setFullName] = useState('Họ và tên');
  const [avatar, setAvatar] = useState('');
  const [uID, setUID] = useState('');

  const {id} = props.route.params; // id truyện cần get cmt

  const getCmt = useCallback(() => {
    cmtRef.child(`${id}`).on('value', (snapshot) => {
      var li = [];
      snapshot.forEach((child) => {
        let info = child.child('info').val();

        child.child('cmts').forEach((child1) => {
          let cmt = child1.val();
          let key = child1.key;
          li.push({key, info, cmt});
        });
      });
      //   console.log(li);
      setData(li);
    });
  }, []);

  const getUser = () => {
    firebaseApp.auth().onAuthStateChanged((user) => {
      if (user) {
        setUID(user.uid);
        userRef.child(user.uid).once('value', (snapshot) => {
          setFullName(snapshot.val() ? snapshot.val().fullName : 'undefined');
          setAvatar(snapshot.val() ? snapshot.val().ava : '');
        });
      } else {
      }
    });
  };

  useEffect(() => {
    getCmt();
    getUser();
  }, []); //useEffect chỉ chạy khi dữ liệu ở comments thay đổi

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={({item}) => (
          <View key={item.key} style={styles.cmtLayout}>
            <Image
              source={
                item.info.avatar === '' ? ic_user : {uri: item.info.avatar}
              }
              resizeMode="cover"
              style={styles.avaLayout}
            />
            <View style={styles.cmtRightLayout}>
              <Pressable android_ripple={{color: 'white', radius: 500}}>
                <View style={styles.cmtRightLayoutNext}>
                  <Text style={styles.nameLayout}>{item.info.userName}</Text>
                  <Text style={styles.contentLayout}>{item.cmt.userCmt}</Text>
                </View>
              </Pressable>
              <View style={{flexDirection: 'row'}}>
                <Text style={styles.uploadedLayout}>
                  {new Date(item.cmt.timeCreated).toLocaleDateString() +
                    ' - ' +
                    new Date(item.cmt.timeCreated).toLocaleTimeString()}
                </Text>
                {item.info.uid === uID && (
                  <TouchableOpacity
                    onPress={() => {
                      const cmtUserRef = cmtRef.child(id).child(uID);
                      cmtUserRef.child('cmts').child(item.key).remove();
                    }}>
                    <Text style={styles.uploadedLayout}>Xóa</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </View>
        )}
        keyExtractor={(item) => item.key}
      />
      <View style={styles.writeCmtLayout}>
        <TextInput
          placeholder="Viết bình luận . . ."
          style={styles.txtInputLayout}
          value={val}
          onChangeText={(value) => setVal(value)}
        />
        <Pressable
          onPressIn={() => {
            setSize(60);
          }}
          onPressOut={() => {
            setSize(50);
          }}
          onPress={() => {
            const ref = cmtRef.child(id).child(uID);
            ref.child('info').set({
              avatar: avatar,
              userName: fullName,
              uid: uID,
            });
            ref.child('cmts').push({
              timeCreated: Date.now(),
              userCmt: val,
            });
            setVal('');
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

export default ListCmt;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E3F1FA',
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
