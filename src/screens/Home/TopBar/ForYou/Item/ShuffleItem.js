import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Image,
  TouchableOpacity,
  View,
  Text,
} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';

//components
import {wp, hp} from '../../../../../lib/responsive';

import firebaseApp from '../../../../../core/firebase/firebaseConfig';
import arrow_right from '../../../../../Assets/icon/arrow_right.png';

const db = firebaseApp.database().ref('Mangas');
const ShuffleItem = (props) => {
  const [data, setData] = useState();
  const {title} = props;
  var li = [];

  // START - Shuffle Aray - Hàm này trả ra 1 cái mảng đã được ngẫu nhiên thứ tự phần từ
  const shuffle = (array) => {
    var currentIndex = array.length,
      temporaryValue,
      randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  };
  //END - Shuffle Aray

  // setTimeout(() => {
  //   shuffle(li);
  // }, 1000);

  useEffect(() => {
    db.once('value', (snapShot) => {
      snapShot.forEach((child) => {
        const data1 = child.val();
        li.push(data1);
        // console.log(child.val().genre);
      });
      // console.log(li);
      shuffle(li);
      setData(li);
    });

    // console.log(JSON.stringify(data));
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      {/* START - tiêu đề */}
      <TouchableOpacity
        onPress={() => {
          props.navigation.navigate('ListManga', {title, data});
        }}
        style={styles.titleContainer}>
        <Text style={styles.titleText}>{title}</Text>
        <Image source={arrow_right} style={{width: wp(40), height: hp(40)}} />
      </TouchableOpacity>
      {/* END - tiêu đề */}

      {/* nội dung - show ra list ảnh*/}
      <FlatList
        data={data} //dữ liệu - dữ liệu này sẽ dùng để gán vào giao diện
        horizontal //set cho list view nằm ngang
        showsHorizontalScrollIndicator={false} // ẩn thanh cuộn
        renderItem={({item}) => (
          <TouchableOpacity
            style={styles.contentContainer}
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
              console.log(item.id);
            }}>
            <Image
              source={{uri: item.poster}}
              resizeMode="cover"
              style={styles.contentImg}
            />
            <View style={styles.contentTextView}>
              <Text style={styles.contentText}>{item.name}</Text>
            </View>
          </TouchableOpacity>
        )} // 'item' là dữ liệu,
        //hàm renderItem là gán giao diện cho item
        keyExtractor={(item) => item.id} //mỗi item trong list phải có 1 key riêng biệt để phân biệt, hàm này để gán key vào item
      />
    </SafeAreaView>
  );
};

export default ShuffleItem;

const styles = StyleSheet.create({
  container: {
    height: hp(270),
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp(20),
    justifyContent: 'space-between',
  },
  titleText: {
    fontSize: wp(17),
    fontFamily: 'SF-Pro-Rounded-Medium',
    letterSpacing: 1,
  },
  contentContainer: {
    marginStart: wp(20),
  },
  contentImg: {
    width: wp(120),
    height: hp(150),
    borderRadius: 10,
  },
  contentTextView: {
    alignItems: 'center',
    width: wp(120),
    height: hp(70),
    justifyContent: 'space-between',
  },
  contentText: {
    fontFamily: 'SF-Pro-Rounded-Medium',
  },
});
