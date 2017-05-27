'use strict';

import React, { Component } from 'react'
import {
  StyleSheet,
  Image,
  View,
  TouchableHighlight,
  ListView,
  Text,
  Button,
  Linking
} from 'react-native';
var Accordion = require('react-native-accordion');

import { config } from '../utils/Config';
import { fetchBRS } from '../utils/ApiService';

var styles = StyleSheet.create(config.Style.ResultReviewPage);

class ReviewY extends Component {

  static navigationOptions = ({ navigation }) => ({
    title: `Review ${navigation.state.params.itemName} di Youtube`,
    headerRight: <Button  
                    onPress={() => Linking.openURL(navigation.state.params.url)}
                    title="Beli di Bukalapak"
                    color="#C40C41" />,
  });

  constructor(props) {
    super(props);
    var listings = this.props.navigation.state.params.listings;
    var dataSource = new ListView.DataSource(
      {rowHasChanged: (r1, r2) => r1.url !== r2.url});
    this.state = {
      dataSource: dataSource.cloneWithRows(listings),
      db: listings
    };
  }

  goToUrl(rowID) {
    var item = this.props.navigation.state.params.listings[rowID];

    this.props.navigation.navigate('WebViewY', {
      item: item,
      url: this.props.navigation.state.params.url,
    });
  }

  renderRow(rowData, sectionID, rowID) {
      var imageUri = rowData.snippet.thumbnails.default.url;

      var header = (
        <View>
          <View style={styles.rowContainer}>
            <Image style={styles.thumb} source={{ uri: imageUri }} />
            <View  style={styles.textContainer}>
              <Text style={styles.price}>{rowData.snippet.title}</Text>
              <Text style={styles.title}
                    numberOfLines={1}>{rowData.snippet.description}</Text>
              <Text style={styles.url}
                    numberOfLines={1}>{rowData.snippet.channelTitle}</Text>
            </View>
          </View>
          <View style={styles.separator}/>
        </View>
      );
    
        var content = (
          <View>
            <Button
                onPress={() => this.goToUrl(rowID)}
                title="Tonton"
                color="#bb0000"
                accessibilityLabel="Cari Review barang ini di Youtube"
              />            
            <Text>{rowData.snippet.description}</Text>
          </View>
        );

	  return (
      <Accordion
        header={header}
        content={content}
        easing="easeOutCubic"
        underlayColor = "#ddd"
      />

	  );
	}

  render() {
    const { params } = this.props.navigation.state;

    return (
      <View>
        <Text>Berikut adalah hasil pencarian untuk {params.itemName} namun belum tentu adalah review dari {params.itemName}</Text>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderRow.bind(this)}/>
      </View>
    );
  }

}

module.exports = ReviewY;