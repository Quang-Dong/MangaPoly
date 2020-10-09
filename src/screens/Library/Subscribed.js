import React, {Component} from 'react';
import {StyleSheet, View, Text, Image, FlatList} from 'react-native';

export default class Subscribed extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={{padding: 10}}>
        <Text style={styles.title}>Tủ truyện yêu thích</Text>
        <FlatList
          data={[
            {
              id: '1',
              name: 'Attack on titan',
              url: require('../../Assets/temp/pic1.jpg'),
            },
            {
              id: '2',
              name: 'Doraemon',
              url: require('../../Assets/temp/pic2.jpg'),
            },
            {
              id: '3',
              name: 'Conan',
              url: require('../../Assets/temp/pic3.jpg'),
            },
            {
              id: '4',
              name: 'Kimetsu no yaiba',
              url: require('../../Assets/temp/pic4.jpg'),
            },
            {
              id: '5',
              name: 'One punch man',
              url: require('../../Assets/temp/pic5.jpg'),
            },
            {
              id: '6',
              name: 'Civil war',
              url: require('../../Assets/temp/pic6.jpg'),
            },
            {
              id: '7',
              name: 'The promised neverland',
              url: require('../../Assets/temp/pic7.jpg'),
            },
            {
              id: '8',
              name: 'Dr.Stone',
              url: require('../../Assets/temp/pic8.jpg'),
            },
            {
              id: '9',
              name: 'Dark nights: Metal',
              url: require('../../Assets/temp/pic9.jpg'),
            },
            {
              id: '10',
              name: 'The Batman who laughs',
              url: require('../../Assets/temp/pic10.jpg'),
            },
          ]}
          renderItem={({item}) => (
            <View style={{flexDirection: 'row'}}>
              <Image source={item.url} style={{width: 100, height: 150}} />
              <Text style={styles.mangaTitle}>{item.name}</Text>
            </View>
          )}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    fontSize: 25,
    textAlign: 'center',
  },
  mangaTitle: {
    fontSize: 20,
    marginLeft: 10,
  },
});
