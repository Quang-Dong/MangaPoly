import React from 'react';
import {StyleSheet, ScrollView, StatusBar} from 'react-native';

import * as action from '../../../../redux/actions/actions';

import Item from './Item/Item';
import ShuffleItem from './Item/ShuffleItem';

import {connect} from 'react-redux';

const ForYou = (props) => (
  <ScrollView style={styles.container}>
    <StatusBar barStyle={'light-content'} />
    {/* START - Trending */}
    <Item navigation={props.navigation} title="Thịnh hành" />

    {/* START - New chapter */}
    <Item navigation={props.navigation} title="Tập mới nhất" />

    {/* START - Recommend */}
    <ShuffleItem navigation={props.navigation} title="Hôm nay đọc gì?" />
  </ScrollView>
);

// const mapDispatchToProps = (dispatch) => ({
//   increment: () => dispatch(action.counterIncrease(2)),
//   decrement: () => dispatch(action.counterDecrease(3)),
//   click: () => dispatch(action.click()),
// });

// const mapStateToProps = (state) => ({
//   counter1: state.counter,
// });

export default connect(null, action)(ForYou);

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#E3F1FA'},
});
