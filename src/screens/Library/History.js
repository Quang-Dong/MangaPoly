import React, {useCallback, useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Pressable,
  View,
  Text,
  Image,
} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';

import {wp, hp, width} from '../../lib/responsive';
import firebaseApp from '../../core/firebase/firebaseConfig';

const History = (props) => {
  const [data, setData] = useState('');

  const historyRef = firebaseApp.database().ref('History');
  const user = firebaseApp.auth().currentUser;

  useEffect(() => {
    getHistory();
  }, [getHistory]);

  const getHistory = useCallback(() => {
    historyRef.child(user.uid).once('value', (snapshot) => {
      var historyData = [];
      snapshot.forEach((child) => {
        let data1 = child.val();
        historyData.push(data1);
      });
      setData(historyData);
    });
  }, [historyRef, user.uid]);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({item}) => {
          return (
            // START - Item
            <Pressable
              onPress={() => {
                props.navigation.navigate('DetailItem', {mangaID: item.id});
              }}
              android_ripple={{color: 'grey', radius: wp(200)}}
              style={styles.items}>
              {/* START - Poster */}
              <Image
                source={{uri: item.poster}}
                resizeMode="cover"
                style={{
                  height: hp(170),
                  width: wp(120),
                  borderRadius: wp(10),
                }}
              />
              {/* END - Poster */}
              {/* START - Right content */}
              <View style={styles.rightContent}>
                {/* START - Title */}
                <Text style={styles.titleTxt}>{item.title}</Text>
                {/* END - Title */}

                {/* START - Last read */}
                <Text
                  style={
                    styles.iconTxt
                  }>{`Lần đọc trước: Chapter ${item.lastRead}`}</Text>
                {/* END - Last read */}
                {/* START - Newest chapter */}
                <Text
                  style={
                    styles.iconTxt
                  }>{`Tập mới nhất: Chapter ${item.latestChapter}`}</Text>
                {/* END - Newest chapter */}
                {/* START - State */}
                <View style={styles.stateView}>
                  <Text style={styles.stateTxt}>{item.state}</Text>
                </View>
                {/* END - State */}
              </View>
              {/* END - Right content */}
            </Pressable>
            // END - Item
          );
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E3F1FA',
  },
  items: {
    flexDirection: 'row',
    height: hp(170),
    width: width,
    margin: wp(10),
  },
  rightContent: {
    flexDirection: 'column',
    flexWrap: 'nowrap',
    flex: 1,
    paddingHorizontal: wp(10),
  },
  titleTxt: {
    fontFamily: 'SF-Pro-Rounded-Bold',
    letterSpacing: 1,
    color: '#2f3640',
  },
  genreContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  genreItem: {
    borderWidth: 1,
    borderColor: '#95a5a6',
    paddingHorizontal: wp(5),
    marginRight: wp(5),
    marginTop: wp(5),
    fontSize: wp(12),
    borderRadius: wp(5),
    color: '#95a5a6',
    fontFamily: 'SF-Pro-Rounded-Medium',
  },
  iconsContainer: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  iconView: {
    alignItems: 'center',
    flexDirection: 'row',
    width: 50,
    justifyContent: 'space-evenly',
    marginRight: 10,
  },
  iconTxt: {
    color: '#95a5a6',
    fontFamily: 'SF-Pro-Rounded-Light',
  },
  stateView: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  stateTxt: {
    color: '#95a5a6',
    fontFamily: 'SF-Pro-Rounded-Thin',
  },
});

export default History;
