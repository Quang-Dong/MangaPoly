import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text, Pressable} from 'react-native';
import {FlatList, TouchableOpacity} from 'react-native-gesture-handler';

import {wp, hp} from '../../../../lib/responsive';
import firebaseApp from '../../../../core/firebase/firebaseConfig';

const db = firebaseApp.database().ref('Chapters');
const Chapters = (props) => {
  const [data, setData] = useState('');
  const {id, navigation} = props; //'id' này là id manga

  const getChapters = () => {
    db.child(id).once('value', (snapshot) => {
      var li = [];
      snapshot.forEach((child) => {
        let data1 = child.child('info').val();
        li.push(data1);
      });
      setData(li);
    });
  };

  useEffect(() => {
    getChapters();
  }, [db]);

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={({item}) => (
          <Pressable
            onPress={() => {
              navigation.navigate('ListImages', {
                idChapter: item.id,
                idManga: id,
              });
            }}
            android_ripple={{color: 'white', radius: 200}}
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              padding: 10,
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontSize: 20,
                fontFamily: 'SF-Pro-Rounded-Light',
              }}>{`Chapter ${item.id}`}</Text>
            <Text style={{fontFamily: 'SF-Pro-Rounded-Thin'}}>
              {item.dateUpdated}
            </Text>
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
