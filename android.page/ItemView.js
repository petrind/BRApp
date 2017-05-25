'use strict';

import React, { Component } from 'react'
import {
  StyleSheet,
  Image,
  View,
  Text
} from 'react-native';
import { StackNavigator,} from 'react-navigation';

var styles = StyleSheet.create({
  container: {
    marginTop: 65
  },
  heading: {
    backgroundColor: '#F8F8F8',
  },
  separator: {
    height: 1,
    backgroundColor: '#DDDDDD'
  },
  image: {
    width: 400,
    height: 300
  },
  price: {
    fontSize: 25,
    fontWeight: 'bold',
    margin: 5,
    color: '#48BBEC'
  },
  title: {
    fontSize: 20,
    margin: 5,
    color: '#656565'
  },
  description: {
    fontSize: 18,
    margin: 5,
    color: '#656565'
  }
});

class ItemView extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: `Info of ${navigation.state.params.item.title}`,
  });
  render() {
    var item = this.props.navigation.state.params.item;
    var stats = item.bedroom_number + ' bed ' + item.item_type;
    if (item.bathroom_number) {
      stats += ', ' + item.bathroom_number + ' ' + (item.bathroom_number > 1
        ? 'bathrooms' : 'bathroom');
    }

    var price = item.price_formatted.split(' ')[0];

    return (
      <View style={styles.container}>
        <Image style={styles.image}
            source={{uri: item.img_url}} />
        <View style={styles.heading}>
          <Text style={styles.price}>{price}</Text>
          <Text style={styles.title}>{item.title}</Text>
          <View style={styles.separator}/>
        </View>
        <Text style={styles.description}>{stats}</Text>
        <Text style={styles.description}>{item.summary}</Text>
      </View>
    );
  }
}


module.exports = ItemView;