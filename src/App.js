import 'react-native-gesture-handler';

import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  StatusBar,
  SafeAreaView,
  Text,
  Pressable,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';

//screens
import Auth from './screens/Auth/Auth';
import Home from './screens/Home/Home';
import Accounts from './screens/Accounts/Accounts';
import Search from './screens/Search/Search';
import ForgotPass from './screens/Auth/ForgotPass/ForgotPassword';
import ListManga from './screens/ListItem/ListManga';
import ListCmt from './screens/ListItem/ListCmt';
import ListImages from './screens/ListItem/ListImages';
import DetailItem from './screens/Home/DetailItem/detailItem';
import Library from './screens/Library/Library';

//libs
import {wp, width} from './lib/responsive';
import firebaseApp from './core/firebase/firebaseConfig';
import ic_avaUser from './Assets/icon/ic_user.png';
//redux
import store from './redux/store/store';

//libs 3
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createStackNavigator} from '@react-navigation/stack';
import {Provider} from 'react-redux';
import {Shadow} from 'react-native-neomorph-shadows';
import Icon from 'react-native-vector-icons/FontAwesome5';

const Drawer = createDrawerNavigator();

const Stack = createStackNavigator();

// START - Drawer layout
const DrawerLayout = (props) => {
  const [fullName, setFullName] = useState('Họ và tên');
  const [ava, setAva] = useState();
  const db = firebaseApp.database().ref('Users');

  useEffect(() => {
    //Nên dùng 'return' để trả về kết quả cuối để tránh rò rỉ ram.
    return firebaseApp.auth().onAuthStateChanged((user) => {
      if (user) {
        db.child(user.uid).on('value', (snapshot) => {
          const userName = snapshot.child('fullName').val();
          const userAva = snapshot.child('ava').val();
          setFullName(userName ? userName : 'Họ và tên');
          setAva(userAva);
        });
      }
    });
  }, []);
  const {navigation} = props;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={'light-content'} backgroundColor="#E3F1FA" />
      {/* START - Account */}
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Accounts', {navigation});
        }}>
        <Shadow style={styles.accountLayout}>
          <Image
            style={{width: 120, height: 120, borderRadius: 60}}
            source={ava ? {uri: ava} : ic_avaUser}
          />

          <Text style={styles.accountName}>{fullName}</Text>
        </Shadow>
      </TouchableOpacity>
      {/* END - Account */}
      {/* START - Content */}
      <Shadow style={styles.contentLayout}>
        {/* START - Button TuSach */}
        <Pressable
          onPress={() => {
            navigation.navigate('Library');
          }}
          style={styles.contentBtn}
          android_ripple={{color: '#95a5a6', radius: 140}}>
          <Text style={styles.contentBtnTitle}>Tủ sách</Text>
        </Pressable>
        {/* END - Button TuSach */}
        {/* START - Line */}
        <View style={styles.contentLine} />
        {/* END - Line */}
        {/* START - Button DangXuat */}
        <Pressable
          onPress={() => {
            //sign out
            return firebaseApp
              .auth()
              .signOut()
              .then(() => {
                // Sign-out successful.

                navigation.closeDrawer();

                //Hàm 'reset()' sẽ xóa mọi stack screen để về 'routes: name'
                //ở vị trí 'index' tính theo mảng
                navigation.reset({
                  index: 0,
                  routes: [{name: 'Auth'}],
                });
              })
              .catch(function (error) {
                console.log(error);
              });
          }}
          style={styles.contentBtn}
          android_ripple={{color: '#95a5a6', radius: 140}}>
          <Text style={styles.contentBtnTitle}>Đăng xuất</Text>
        </Pressable>
        {/* END - Button DangXuat */}
      </Shadow>
      {/* END - Content */}
    </SafeAreaView>
  );
};
// END - Drawer layout

//Cái screen nào cần header thì nhét screen đó vào Stack
const Root = () => (
  <Stack.Navigator
    initialRouteName="Auth"
    screenOptions={{
      title: '',
      headerStyle: {
        backgroundColor: '#E3F1FA',
        elevation: 0,
      },
      headerTitleStyle: {
        fontFamily: 'SF-Pro-Rounded-Medium',
        letterSpacing: 2,
      },
    }}>
    <Stack.Screen name="Auth" component={Auth} />
    <Stack.Screen name="Home" component={Home} options={{headerShown: false}} />
    <Stack.Screen
      name="ListManga"
      component={ListManga}
      options={({route}) => ({title: route.params.title})}
    />

    <Stack.Screen name="ListCmt" component={ListCmt} />
    <Stack.Screen name="ListImages" component={ListImages} />
    <Stack.Screen name="DetailItem" component={DetailItem} />
    <Stack.Screen
      name="Search"
      component={Search}
      options={{headerShown: false}}
    />
    <Stack.Screen
      name="Library"
      component={Library}
      options={{title: 'Tủ sách'}}
    />
    <Stack.Screen
      name="Accounts"
      component={Accounts}
      options={{title: 'Tài khoản'}}
    />

    <Stack.Screen
      name="ForgotPassword"
      component={ForgotPass}
      options={{title: 'Quên mật khẩu'}}
    />
  </Stack.Navigator>
);

const App = () => (
  <Provider store={store}>
    <NavigationContainer>
      <StatusBar barStyle={'dark-content'} />
      <Drawer.Navigator
        drawerContent={(props) => <DrawerLayout {...props} />}
        drawerContentOptions={{
          style: {backgroundColor: '#E3F1FA'},
          labelStyle: {
            fontFamily: 'SF-Pro-Rounded-Medium',
            fontSize: wp(20),
          },
        }}>
        <Drawer.Screen name="Root" component={Root} />
      </Drawer.Navigator>
    </NavigationContainer>
  </Provider>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#E3F1FA',
    paddingVertical: wp(20),
  },
  accountLayout: {
    shadowOffset: {width: 10, height: 10},
    shadowColor: 'grey',
    shadowOpacity: 0.4,
    shadowRadius: 10,
    borderRadius: 10,
    backgroundColor: 'white',
    width: width / 1.5,
    height: 170,
    marginVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  accountName: {
    fontSize: 20,
    color: '#95a5a6',
    fontFamily: 'SF-Pro-Rounded-Bold',
    letterSpacing: 3,
    textAlign: 'center',
  },
  contentLayout: {
    shadowOffset: {width: 10, height: 10},
    shadowColor: 'grey',
    shadowOpacity: 0.4,
    shadowRadius: 10,
    borderRadius: 10,
    backgroundColor: 'white',
    width: width / 1.5,
    height: 80,
    marginVertical: 10,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  contentBtn: {
    width: width / 1.5,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentBtnTitle: {
    fontSize: 20,
    fontFamily: 'SF-Pro-Rounded-Medium',
    letterSpacing: 3,
  },
  contentLine: {
    borderTopWidth: 0.5,
    borderColor: 'black',
    width: width / 1.5,
  },
});

export default App;
