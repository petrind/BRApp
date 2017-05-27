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

class ReviewG extends Component {

  static navigationOptions = ({ navigation }) => ({
    title: `Review ${navigation.state.params.itemName} di Google`,
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

  goToUrl(rowID, screen) {
    var item = this.props.navigation.state.params.listings[rowID];

    this.props.navigation.navigate(screen, {
      item: item,
      url: this.props.navigation.state.params.url,
    });
  }

  renderRow(rowData, sectionID, rowID) {
      var imageUri = "";
      if(rowData && rowData.pagemap && rowData.pagemap.cse_thumbnail 
      && rowData.pagemap.cse_thumbnail[0] && rowData.pagemap.cse_thumbnail[0].src) {
        imageUri = rowData.pagemap.cse_thumbnail[0].src;
      }
      var header = (
        <View>
          <View style={styles.rowContainer}>
            <Image style={styles.thumb} source={{ uri: imageUri }} />
            <View  style={styles.textContainer}>
              <Text style={styles.price}>{rowData.title}</Text>
              <Text style={styles.title}
                    numberOfLines={1}>{rowData.snippet}</Text>
              <Text style={styles.url}
                    numberOfLines={1}>{rowData.displayLink}</Text>
            </View>
          </View>
          <View style={styles.separator}/>
        </View>
      );
    
        var content = (
          <View>
            <View style={styles.rowContainer}>
                <Button
                  onPress={() => this.goToUrl(rowID, 'WebViewG')}
                  title="Kunjungi"
                  color="#4285F4"
                  accessibilityLabel="Kunjungi URL ini"
                />
                <Button
                  onPress={() => this.goToUrl(rowID, 'WebViewGTranslate')}
                  title="Terjemahkan"
                  color="#4285F4"
                  accessibilityLabel="Terjemahkan"
                />
            </View>
            
            <Text>{rowData.snippet}</Text>
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

module.exports = ReviewG;