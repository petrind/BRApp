'use strict';

import React, { Component } from 'react'
import {
  StyleSheet,
  Image,
  View,
  Text,
  ScrollView,
} from 'react-native';

var styles = StyleSheet.create({
  container: {
    flex:1
  },
  scrollView: {
    flex:1
  },
  heading: {
    backgroundColor: '#F8F8F8',
  },
  sellerInfo: {
    backgroundColor: '#EEEEEE',
  },
  separator: {
    height: 1,
    backgroundColor: '#DDDDDD'
  },
  image: {
    width: 400,
    height: 300
  },
  imagesmall: {
    width: 100,
    height: 100
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
    title: `Info of ${navigation.state.params.item.name}`,
  });
  render() {
    var item = this.props.navigation.state.params.item;

    var price = item.price;

    return (
      <View style={styles.container}>
        <ScrollView> 
          <Image style={styles.image}
              source={{uri: item.images[0]}} />
          <View style={styles.heading}>
            <Text style={styles.price}>{price}</Text>
            <Text style={styles.title}>{item.name}</Text>
            <View style={styles.separator}/>
          </View>
          <View style={styles.sellerInfo}>
            <Image style={styles.imagesmall}
                source={{uri: item.seller_avatar}} />
            <Text style={styles.description}>Seller: {item.seller_name}</Text>
            <Image style={styles.imagesmall}
                source={{uri: item.seller_level_badge_url}} />        
            <Text style={styles.description}>{item.seller_level}</Text>
            <Text style={styles.description}>Feedback Positif: {item.seller_positive_feedback}, negative: {item.seller_negative_feedback}</Text>    
            <Text style={styles.description}>{item.city}, {item.province}</Text>
            <View style={styles.separator}/>
          </View>
          <Text style={styles.description}>{item.desc}</Text>
        </ScrollView>
        
      </View>
    );
  }
}


module.exports = ItemView;