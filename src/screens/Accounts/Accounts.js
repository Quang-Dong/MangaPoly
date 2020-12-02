import React, {useEffect, useState, useRef} from 'react';

import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ToastAndroid,
  Platform,
} from 'react-native';

import {wp, width} from '../../lib/responsive';
import firebaseApp from '../../core/firebase/firebaseConfig';
import ic_avaUser from '../../Assets/icon/ic_user.png';

import {Neomorph} from 'react-native-neomorph-shadows';
import ImagePicker from 'react-native-image-picker';
import {
  MenuProvider,
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
  renderers,
} from 'react-native-popup-menu';

const Accounts = (props) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [ava, setAva] = useState();
  const [clicked, setClicked] = useState(false);
  const [nameClick, setNameClick] = useState('');
  const [isEdit, setIsEdit] = useState(false);
  const nameInput = useRef(null);
  const emailInput = useRef(null);

  const usersRef = firebaseApp.database().ref('Users');
  const avaRef = firebaseApp.storage().ref('Users');
  const user = firebaseApp.auth().currentUser;

  const {navigation} = props;

  useEffect(() => {
    //get user name from firebase
    usersRef.child(user.uid).on('value', (snapshot) => {
      const userName = snapshot.child('fullName').val();
      const userEmail = snapshot.child('email').val();
      const userAva = snapshot.child('ava').val();
      setFullName(userName);
      setEmail(userEmail);
      setAva(userAva);
      console.log('useEffect - Account');
    });
  }, []);

  const launchCamera = () => {
    ImagePicker.launchCamera(
      {mediaType: 'photo', storageOptions: {skipBackup: true, path: 'images'}},
      (res) => {
        if (res.error) {
          console.log('ImagePicker Error: ' + res.error);
        } else {
          ToastAndroid.show('Đang đổi ảnh đại diện . . .', ToastAndroid.SHORT);
          uploadImageToFirebase(res.uri, user.uid);
        }
      },
    );
  };

  const chooseImage = () => {
    ImagePicker.launchImageLibrary(
      {mediaType: 'photo', storageOptions: {skipBackup: true, path: 'images'}},
      (res) => {
        if (res.error) {
          console.log('ImagePicker Error: ' + res.error);
        } else {
          ToastAndroid.show('Đang đổi ảnh đại diện . . .', ToastAndroid.SHORT);
          uploadImageToFirebase(res.uri, user.uid);
        }
      },
    );
  };

  const uploadImageToFirebase = async (uri, userUID) => {
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = () => {
        resolve(xhr.response);
      };
      xhr.responseType = 'blob';
      xhr.open('GET', uri, true);
      xhr.send(null);
    });

    const ref = avaRef.child(userUID).child('ava');

    let snapshot = await ref.put(blob);

    return await snapshot.ref.getDownloadURL().then((url) => {
      usersRef.child(user.uid).update({ava: url});
      ToastAndroid.show('Đổi ảnh đại diện thành công!', ToastAndroid.SHORT);
    });
  };

  return (
    <MenuProvider>
      <SafeAreaView style={styles.container}>
        {/* START - Popup menu */}
        <Menu
          opened={clicked}
          renderer={renderers.SlideInMenu}
          onBackdropPress={() => setClicked(false)}>
          <MenuTrigger />
          <MenuOptions
            customStyles={{
              optionsWrapper: {},
              optionsContainer: {
                height: 300,
                backgroundColor: 'transparent',
                alignItems: 'center',
              },
              OptionTouchableComponent: TouchableOpacity,
              optionText: styles.accountName,
            }}>
            {/*START - Avatar*/}
            {nameClick === 'Avatar' && (
              <>
                <TouchableOpacity onPress={() => setClicked(false)}>
                  <Neomorph style={styles.itemLayout}>
                    <MenuOption
                      onSelect={() => {
                        setClicked(false);
                        launchCamera();
                      }}
                      text="Chụp ảnh"
                    />
                  </Neomorph>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setClicked(false)}>
                  <Neomorph style={styles.itemLayout}>
                    <MenuOption
                      onSelect={() => {
                        setClicked(false);
                        chooseImage();
                      }}
                      text="Chọn ảnh"
                    />
                  </Neomorph>
                </TouchableOpacity>
              </>
            )}
            {/*END - Avatar*/}
            {/*START - Name*/}
            {nameClick === 'Name' && (
              <TouchableOpacity
                onPress={() => {
                  setIsEdit(!isEdit);
                  setClicked(false);
                  setTimeout(() => {
                    nameInput.current.focus();
                  }, 100);
                }}>
                <Neomorph style={styles.itemLayout}>
                  <MenuOption
                    onSelect={() => {
                      setIsEdit(!isEdit);
                      setClicked(false);
                      setTimeout(() => {
                        nameInput.current.focus();
                      }, 100);
                    }}
                    text="Sửa họ và tên"
                  />
                </Neomorph>
              </TouchableOpacity>
            )}
            {/*END - Name*/}
            {/*START - Email*/}
            {nameClick === 'Email' && (
              <TouchableOpacity
                onPress={() => {
                  setIsEdit(!isEdit);
                  setClicked(false);
                  setTimeout(() => {
                    emailInput.current.focus();
                  }, 100);
                }}>
                <Neomorph style={styles.itemLayout}>
                  <MenuOption
                    onSelect={() => {
                      setIsEdit(!isEdit);
                      setClicked(false);
                      setTimeout(() => {
                        emailInput.current.focus();
                      }, 100);
                    }}
                    text="Sửa email"
                  />
                </Neomorph>
              </TouchableOpacity>
            )}
            {/*END - Email*/}
          </MenuOptions>
        </Menu>
        {/* END - Popup menu */}
        {/*START - Avatar */}
        <TouchableOpacity
          disabled={isEdit}
          onPress={() => {
            setClicked(true);
            setNameClick('Avatar');
          }}>
          <Neomorph style={styles.avatarLayout}>
            <Image
              style={{width: 120, height: 120, borderRadius: 60}}
              source={ava ? {uri: ava} : ic_avaUser}
            />
          </Neomorph>
        </TouchableOpacity>
        {/*END - Avatar */}
        {/*START - Name */}
        <TouchableOpacity
          disabled={isEdit}
          onPress={() => {
            //khi click = true thì sẽ hiện cái popup menu
            setClicked(true);
            setNameClick('Name');
          }}>
          <Neomorph
            inner={nameClick === 'Name' && isEdit}
            swapShadows
            style={styles.itemLayout}>
            <TextInput
              ref={nameInput}
              editable={nameClick === 'Name' && isEdit}
              onChangeText={(val) => {
                setFullName(val);
              }}
              onSubmitEditing={() => {
                setIsEdit(false);
                if (fullName !== user.displayName) {
                  usersRef.child(user.uid).child('fullName').set(fullName);
                  user
                    .updateProfile({
                      displayName: fullName,
                    })
                    .then(() => {
                      ToastAndroid.show(
                        'Đổi tên thành công!',
                        ToastAndroid.SHORT,
                      );
                    })
                    .catch(() => {
                      ToastAndroid.show(
                        'Có lỗi xảy ra, không thể đổi tên!',
                        ToastAndroid.SHORT,
                      );
                    });
                }
              }}
              autoCompleteType="name"
              autoCapitalize="words"
              keyboardType="name-phone-pad"
              textContentType="name"
              style={styles.accountName}>
              {fullName}
            </TextInput>
          </Neomorph>
        </TouchableOpacity>
        {/*END - Name */}
        {/*START - Email */}
        <TouchableOpacity
          disabled={isEdit}
          onPress={() => {
            setClicked(true);
            setNameClick('Email');
          }}>
          <Neomorph
            inner={nameClick === 'Email' && isEdit}
            swapShadows
            style={styles.itemLayout}>
            <TextInput
              ref={emailInput}
              editable={nameClick === 'Email' && isEdit}
              autoFocus={nameClick === 'Email' && isEdit}
              onSubmitEditing={() => {
                setIsEdit(false);
                if (email !== user.email) {
                  usersRef.child(user.uid).child('email').set(email);
                  user
                    .updateEmail(email)
                    .then(() => {
                      ToastAndroid.show(
                        'Đổi email thành công!',
                        ToastAndroid.SHORT,
                      );
                    })
                    .catch(() => {
                      ToastAndroid.show(
                        'Có lỗi xảy ra, không thể đổi email!',
                        ToastAndroid.SHORT,
                      );
                    });
                }
              }}
              autoCapitalize="none"
              autoCompleteType="email"
              keyboardType="email-address"
              textContentType="emailAddress"
              onChangeText={(val) => setEmail(val.trim())}
              style={styles.accountName}>
              {email}
            </TextInput>
          </Neomorph>
        </TouchableOpacity>
        {/*END - Email */}
        {/*START - Forgot pass */}
        <TouchableOpacity
          disabled={isEdit}
          onPress={() => {
            navigation.navigate('ForgotPassword');
          }}>
          <Neomorph style={styles.itemLayout}>
            <Text style={styles.accountName}>Đổi mật khẩu</Text>
          </Neomorph>
        </TouchableOpacity>
        {/*END - Forgot pass */}
      </SafeAreaView>
    </MenuProvider>
  );
};

//TODO: Thêm chính sách các thứ ở cuối screen cho đỡ chống

export default Accounts;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E3F1FA',
    alignItems: 'center',
  },
  avatarLayout: {
    shadowColor: 'grey',
    shadowOpacity: 0.2,
    shadowRadius: 7,
    borderRadius: 10,
    backgroundColor: 'white',
    width: width / 1.1,
    height: 140,
    marginVertical: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemLayout: {
    shadowColor: 'grey',
    shadowOpacity: 0.2,
    shadowRadius: 7,
    borderRadius: 10,
    backgroundColor: 'white',
    width: width / 1.1,
    height: 70,
    marginVertical: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  accountName: {
    fontSize: 20,
    color: '#95a5a6',
    fontFamily: 'SF-Pro-Rounded-Bold',
    letterSpacing: 3,
    textAlign: 'center',
    fontWeight: 'normal',
    width: width / 1.1,
  },
});
