import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';

import {wp} from '../../../../lib/responsive';

const Description = (props) => {
  const {state, des, genre} = props;

  return (
    <View style={styles.container}>
      {/*START - genre*/}
      <View style={styles.contentGenreContainer}>
        {genre
          ? genre.map((e) => (
              <Text key={e} style={styles.contentGenreItem}>
                {e}
              </Text>
            ))
          : null}
      </View>
      {/*END - genre*/}
      {/*START - state*/}
      <View style={styles.contentStateView}>
        <Text style={styles.contentTitleTxt}>Trạng thái: </Text>
        <Text style={styles.contentStateTxt}>{state}</Text>
      </View>
      {/*END - state*/}
      {/*START - Synopsis*/}
      <View style={styles.contentSynopsisView}>
        <Text style={styles.contentTitleTxt}>Tóm tắt:</Text>
        <ScrollView style={{}}>
          <Text style={styles.contentSynopsisTxt}>{des}</Text>
        </ScrollView>
      </View>
      {/*END - Synopsis*/}
    </View>
  );
};

export default Description;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentGenreContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    margin: wp(5),
  },
  contentGenreItem: {
    borderWidth: 1,
    borderColor: 'black',
    paddingHorizontal: wp(10),
    paddingVertical: 1,
    margin: wp(5),
    fontSize: wp(15),
    borderRadius: wp(5),
    fontFamily: 'SF-Pro-Rounded-Light',
  },
  contentStateView: {
    flex: 1,
    marginHorizontal: wp(10),
    flexDirection: 'row',
    alignItems: 'center',
  },
  contentStateTxt: {
    fontFamily: 'SF-Pro-Rounded-Medium',
    fontSize: wp(17),
  },
  contentTitleTxt: {
    fontSize: wp(16),
    fontFamily: 'SF-Pro-Rounded-Thin',
  },
  contentSynopsisView: {
    marginHorizontal: wp(10),
    flex: 6,
  },
  contentSynopsisTxt: {
    fontFamily: 'SF-Pro-Rounded-Light',
    fontSize: wp(17),
    paddingBottom: wp(10),
  },
});
