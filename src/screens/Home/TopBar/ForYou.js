import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Image,
} from 'react-native';
import {TouchableOpacity, FlatList} from 'react-native-gesture-handler';

import {hp, wp} from '../../../lib/responsive';
import arrow_right from '../../../Assets/icon/arrow_right.png';
import pic1 from '../../../Assets/temp/pic1.jpg';
import pic2 from '../../../Assets/temp/pic2.jpg';
import pic3 from '../../../Assets/temp/pic3.jpg';
import pic4 from '../../../Assets/temp/pic4.jpg';

const _title = (props) => (
  <TouchableOpacity
    style={{
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: wp(20),
      justifyContent: 'space-between',
    }}>
    <Text style={{fontWeight: 'bold', fontSize: wp(17)}}>{props.title}</Text>
    <Image source={arrow_right} style={{width: wp(40), height: hp(40)}} />
  </TouchableOpacity>
);

const _content = (props) => (
  <TouchableOpacity style={{marginStart: 20}}>
    <Image
      source={props.pic}
      resizeMode="contain"
      style={{width: wp(120), height: hp(150), borderRadius: 10}}
    />
    <View
      style={{
        alignItems: 'center',
        width: wp(120),
        height: hp(70),
        justifyContent: 'space-between',
      }}>
      <Text style={{fontWeight: 'bold'}}>{props.title}</Text>
    </View>
  </TouchableOpacity>
);

const DATA = [
  {
    id: '1',
    pic: pic1,
    title: 'Dr Stone',
  },
  {
    id: '2',
    pic: pic2,
    title: 'Cajole a Childe Into Being My Boyfriend',
  },
  {
    id: '3',
    pic: pic3,
    title: 'How to Get Lucky!',
  },
  {
    id: '4',
    pic: pic4,
    title: 'Naruto Shipudden',
  },
];

const ForYou = () => (
  <ScrollView style={{flex: 1, backgroundColor: '#E3F1FA'}}>
    <StatusBar barStyle={'light-content'} />
    {/* START - Trending */}
    <View
      style={{
        height: hp(270),
      }}>
      {/* tiêu đề */}
      <_title title="Thịnh hành" />

      {/* nội dung - show ra list ảnh*/}
      <FlatList
        data={DATA} //dữ liệu - dữ liệu này sẽ dùng để gán vào giao diện
        horizontal //set cho list view nằm ngang
        showsHorizontalScrollIndicator={false} // ẩn thanh cuộn
        renderItem={({item}) => <_content pic={item.pic} title={item.title} />} // 'item' là dữ liệu,
        //hàm renderItem là gán giao diện cho item
        keyExtractor={(item) => item.id} //mỗi item trong list phải có 1 key riêng biệt để phân biệt, hàm này để gán key vào item
      />
    </View>
    {/* END - Trending */}
    {/* START - New chapter */}
    <View
      style={{
        height: hp(270),
      }}>
      <_title title="Tập mới nhất" />

      <FlatList
        data={DATA}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({item}) => <_content pic={item.pic} title={item.title} />}
        keyExtractor={(item) => item.id}
      />
    </View>
    {/* END - New chapter */}
    {/* START - New release */}
    <View
      style={{
        height: hp(270),
      }}>
      <_title title="Hôm nay đọc gì?" />

      <FlatList
        data={DATA}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({item}) => <_content pic={item.pic} title={item.title} />}
        keyExtractor={(item) => item.id}
      />
    </View>
    {/* END - New release */}
  </ScrollView>
);

const styles = StyleSheet.create({});

export default ForYou;
