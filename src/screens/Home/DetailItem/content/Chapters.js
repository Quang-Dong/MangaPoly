import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text, Pressable} from 'react-native';
import {FlatList, TouchableOpacity} from 'react-native-gesture-handler';

import {wp, hp} from '../../../../lib/responsive';
import firebaseApp from '../../../../core/firebase/firebaseConfig';

const chapterRef = firebaseApp.database().ref('Chapters');
const historyRef = firebaseApp.database().ref('History');

const Chapters = (props) => {
  const [data, setData] = useState('');
  const [latestChapter, setLatestChapter] = useState(0);
  const {id, navigation} = props; //'id' này là id manga

  const user = firebaseApp.auth().currentUser;

  const getChapters = () => {
    chapterRef.child(id).once('value', (snapshot) => {
      var chapterData = [];
      var lastChapter = [];
      snapshot.forEach((child) => {
        let data2 = child.key;
        let data1 = child.child('info').val();
        chapterData.push(data1);
        lastChapter.push(data2);
      });
      setData(chapterData);
      setLatestChapter(lastChapter.length);
    });
  };

  useEffect(() => {
    getChapters();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={({item}) => (
          <Pressable
            onPress={() => {
              navigation.navigate('ListImages', {
                chapterID: item.id,
                mangaID: id,
              });
              historyRef
                .child(user.uid)
                .child(id)
                .set({
                  id: id,
                  title: props.title,
                  lastRead: item.id,
                  latestChapter: latestChapter + '',
                  state: props.state,
                  poster: props.poster,
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
