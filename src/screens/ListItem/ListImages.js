import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Image, ImageBackground} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';

import {wp, hp, height, width} from '../../lib/responsive';
import firebaseApp from '../../core/firebase/firebaseConfig';

const db = firebaseApp.database().ref('Chapters');
const ListImages = (props) => {
  const [data, setData] = useState('');
  const {idManga, idChapter} = props.route.params;
  // const {width, height} = Image.resolveAssetSource();

  const getImages = () => {
    db.child(idManga)
      .child(idChapter)
      .child('images')
      .once('value', (snapshot) => {
        var li = [];
        snapshot.forEach((child) => {
          const key = child.key;
          const imgs = child.val();
          // console.log({imgs, key});
          li.push({key, imgs});
        });
        setData(li);
      });
  };

  useEffect(() => {
    getImages();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={({item}) => (
          // <ScaleImage uri={item.imgs} />

          <Image
            source={{uri: item.imgs}}
            resizeMode="stretch"
            style={{
              // width: (width * 100) / 100,
              // height: height / 1.3,
              aspectRatio: 1,
            }}
          />
        )}
        keyExtractor={(item) => item.key}
      />
    </View>
  );
};

export default ListImages;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E3F1FA',
  },
});
