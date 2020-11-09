import React, {useEffect, useState} from 'react';
import {
  Text,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  StyleSheet,
  ActivityIndicator,
  View,
  Keyboard,
} from 'react-native';

import TextInputLayout from '../../../components/textInputLayout';
import firebaseApp from '../../../core/firebase/firebaseConfig';

import {Neomorph} from 'react-native-neomorph-shadows';
import Icon from 'react-native-vector-icons/FontAwesome5';

const genreRef = firebaseApp.database().ref('Genres');

const SignIn = ({navigation}) => {
  const [hidePass, setHidePass] = useState(true);
  const [err, setErr] = useState(null);
  const [showLoading, setShowLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [data, setData] = useState();

  const getGenres = () => {
    var li = [];

    genreRef.once('value', (snapShot) => {
      snapShot.forEach((child) => {
        // console.log(child.key);
        const key = child.key;
        const genres = child.val();
        li.push({key, genres});
      });
      // setData(li);
      // console.log(li);
    });

    //onAuthStateChanged luôn luôn lắng nghe va xác thực xem, nếu người user data còn ở local hay
    //không thì cũng phải tắt loading screen đi, vì loading được bật mặc định.
    //Nên dùng 'return' để trả về kết quả cuối để tránh rò rỉ ram.

    firebaseApp.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log(user.email);
        setTimeout(() => {
          navigation.replace('Home', {data: li});
        }, 1000);
      } else {
        setShowLoading(false);
      }
    });
  };

  useEffect(() => {
    getGenres();
  }, []);

  const signIn = () => {
    Keyboard.dismiss();
    setShowLoading(true);
    firebaseApp
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        setErr('');
        setShowLoading(false);
        navigation.replace('Home');
      })
      .catch((error) => {
        setShowLoading(false);
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode === 'auth/user-not-found') {
          setErr('Tài khoản không tồn tại!');
        } else if (errorCode === 'auth/user-disabled') {
          setErr('Tài khoản đã bị vô hiệu hóa!');
        } else if (errorCode === 'auth/invalid-email') {
          setErr('Email không hợp lệ!');
        } else if (errorCode === 'auth/wrong-password') {
          setErr('Sai mật khẩu!');
        } else {
          setErr(errorMessage);
        }
        console.log(error);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* START - loading screen */}
      {showLoading ? (
        <View style={styles.loading}>
          <ActivityIndicator animating={true} size="large" color="black" />
        </View>
      ) : null}
      {/* END - loading screen */}
      <Text style={styles.txtError}>{err}</Text>
      {/* START - TextInput Layout Email */}
      <TextInputLayout>
        <TextInput
          style={styles.txtInputEmail}
          autoCapitalize="none"
          placeholder="Email"
          autoCompleteType="email"
          keyboardType="email-address"
          textContentType="emailAddress"
          value={email.trim()}
          onChangeText={(val) => setEmail(val.trim())}
        />
      </TextInputLayout>
      {/* END - TextInput Layout Email */}

      {/* START - TextInput Layout Password */}
      <TextInputLayout type={true}>
        <TextInput
          style={styles.txtInputPassword}
          placeholder="Mật khẩu"
          autoCapitalize="none"
          autoCompleteType="password"
          textContentType="password"
          secureTextEntry={hidePass ? true : false}
          value={password.trim()}
          onChangeText={(val) => setPassword(val.trim())}
        />
        <Icon
          name={hidePass ? 'eye-slash' : 'eye'}
          size={15}
          color="grey"
          onPress={() => setHidePass(!hidePass)}
        />
      </TextInputLayout>
      {/* END - TextInput Layout Password */}

      {/* START - Button  SignIn */}
      <TouchableOpacity
        onPress={() => {
          signIn();
        }}>
        <Neomorph style={styles.btn}>
          <Icon name="arrow-right" size={20} color="grey" />
        </Neomorph>
      </TouchableOpacity>
      {/* END - Button  SignIn */}

      {/* START - ForgotPassword */}
      <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
        <Text style={styles.txtForgotPass}>Quên mật khẩu?</Text>
      </TouchableOpacity>
      {/* END - ForgotPassword */}
    </SafeAreaView>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  txtError: {
    color: 'red',
    fontFamily: 'SF-Pro-Rounded-Medium',
  },
  txtInputEmail: {
    width: 230,
    fontFamily: 'SF-Pro-Rounded-Medium',
  },
  txtInputPassword: {
    width: 200,
    fontFamily: 'SF-Pro-Rounded-Medium',
  },
  btn: {
    shadowRadius: 7,
    borderRadius: 20,
    backgroundColor: '#E3F1FA',
    width: 40,
    height: 40,
    marginVertical: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtForgotPass: {
    fontFamily: 'SF-Pro-Rounded-Thin',
  },
  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    opacity: 0.5,
    backgroundColor: '#E3F1FA',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
});
