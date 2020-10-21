import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';

import {wp, hp} from '../../../../lib/responsive';

const Description = () => {
  return (
    <View style={{flex: 1}}>
      {/*START - genre*/}
      <View style={styles.contentGenreContainer}>
        <Text style={styles.contentGenreItem}>Action</Text>
        <Text style={styles.contentGenreItem}>Romance</Text>
        <Text style={styles.contentGenreItem}>Fantasy</Text>
        <Text style={styles.contentGenreItem}>History</Text>
      </View>
      {/*END - genre*/}
      {/*START - status*/}
      <View
        style={{
          flex: 1,
          marginHorizontal: 10,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <Text style={{fontSize: 16, fontFamily: 'SF-Pro-Rounded-Thin'}}>
          Trạng thái:{' '}
        </Text>
        <Text style={{fontFamily: 'SF-Pro-Rounded-Medium', fontSize: wp(17)}}>
          Đang cập nhật
        </Text>
      </View>
      {/*END - status*/}
      {/*START - Synopsis*/}
      <View
        style={{
          marginHorizontal: 10,
          flex: 6,
        }}>
        <Text style={{fontSize: 16, fontFamily: 'SF-Pro-Rounded-Thin'}}>
          Tóm tắt:
        </Text>
        <ScrollView style={{}}>
          <Text
            style={{
              fontFamily: 'SF-Pro-Rounded-Light',
              fontSize: wp(17),
              paddingBottom: wp(10),
            }}>
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
  contentGenreContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    margin: wp(5),
  },
  contentGenreItem: {
    borderWidth: 1,
    borderColor: 'black',
    paddingHorizontal: 15,
    paddingVertical: 1,
    margin: 5,
    fontSize: wp(15),
    borderRadius: 5,
    fontFamily: 'SF-Pro-Rounded-Light',
  },
});
