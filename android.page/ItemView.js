'use strict';

import React, { Component } from 'react'
import {
  StyleSheet,
  Image,
  View,
  Text,
  ScrollView,
  Linking,
  Button,
} from 'react-native';
import { config } from '../utils/Config';
import { ThousandSeparator } from '../utils/CommonService';

var styles = StyleSheet.create(config.Style.ItemPage);

class ItemView extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: `Info dari ${navigation.state.params.item.name}`,
    headerRight: <Button  
                    onPress={() => Linking.openURL(navigation.state.params.url)}
                    title="Beli di Bukalapak"
                    color="#C40C41" />,
  });
  render() {
    var item = this.props.navigation.state.params.item;

    var price = ThousandSeparator(item.price);

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