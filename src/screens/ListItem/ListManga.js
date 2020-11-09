import React from 'react';
import {SafeAreaView, StyleSheet, View, Text, Image} from 'react-native';
import {FlatList, TouchableOpacity} from 'react-native-gesture-handler';

import {wp, hp, width} from '../../lib/responsive';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const ListManga = (props) => {
  const {data} = props.route.params;

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        extraData={data}
        data={data}
        renderItem={({item}) => {
          return (
            // START - Item
            <TouchableOpacity
              key={item.id}
              onPress={() => {
                props.navigation.navigate('DetailItem', {
                  id: item.id,
                  pic: item.poster,
                  title: item.name,
                  author: item.author,
                  state: item.state,
                  des: item.description,
                  totalLikes: item.totalLikes,
                  totalReads: item.totalReads,
                  genre: item.genre,
                });
              }}
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
                <Text style={styles.titleTxt}>{item.name}</Text>
                {/* END - Title */}
                {/* START - Genre */}
                <View style={styles.genreContainer}>
                  {item.genre
                    ? item.genre.map((e) => (
                        <Text key={e} style={styles.genreItem}>
                          {e}
                        </Text>
                      ))
                    : null}
                </View>
                {/* END - Genre */}
                {/* START - Icons */}
                <View style={styles.iconsContainer}>
                  {/* START - Icon reads */}
                  <View style={styles.iconView}>
                    <FontAwesome5
                      name="book-reader"
                      size={15}
                      color="#95a5a6"
                    />
                    <Text style={styles.iconTxt}>{item.totalReads}</Text>
                  </View>
                  {/* END - Icon reads */}
                  {/* START - Icon likes */}
                  <View style={styles.iconView}>
                    <FontAwesome name="heart" size={15} color="#95a5a6" />
                    <Text style={styles.iconTxt}>{item.totalLikes}</Text>
                  </View>
                  {/* END - Icon likes */}
                </View>
                {/* END - Icons */}
                {/* START - Last chapter */}
                <Text style={styles.iconTxt}>300 chapter</Text>
                {/* END - Last chapter */}
                {/* START - State */}
                <View style={styles.stateView}>
                  <Text style={styles.stateTxt}>{item.state}</Text>
                </View>
                {/* END - State */}
              </View>
              {/* END - Right content */}
            </TouchableOpacity>
            // END - Item
          );
        }}
        keyExtractor={(item) => item.id}
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
  iconTxt: {color: '#95a5a6'},
  stateView: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  stateTxt: {
    fontFamily: 'SF-Pro-Rounded-Thin',
  },
});

export default ListManga;
