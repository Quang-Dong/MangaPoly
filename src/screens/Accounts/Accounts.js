import React, {Component} from 'react';
import * as data from '../../Assets/usertest.json';

import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  TextInput,
  StatusBar,
  TouchableOpacity,
  Image,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

export default class Accounts extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <View style={{padding: 10}}>
        <Text style={styles.title}>Tài khoản</Text>
        <View style={styles.topBox}>
          <Image
            style={styles.avatar}
            source={require('../../Assets/temp/pic1.jpg')}
          />
          <View style={{marginLeft: 20}}>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.name}>{data.name}</Text>
              <TouchableOpacity>
                <Icon name="edit" color="grey" size={20} style={styles.icon} />
              </TouchableOpacity>
            </View>
            <Text style={styles.type}>{data.type}</Text>
          </View>
        </View>
        <View style={styles.middleBox}>
          <View style={{flexDirection: 'row'}}>
            <Icon
              name="envelope-o"
              color="black"
              size={20}
              style={styles.icon}
            />
            <Text style={styles.text}>Email: {data.email}</Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Icon name="lock" color="black" size={20} style={styles.icon} />
            <Text style={styles.text}>Password: {data.password}</Text>
            <TouchableOpacity style={styles.btnEdit}>
              <Text style={{fontSize: 18, textAlign: 'center', color: 'red'}}>
                Đổi mật khẩu
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            borderBottomColor: 'grey',
            borderBottomWidth: 1,
            marginTop: 10,
          }}
        />
        <TouchableOpacity style={styles.btn}>
          <Icon name="comment" color="black" size={20} style={styles.icon} />
          <Text style={{fontSize: 20}}>Bình luận</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn}>
          <Icon
            name="thumbs-o-up"
            color="black"
            size={20}
            style={styles.icon}
          />
          <Text style={{fontSize: 20}}>Truyện đã thích</Text>
        </TouchableOpacity>
        <View
          style={{
            borderBottomColor: 'grey',
            borderBottomWidth: 1,
            marginTop: 20,
          }}
        />
        <TouchableOpacity style={styles.btn}>
          <Icon name="pencil" color="black" size={20} style={styles.icon} />
          <Text style={{fontSize: 20}}>Góp ý</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn}>
          <Icon name="bug" color="black" size={20} style={styles.icon} />
          <Text style={{fontSize: 20}}>Báo lỗi</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn}>
          <Icon
            name="info-circle"
            color="black"
            size={20}
            style={styles.icon}
          />
          <Text style={{fontSize: 20}}>Giới thiệu về chúng tôi</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn}>
          <Icon name="sign-in" color="black" size={20} style={styles.icon} />
          <Text style={{fontSize: 20}}>Đăng xuất</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    fontSize: 25,
    textAlign: 'center',
  },
  topBox: {
    flexDirection: 'row',
    padding: 20,
    alignItems: 'center',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  name: {
    fontSize: 25,
    marginRight: 15,
  },
  type: {
    fontSize: 15,
  },
  middleBox: {},
  text: {
    fontSize: 20,
    marginBottom: 10,
  },
  icon: {
    marginTop: 4,
    marginRight: 5,
  },
  btnEdit: {
    width: 120,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'red',
    alignItems: 'center',
    position: 'absolute',
    right: 10,
  },
  btn: {
    flexDirection: 'row',
    marginTop: 20,
  },
});
