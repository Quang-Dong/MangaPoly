import React, {useCallback, useEffect, useState} from 'react';
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
  const [bookmark, setBookmark] = useState(false);
  const [countLikes, setCountLikes] = useState(mangaLikes);
  const [uID, setUID] = useState();

  const [mangaPoster, setMangaPoster] = useState(null);
  const [mangaName, setMangaName] = useState('');
  const [mangaAuthor, setMangaAuthor] = useState('');
  const [mangaState, setMangaState] = useState('');
  const [mangaDes, setMangaDes] = useState('');
  const [mangaLikes, setMangaLikes] = useState('');
  const [mangaReads, setMangaReads] = useState('');
  const [mangaGenre, setMangaGenre] = useState('');

  const mangaRef = firebaseApp.database().ref('Mangas');
  const likeStateRef = firebaseApp.database().ref('LikeState');
  const bookmarkStateRef = firebaseApp.database().ref('BookmarkState');
  const bookmarkRef = firebaseApp.database().ref('Bookmark');

  const user = firebaseApp.auth().currentUser;

  useEffect(() => {
    getLikeState();
    getBookmarkState();
  });

  //tại sao lại set ở đây, mà ko set thẳng trên useState? là vì set ở trên useState sẽ bị lỗi UI
  useEffect(() => {
    setIsPressed('Description');
    getMangas();
  }, [getMangas]);

  const {mangaID} = props.route.params;

  const getLikeState = () => {
    if (user) {
      setUID(user.uid);

      // Lấy trạng thái đã like hay chưa để đưa lên UI
      likeStateRef
        .child(mangaID)
        .child(user.uid)
        .on('value', (snapshot) => {
          const isLiked = snapshot.val();
          setLike(isLiked);
        });

      //Ở thông tin truyện, lấy lượt like hiện có của truyện
      mangaRef
        .child(mangaID)
        .child('totalLikes')
        .on('value', (snapshot) => {
          const Likes = snapshot.val();
          setCountLikes(Likes);
        });
    }
  };

  const getBookmarkState = () => {
    bookmarkStateRef
      .child(mangaID)
      .child(user.uid)
      .on('value', (snapshot) => {
        const isBookmark = snapshot.val();
        setBookmark(isBookmark);
      });

    setTimeout(() => {
      bookmark
        ? bookmarkRef.child(user.uid).child(mangaID).set({
            name: mangaName,
            poster: mangaPoster,
            author: mangaAuthor,
            description: mangaDes,
            state: mangaState,
            genres: mangaGenre,
            totalLikes: mangaLikes,
            totalReads: mangaReads,
            id: mangaID,
          })
        : bookmarkRef.child(user.uid).child(mangaID).remove();
    }, 3000);
  };

  const getMangas = useCallback(() => {
    console.log(mangaID);
    mangaRef.child(mangaID).once('value', (snapshot) => {
      setMangaName(snapshot.child('name').val());
      setMangaPoster(snapshot.child('poster').val());
      setMangaAuthor(snapshot.child('author').val());
      setMangaDes(snapshot.child('description').val());
      setMangaState(snapshot.child('state').val());
      setMangaGenre(snapshot.child('genres').val());
      setMangaLikes(snapshot.child('totalLikes').val());
      setMangaReads(snapshot.child('totalReads').val());
    });
  }, [mangaID, mangaRef]);

  const pressLike = () => {
    likeStateRef.child(mangaID).child(uID).set(!like);

    //Nhờ vào 'lượt like hiện có' đã lấy ở trên để tăng thêm 1 nếu true, false thì ngược lại
    mangaRef
      .child(mangaID)
      .update(
        like ? {totalLikes: countLikes - 1} : {totalLikes: countLikes + 1},
      );
  };

  const pressBookmark = () => {
    bookmarkStateRef.child(mangaID).child(uID).set(!bookmark);
  };

  //tại sao phải chạy cái này mà ko set cứng ở trên useState?
  //Bời vì set cứng làm giao diện của button Description bị lỗi
  const descriptionJSX =
    isPressed === 'Description' ? (
      <Description state={mangaState} des={mangaDes} genres={mangaGenre} />
    ) : null;
  const chaptersJSX =
    isPressed === 'Chapter' ? (
      <Chapters
        id={mangaID}
        navigation={props.navigation}
        state={mangaState}
        title={mangaName}
        poster={mangaPoster}
      />
    ) : null;
  const commentsJSX =
    isPressed === 'Comment' ? (
      <Comments id={mangaID} navigation={props.navigation} />
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
              source={{uri: mangaPoster || mangaPoster}}
              resizeMode="contain"
              style={styles.titleImg}
            />
          </Shadow>
          {/*START - viewRight*/}
          <View style={styles.titleViewLeftRight}>
            <View style={styles.titleViewLeftRightItem}>
              <FontAwesome5 name="book-reader" size={25} />
              <Text>{mangaReads}</Text>
            </View>
            <TouchableOpacity
              onPress={() => {
                pressLike();
              }}
              style={styles.titleViewLeftRightItem}>
              <FontAwesome name={!like ? 'heart-o' : 'heart'} size={25} />
              <Text>{countLikes}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                pressBookmark();
              }}>
              <View style={styles.titleViewLeftRightItem}>
                <FontAwesome
                  name={!bookmark ? 'bookmark-o' : 'bookmark'}
                  size={25}
                />
              </View>
            </TouchableOpacity>
          </View>
          {/*END - viewRight*/}
        </View>
        {/* END - Img*/}
        {/* START - name */}
        <View style={styles.titleViewMangaName}>
          <Text style={styles.titleMangaName}>{mangaName}</Text>
          <Text style={styles.titleAuthor}>{mangaAuthor}</Text>
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
