/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  View,
  Text,
  StatusBar,
  KeyboardAvoidingView,
  TouchableOpacity,
} from 'react-native';

import AuthSignIn from './SignIn/SignIn';
import AuthSignUp from './SignOut/SignUp';

import {Neomorph} from 'react-native-neomorph-shadows';

const Auth = ({navigation}) => {
  const [SignIn, setSignIn] = useState(true);

  const MainJSX = SignIn ? (
    <AuthSignIn navigation={navigation} />
  ) : (
    <AuthSignUp />
  );

  return (
    <KeyboardAvoidingView
      behavior="height"
      enabled={false}
      style={{
        flex: 1,
        backgroundColor: '#E3F1FA',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <StatusBar barStyle={'light-content'} backgroundColor="#E3F1FA" />

      <View
        style={{
          height: 500,
          justifyContent: 'space-between',
          alignItems: 'center',
          // backgroundColor: 'red',
        }}>
        {MainJSX}
        <View
          style={{
            width: 220,
            height: 40,
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: 'row',
          }}>
          <TouchableOpacity onPress={() => setSignIn(true)}>
            <Neomorph
              inner={SignIn ? true : false}
              swapShadows // <- change zIndex of each shadow color
              style={{
                shadowRadius: 7,
                borderRadius: SignIn ? 10 : 10.1, //bỏ dòng này sẽ mất radius khi false
                backgroundColor: '#E3F1FA',
                width: 100,
                height: 40,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text style={{fontSize: 20}}>Sign In</Text>
            </Neomorph>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setSignIn(false)}>
            <Neomorph
              inner={SignIn ? false : true}
              swapShadows // <- change zIndex of each shadow color
              style={{
                shadowRadius: 7,
                borderRadius: 10,
                backgroundColor: '#E3F1FA',
                width: 100,
                height: 40,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text style={{fontSize: 20}}>Sign Up</Text>
            </Neomorph>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Auth;
