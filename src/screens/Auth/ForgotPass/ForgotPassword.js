/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {TouchableOpacity, SafeAreaView, TextInput} from 'react-native';

import {Neomorph} from 'react-native-neomorph-shadows';
import Icon from 'react-native-vector-icons/FontAwesome5';

const ForgotPassword = () => {
  const [hidePass, setHidePass] = useState(true);
  return (
    <SafeAreaView
      style={{
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#E3F1FA',
        justifyContent: 'center',
      }}>
      <Neomorph
        inner
        swapShadows // <- change zIndex of each shadow color
        style={{
          shadowRadius: 7,
          borderRadius: 10,
          backgroundColor: '#E3F1FA',
          width: 250,
          height: 50,
          marginVertical: 5,
          paddingHorizontal: 10,
          justifyContent: 'space-between',
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <TextInput
          style={{width: 200}}
          placeholder="Old password"
          autoCompleteType="password"
          secureTextEntry={hidePass ? true : false}
        />
        <Icon
          name={hidePass ? 'eye-slash' : 'eye'}
          size={15}
          color="grey"
          onPress={() => setHidePass(!hidePass)}
        />
      </Neomorph>
      <Neomorph
        inner
        swapShadows // <- change zIndex of each shadow color
        style={{
          shadowRadius: 7,
          borderRadius: 10,
          backgroundColor: '#E3F1FA',
          width: 250,
          height: 50,
          marginVertical: 5,
          paddingHorizontal: 10,
          justifyContent: 'space-between',
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <TextInput
          style={{width: 200}}
          placeholder="New password"
          autoCompleteType="password"
          secureTextEntry={hidePass ? true : false}
        />
        <Icon
          name={hidePass ? 'eye-slash' : 'eye'}
          size={15}
          color="grey"
          onPress={() => setHidePass(!hidePass)}
        />
      </Neomorph>
      <Neomorph
        inner
        swapShadows // <- change zIndex of each shadow color
        style={{
          shadowRadius: 7,
          borderRadius: 10,
          backgroundColor: '#E3F1FA',
          width: 250,
          height: 50,
          marginVertical: 5,
          paddingHorizontal: 10,
          justifyContent: 'space-between',
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <TextInput
          style={{width: 200}}
          placeholder="Confirm password"
          autoCompleteType="password"
          secureTextEntry={hidePass ? true : false}
        />
        <Icon
          name={hidePass ? 'eye-slash' : 'eye'}
          size={15}
          color="grey"
          onPress={() => setHidePass(!hidePass)}
        />
      </Neomorph>
      <TouchableOpacity onPress={() => {}}>
        <Neomorph
          style={{
            shadowRadius: 7,
            borderRadius: 20,
            backgroundColor: '#E3F1FA',
            width: 40,
            height: 40,
            marginVertical: 15,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Icon name="arrow-right" size={20} color="grey" />
        </Neomorph>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default ForgotPassword;
