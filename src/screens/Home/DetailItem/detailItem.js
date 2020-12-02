import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Image,
  Pressable,
  TouchableOpacity,
} from 'react-native';

import ic_des from '../../../Assets/icon/description0.png';
import {wp, hp} from '../../../lib/responsive';

import Description from './content/Description';
import Chapters from './content/Chapters';
import Comments from './content/Comments';
import firebaseApp from '../../../core/firebase/firebaseConfig';

import {Shadow, Neomorph} from 'react-native-neomorph-shadows';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';

//In React, components need to be capitalized, and custom hooks need to start with use.
const DetailItem = (props) => {
  const [isPressed, setIsPressed] = useState(null);
  const [like, setLike] = useState(false);
  const [countLikes, setCountLikes] = useState(totalLikes);
  const [uID, setUID] = useState();

  const likeRef = firebaseApp.database().ref('Liked');
  const mangaRef = firebaseApp.database().ref('Mangas');
  const user = firebaseApp.auth().currentUser;

  var isLiked = false;

  useEffect(() => {
    getLikeState();
  });

  //tại sao lại set ở đây, mà ko set thẳng trên useState? là vì set ở trên useState sẽ bị lỗi UI
  useEffect(() => {
    setIsPressed('Description');
  }, []);

  const {
    id,
    pic,
    title,
    author,
    state,
    des,
    totalLikes,
    totalReads,
    genre,
  } = props.route.params;

  const getLikeState = () => {
    if (user) {
      setUID(user.uid);
      likeRef
        .child(id)
        .child(user.uid)
        .on('value', (snapshot) => {
          isLiked = snapshot.val();
          setLike(isLiked);
        });

      mangaRef
        .child(id)
        .child('totalLikes')
        .on('value', (snapshot) => {
          const Likes = snapshot.val();
          setCountLikes(Likes);
        });
    }
  };

  const liked = () => {
    likeRef.child(id).child(uID).set(!isLiked);
    mangaRef
      .child(id)
      .update(
        like ? {totalLikes: countLikes - 1} : {totalLikes: countLikes + 1},
      );
  };

  //tại sao phải chạy cái này mà ko set cứng ở trên useState?
  //Bời vì set cứng làm giao diện của button Description bị lỗi
  const descriptionJSX =
    isPressed === 'Description' ? (
      <Description state={state} des={des} genre={genre} />
    ) : null;
  const chaptersJSX =
    isPressed === 'Chapter' ? (
      <Chapters id={id} navigation={props.navigation} />
    ) : null;
  const commentsJSX =
    isPressed === 'Comment' ? (
      <Comments id={id} navigation={props.navigation} />
    ) : null;
  return (
    <SafeAreaView style={styles.container}>
      {/* START - Title */}
      <View style={styles.titleContainer}>
        {/* START - Image view*/}
        <View style={styles.titleViewImg}>
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
                <Image
                  source={ic_des}
                  style={styles.titleViewLeftRightIconDes}
                />
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
            <Image
              source={{uri: pic}}
              resizeMode="contain"
              style={styles.titleImg}
            />
          </Shadow>
          {/*START - viewRight*/}
          <View style={styles.titleViewLeftRight}>
            <View style={styles.titleViewLeftRightItem}>
              <FontAwesome5 name="book-reader" size={25} />
              <Text>{totalReads}</Text>
            </View>
            <TouchableOpacity
              onPress={() => {
                liked();
              }}
              style={styles.titleViewLeftRightItem}>
              <FontAwesome name={!like ? 'heart-o' : 'heart'} size={25} />
              <Text>{countLikes}</Text>
            </TouchableOpacity>
            <View style={styles.titleViewLeftRightItem}>
              <FontAwesome name="bookmark-o" size={25} />
            </View>
          </View>
          {/*END - viewRight*/}
        </View>
        {/* END - Img*/}
        {/* START - name */}
        <View style={styles.titleViewMangaName}>
          <Text style={styles.titleMangaName}>{title}</Text>
          <Text style={styles.titleAuthor}>{author}</Text>
        </View>

        {/* END - name */}
      </View>
      {/* END - Title */}
      {/* START - Content */}
      <View style={styles.contentContainer}>
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
  titleViewImg: {
    flexDirection: 'row',
  },
  titleViewLeftRight: {
    flex: 1,
    marginHorizontal: wp(18),
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  titleViewLeftRightItem: {alignItems: 'center'},
  titleNeomorph: {
    shadowRadius: wp(10),
    borderRadius: wp(25),
    backgroundColor: '#E3F1FA',
    width: wp(50),
    height: hp(50),
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleViewLeftRightIconDes: {
    width: wp(23),
    height: hp(23),
  },
  titleShadow: {
    shadowOffset: {width: wp(10), height: hp(10)},
    shadowOpacity: 0.6,
    shadowColor: 'grey',
    shadowRadius: wp(20),
    borderRadius: wp(20),
    backgroundColor: '#E3F1FA',
    width: wp(224),
    height: hp(299),
    marginBottom: wp(20),
    flex: 1,
  },
  titleImg: {
    height: hp(300),
    width: wp(225),
    borderRadius: wp(10),
  },
  titleViewMangaName: {
    width: wp(330),
    alignItems: 'center',
  },
  titleMangaName: {
    fontFamily: 'SF-Pro-Rounded-Medium',
    fontSize: wp(18),
    color: '#2f3640',
    height: hp(30),
  },
  titleAuthor: {fontFamily: 'SF-Pro-Rounded-Thin'},
  contentContainer: {marginTop: wp(20), flex: 1},
});
