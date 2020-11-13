import React from 'react';
import {StyleSheet, View, TextInput, Pressable} from 'react-native';

import PropTypes from 'prop-types';
import {connectSearchBox} from 'react-instantsearch-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';

// START - Header Search Screen
const HeaderSearch = ({currentRefinement, refine, navigation}) => (
  <View style={styles.container}>
    <Pressable
      onPress={() => navigation.goBack()}
      android_ripple={{color: 'gray', radius: 20, borderless: true}}
      style={styles.btnGoBack}>
      <AntDesign name="arrowleft" size={23} />
    </Pressable>
    <TextInput
      placeholder="Tìm kiếm . . ."
      autoFocus={true}
      returnKeyType="search"
      keyboardType="web-search"
      style={styles.txtInput}
      onChangeText={(value) => refine(value)}
      value={currentRefinement}
    />
    {currentRefinement === '' ? null : (
      <Pressable
        onPress={() => {
          refine('');
        }}
        android_ripple={{color: 'gray', radius: 20, borderless: true}}
        style={styles.btnDel}>
        <Ionicons name="close-circle" size={23} />
      </Pressable>
    )}
  </View>
);

HeaderSearch.propTypes = {
  currentRefinement: PropTypes.string.isRequired,
  refine: PropTypes.func.isRequired,
};

export default connectSearchBox(HeaderSearch);

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    margin: 10,
  },
  btnGoBack: {
    flex: 0.5,
    alignItems: 'center',
  },
  btnDel: {
    flex: 0.5,
    alignItems: 'center',
  },
  txtInput: {
    flex: 4,
  },
});
