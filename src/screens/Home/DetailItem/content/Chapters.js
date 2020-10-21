import React from 'react';
import {StyleSheet, View, Text, Pressable} from 'react-native';
import {FlatList, TouchableOpacity} from 'react-native-gesture-handler';

import {wp, hp} from '../../../../lib/responsive';
import chapterData from '../../../../core/data/dataChapter';

const Chapters = () => {
  return (
    <View style={styles.container}>
      <FlatList
        data={chapterData}
        renderItem={({item}) => (
          <Pressable
            android_ripple={{color: 'white', radius: 200}}
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              padding: 10,
            }}>
            <Text style={{fontSize: 20, fontWeight: 'bold'}}>{item.name}</Text>
            <Text>{item.uploaded}</Text>
          </Pressable>
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default Chapters;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
