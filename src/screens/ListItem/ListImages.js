import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Image} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';

import {wp, hp, height, width} from '../../lib/responsive';
import firebaseApp from '../../core/firebase/firebaseConfig';

const chapterRef = firebaseApp.database().ref('Chapters');
const ListImages = (props) => {
  const [data, setData] = useState('');

  const {mangaID, chapterID} = props.route.params;
  // const {width, height} = Image.resolveAssetSource();

  const mangaRef = firebaseApp.database().ref('Mangas');

  useEffect(() => {
    getTotalReads();
  });

  var countReads = 0;

  useEffect(() => {
    getImages();

    const increaseRead = setInterval(() => {
      mangaRef
        .child(mangaID)
        .update({totalReads: (countReads = countReads + 1)});
      // console.log((countReads = countReads + 1));
    }, 30000);

    //'Hàm return' này giống như componentWillUnmount
    return () => {
      clearInterval(increaseRead);
    };
  }, []);

  const getTotalReads = () => {
    mangaRef
      .child(mangaID)
      .child('totalReads')
      .on('value', (snapshot) => {
        countReads = snapshot.val();
      });
  };

  const getImages = () => {
    chapterRef
      .child(mangaID)
      .child(chapterID)
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

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={({item}) => (
          // <ScaleImage uri={item.imgs} />
          <Image
            key={item.key}
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
