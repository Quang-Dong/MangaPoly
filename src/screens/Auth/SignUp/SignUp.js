import React, {useState} from 'react';
import {
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  StyleSheet,
  Text,
  ActivityIndicator,
  View,
  Keyboard,
} from 'react-native';

import TextInputLayout from '../../../components/textInputLayout';
import firebaseApp from '../../../core/firebase/firebaseConfig';

import {Neomorph} from 'react-native-neomorph-shadows';
import Icon from 'react-native-vector-icons/FontAwesome5';

const SignUp = ({navigation}) => {
  const [isShowLoading, setIsShowLoading] = useState(false);
  const [hidePass, setHidePass] = useState(true);
  const [err, setErr] = useState(null);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');

  const signUp = () => {
    //ẩn bàn phím.
    Keyboard.dismiss();
    //show loading screen
    setIsShowLoading(true);

    if (password.trim() !== rePassword.trim()) {
      setErr('Mật khẩu không trùng khớp!');
      setIsShowLoading(false);
    } else if (fullName.trim().length < 3) {
      setErr('Họ và tên trống!');
      setIsShowLoading(false);
    } else {
      //push user data lên firebase.
      firebaseApp
        .auth()
        .createUserWithEmailAndPassword(email.trim(), password.trim())
        .catch((error) => {
          setIsShowLoading(false);
          const errorCode = error.code;
          const errorMessage = error.message;
          if (errorCode === 'auth/weak-password') {
            setErr('Mật khẩu ngắn dưới 6 kí tự!');
          } else if (errorCode === 'auth/email-already-in-use') {
            setErr('Email đã tồn tại!');
          } else if (errorCode === 'auth/invalid-email') {
            setErr('Email không hợp lệ!');
          } else {
            setErr(errorMessage);
          }
          console.log(error);
        });

      //lắng nghe nếu người dùng đăng ký thành công.
      //Nên dùng 'return' để trả về kết quả cuối để tránh rò rỉ ram.
      return firebaseApp.auth().onAuthStateChanged(async (user) => {
        setIsShowLoading(true);
        if (user) {
          await firebaseApp.database().ref('Users').child(user.uid).set({
            id: user.uid,
            ava: '',
            email: user.email.trim(),
            type: 'normal',
            fullName: fullName.trim(),
            created: Date.now(),
          });

          user.updateProfile({
            displayName: fullName.trim(),
          });
        } else {
          setErr('Có lỗi gì đó xảy ra, vui lòng khởi động lại ứng dụng!');
        }
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* START - loading screen */}
      {isShowLoading ? (
        <View style={styles.loading}>
          <ActivityIndicator animating={true} size="large" color="black" />
        </View>
      ) : null}
      {/* END - loading screen */}

      <Text style={styles.txtError}>{err}</Text>

      {/* START - TextInput Layout Full name */}
      <TextInputLayout>
        <TextInput
          style={styles.txtInput}
          placeholder="Họ và tên"
          autoCompleteType="name"
          autoCapitalize="words"
          keyboardType="name-phone-pad"
          textContentType="name"
          value={fullName}
          onChangeText={(val) => setFullName(val)}
        />
      </TextInputLayout>
      {/* END - TextInput Layout Full name */}

      {/* START - TextInput Layout Email */}
      <TextInputLayout>
        <TextInput
          style={styles.txtInput}
          placeholder="Email"
          autoCompleteType="email"
          autoCapitalize="none"
          keyboardType="email-address"
          textContentType="emailAddress"
          value={email}
          onChangeText={(val) => setEmail(val.trim())}
        />
      </TextInputLayout>
      {/* END - TextInput Layout Email */}

      {/* START - TextInput Layout password */}
      <TextInputLayout type={true}>
        <TextInput
          style={styles.txtInputPass}
          placeholder="Mật khẩu"
          autoCompleteType="password"
          textContentType="password"
          autoCapitalize="none"
          secureTextEntry={hidePass ? true : false}
          value={password}
          onChangeText={(val) => setPassword(val.trim())}
        />
        <Icon
          name={hidePass ? 'eye-slash' : 'eye'}
          size={15}
          color="grey"
          onPress={() => setHidePass(!hidePass)}
        />
      </TextInputLayout>
      {/* END - TextInput Layout password */}

      {/* START - TextInput Layout confirm password */}
      <TextInputLayout type={true}>
        <TextInput
          style={styles.txtInputPass}
          placeholder="Xác nhận mật khẩu"
          autoCompleteType="password"
          textContentType="password"
          autoCapitalize="none"
          secureTextEntry={hidePass ? true : false}
          value={rePassword}
          onChangeText={(val) => setRePassword(val.trim())}
        />
        <Icon
          name={hidePass ? 'eye-slash' : 'eye'}
          size={15}
          color="grey"
          onPress={() => setHidePass(!hidePass)}
        />
      </TextInputLayout>
      {/* END - TextInput Layout confirm password */}

      {/* START - TextInput Layout button sign up */}
      <TouchableOpacity onPress={() => signUp()}>
        <Neomorph style={styles.btnSignUp}>
          <Icon name="arrow-right" size={20} color="grey" />
        </Neomorph>
      </TouchableOpacity>
      {/* END - TextInput Layout button sign up */}
    </SafeAreaView>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  btnSignUp: {
    shadowRadius: 7,
    borderRadius: 20,
    backgroundColor: '#E3F1FA',
    width: 40,
    height: 40,
    marginVertical: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtInput: {
    width: 230,
    fontFamily: 'SF-Pro-Rounded-Medium',
  },
  txtInputPass: {
    width: 200,
    fontFamily: 'SF-Pro-Rounded-Medium',
  },
  txtError: {
    color: 'red',
    fontFamily: 'SF-Pro-Rounded-Medium',
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
