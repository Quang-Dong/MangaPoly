import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Image,
  Pressable,
} from 'react-native';

import ic_des from '../../../Assets/icon/description0.png';
import {wp, hp, width, height} from '../../../lib/responsive';

import Description from './content/Description';
import Chapters from './content/Chapters';
import Comments from './content/Comments';

import {Shadow, Neomorph} from 'react-native-neomorph-shadows';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';

//In React, components need to be capitalized, and custom hooks need to start with use.
const DetailItem = (props) => {
  const [isPressed, setIsPressed] = useState(null);

  useEffect(() => {
    setIsPressed('Description');
  }, []);

  const {pic, title} = props.route.params;

  //tại sao phải chạy cái này mà ko set cứng ở trên useState?
  //Bời vì set cứng làm giao diện của button Description bị lỗi

  const descriptionJSX = isPressed === 'Description' ? <Description /> : null;
  const chaptersJSX = isPressed === 'Chapter' ? <Chapters /> : null;
  const commentsJSX = isPressed === 'Comment' ? <Comments /> : null;
  return (
    <SafeAreaView style={styles.container}>
      {/* START - Title */}
      <View style={styles.titleContainer}>
        {/* START - Img*/}
        <View
          style={{
            flexDirection: 'row',
          }}>
          {/*START - viewLeft*/}
          <View style={styles.titleViewLeftRight}>
            {/* START - btnDescription */}
            <Pressable
              onPressIn={() => {
                setIsPressed('Description');
              }}>
              <Neomorph
                inner={isPressed === 'Description' ? true : false}
                swapShadows // <- change zIndex of each shadow color
                style={styles.titleNeomorph}>
                <Image source={ic_des} style={{width: 23, height: 23}} />
              </Neomorph>
            </Pressable>
            {/* START - btnChapters */}
            <Pressable
              onPressIn={() => {
                setIsPressed('Chapter');
              }}>
              <Neomorph
                inner={isPressed === 'Chapter' ? true : false}
                swapShadows
                style={styles.titleNeomorph}>
                <Ionicons name="ios-play-outline" size={25} />
              </Neomorph>
            </Pressable>
            {/* START - btnComments */}
            <Pressable
              onPressIn={() => {
                setIsPressed('Comment');
              }}>
              <Neomorph
                inner={isPressed === 'Comment' ? true : false}
                swapShadows
                style={styles.titleNeomorph}>
                <FontAwesome name="comments-o" size={25} />
              </Neomorph>
            </Pressable>
          </View>
          {/*END - viewLeft*/}
          <Shadow useArt style={styles.titleShadow}>
            <Image source={pic} resizeMode="contain" style={styles.titleImg} />
          </Shadow>
          {/*START - viewRight*/}
          <View style={styles.titleViewLeftRight}>
            <View style={{alignItems: 'center'}}>
              <FontAwesome5 name="book-reader" size={25} />
              <Text>0</Text>
            </View>
            <View style={{alignItems: 'center'}}>
              <FontAwesome name="heart-o" size={25} />
              <Text>0</Text>
            </View>
            <View style={{alignItems: 'center'}}>
              <FontAwesome name="bookmark-o" size={25} />
            </View>
          </View>
          {/*END - viewRight*/}
        </View>
        {/* END - Img*/}
        {/* START - name */}
        <View style={styles.titleViewMangaName}>
          <Text style={styles.titleMangaName}>{title}</Text>
          <Text style={{fontFamily: 'SF-Pro-Rounded-Thin'}}>Kazue Kato</Text>
        </View>

        {/* END - name */}
      </View>
      {/* END - Title */}
      {/* START - Content */}
      <View style={{marginTop: wp(20), flex: 1}}>
        {descriptionJSX}
        {chaptersJSX}
        {commentsJSX}
      </View>
      {/* END - Content */}
    </SafeAreaView>
  );
};

export default DetailItem;

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#E3F1FA'},
  titleContainer: {
    flex: 1,
    alignItems: 'center',
  },
  titleViewLeftRight: {
    flex: 1,
    marginHorizontal: wp(20),
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  titleNeomorph: {
    shadowRadius: 10,
    borderRadius: 25,
    backgroundColor: '#E3F1FA',
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleShadow: {
    shadowOffset: {width: 10, height: 10},
    shadowOpacity: 0.6,
    shadowColor: 'grey',
    shadowRadius: 20,
    borderRadius: 20,
    backgroundColor: '#E3F1FA',
    width: 224,
    height: 299,
    marginBottom: 20,
    flex: 1,
  },
  titleImg: {
    height: 300,
    width: 225,
    borderRadius: 10,
  },
  titleViewMangaName: {
    width: 330,
    alignItems: 'center',
  },
  titleMangaName: {
    fontFamily: 'SF-Pro-Rounded-Medium',
    fontSize: 18,
    color: '#2f3640',
  },
});
