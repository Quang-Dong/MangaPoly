import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';

import {wp} from '../../../../lib/responsive';

const Description = (props) => {
  const {state} = props;
  return (
    <View style={styles.container}>
      {/*START - genre*/}
      <View style={styles.contentGenreContainer}>
        <Text style={styles.contentGenreItem}>Action</Text>
        <Text style={styles.contentGenreItem}>Romance</Text>
        <Text style={styles.contentGenreItem}>Fantasy</Text>
        <Text style={styles.contentGenreItem}>History</Text>
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
          <Text style={styles.contentSynopsisTxt}>
            Spirit Sword Master Comics Online. Set up and killed by his best
            buddy, a top-notch swordsman wakes up finding himself turned back
            into his teenage self. Restarting again from the weakling bullied by
            all, he is determined to seek revenge and cherish the girl who once
            sacrificed her life for him. MangaToon got authorization from
            iCiyuan to publish this manga, the content is the author's own point
            of view, and does not represent the stand of MangaToon. Other than
            English, MangaToon also provides the following language versions of
            Spirit Sword Master
          </Text>
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
    paddingHorizontal: wp(15),
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
