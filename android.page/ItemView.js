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
import { Config } from '../utils/Config';
import { ThousandSeparator } from '../utils/CommonService';
import HTMLView from 'react-native-htmlview';

var styles = StyleSheet.create(Config.Style.ItemPage);

class ItemView extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: `Info dari ${navigation.state.params.item.name}`,
    headerRight: <Button  
                    onPress= { () => Linking.openURL(navigation.state.params.url) }
                    title= { Config.Buy.Title }
                    color= { Config.Buy.Color } />,
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
            <Text style={styles.price}>Rp {price}</Text>
            <Text style={styles.title}>{item.name}</Text>
            <View style={styles.separator}/>
          </View>
          <View style={styles.sellerInfo}>
            <View style= { styles.rowContainer}>
              <View style={styles.centercontainer}>
                <Image style={styles.imagesmall}
                    source={{uri: item.seller_avatar}} />
                <Text>Seller: {item.seller_name}</Text>
              </View>
              <View style={styles.centercontainer}>
                <Image style={styles.imagesmall}
                    source={{uri: item.seller_level_badge_url}} />        
                <Text >{item.seller_level}</Text>
              </View>
            </View>
            <Text style={styles.description}>Feedback Positif: {item.seller_positive_feedback}, negative: {item.seller_negative_feedback}</Text>    
            <Text style={styles.description}>{item.city}, {item.province}</Text>
            <View style={styles.separator}/>
          </View>
          <HTMLView
            value={item.desc}
            />
        </ScrollView>
        
      </View>
    );
  }
}


module.exports = ItemView;