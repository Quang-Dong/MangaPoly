import React, {useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';

//components
import {hp} from '../../../../../lib/responsive';
import {_title, _content} from '../ItemInner/ItemInner';
import DATA from '../../../../../core/data/dataManga';
import firebaseApp from '../../../../../core/firebase/firebaseConfig';

const Item = (props) => {
  const [data, setData] = useState();
  const db = firebaseApp.database().ref('Mangas');

  useEffect(() => {
    db.on('value', (snapShot) => {
      var li = [];
      snapShot.forEach((child) => {
        li.push(child.val());
      });
      setData(li);
    });

    // console.log(JSON.stringify(data));
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      {/* tiêu đề */}
      <_title title={props.title} navigation={props.navigation} />

      {/* nội dung - show ra list ảnh*/}
      <FlatList
        data={data} //dữ liệu - dữ liệu này sẽ dùng để gán vào giao diện
        horizontal //set cho list view nằm ngang
        showsHorizontalScrollIndicator={false} // ẩn thanh cuộn
        renderItem={({item}) => (
          <_content
            pic={item.poster}
            title={item.name}
            author={item.author}
            state={item.state}
            totalLikes={item.totalLikes}
            totalReads={item.totalReads}
            navigation={props.navigation}
          />
        )} // 'item' là dữ liệu,
        //hàm renderItem là gán giao diện cho item
        keyExtractor={(item) => item.id} //mỗi item trong list phải có 1 key riêng biệt để phân biệt, hàm này để gán key vào item
      />
    </SafeAreaView>
  );
};

export default Item;

const styles = StyleSheet.create({
  container: {
    height: hp(270),
  },
});
