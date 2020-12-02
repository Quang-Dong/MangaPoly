import React, {useState} from 'react';
import {
  View,
  Text,
  StatusBar,
  KeyboardAvoidingView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import AuthSignIn from './SignIn/SignIn';
import AuthSignUp from './SignUp/SignUp';
import {wp, hp} from '../../lib/responsive';

import {Neomorph} from 'react-native-neomorph-shadows';

const Auth = ({navigation}) => {
  const [SignIn, setSignIn] = useState(true);

  const MainJSX = SignIn ? (
    <AuthSignIn navigation={navigation} />
  ) : (
    <AuthSignUp navigation={navigation} />
  );

  return (
    <KeyboardAvoidingView
      behavior="height"
      enabled={false}
      style={styles.container}>
      <StatusBar barStyle={'dark-content'} backgroundColor="#E3F1FA" />
      <Text style={styles.headerTitle}>MangaPoly</Text>

      {/* START - ContentLayout */}
      <View style={styles.contentLayout}>
        {MainJSX}
        {/* START - ContentBottomBtnSwitchLayout */}
        <View style={styles.contentBottomBtnLayout}>
          {/* START - ContentBottomBtnSwitchSignIn */}
          <TouchableOpacity onPress={() => setSignIn(true)}>
            <Neomorph
              inner={SignIn ? true : false}
              swapShadows // <- change zIndex of each shadow color
              style={styles.contentBottomBtnSwitch(SignIn)}>
              <Text style={styles.contentBottomBtnSwitchTxt}>Đăng nhập</Text>
            </Neomorph>
          </TouchableOpacity>
          {/* END - ContentBottomBtnSwitchSignIn */}

          {/* START - ContentBottomBtnSwitchSignUp */}
          <TouchableOpacity onPress={() => setSignIn(false)}>
            <Neomorph
              inner={SignIn ? false : true}
              swapShadows // <- change zIndex of each shadow color
              style={styles.contentBottomBtnSwitch(SignIn)}>
              <Text style={styles.contentBottomBtnSwitchTxt}>Đăng ký</Text>
            </Neomorph>
          </TouchableOpacity>
          {/* END - ContentBottomBtnSwitchSignUp */}
        </View>
        {/* END - ContentBottomBtnSwitchLayout */}
      </View>
      {/* END - ContentLayout */}
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E3F1FA',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  headerTitle: {
    color: 'black',
    fontSize: wp(23),
    fontFamily: 'SF-Pro-Rounded-Medium',
    letterSpacing: 5,
  },
  contentLayout: {
    height: hp(500),
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  contentBottomBtnLayout: {
    width: wp(220),
    height: hp(40),
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  contentBottomBtnSwitch: (SignIn) => ({
    shadowRadius: wp(7),
    borderRadius: SignIn ? wp(10) : wp(10.1), //bỏ dòng này sẽ mất radius khi false
    backgroundColor: '#E3F1FA',
    width: wp(100),
    height: hp(40),
    alignItems: 'center',
    justifyContent: 'center',
  }),
  contentBottomBtnSwitchTxt: {
    fontSize: wp(15),
    fontFamily: 'SF-Pro-Rounded-Medium',
  },
});

export default Auth;
