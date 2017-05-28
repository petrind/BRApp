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
  Linking,
} from 'react-native';
var Accordion = require('react-native-accordion');

import { Config } from '../utils/Config';
import { fetchBRS } from '../utils/ApiService';

var styles = StyleSheet.create(Config.Style.ResultReviewPage);

class ReviewBL extends Component {

  static navigationOptions = ({ navigation }) => ({
    title: `Review  ${navigation.state.params.itemName} di BL`,
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

  renderRow(rowData, sectionID, rowID) {

      var header = (
        <View>
          <View style={styles.rowContainer}>
            <View  style={styles.textContainer}>
              <Text style={styles.price}>{rowData.sender_name}</Text>
              <Text style={styles.title}
                    numberOfLines={1}>{rowData.body}</Text>
            </View>
          </View>
          <View style={styles.separator}/>
        </View>
      );
    
        var content = (
          <View>
            <Text>{rowData.body}</Text>
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
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderRow.bind(this)}/>
    );
  }

}

module.exports = ReviewBL;