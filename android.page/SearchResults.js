'use strict';

import React, { Component } from 'react'
import {
  StyleSheet,
  Image,
  View,
  TouchableHighlight,
  ListView,
  Text,
  Button
} from 'react-native';
var Accordion = require('react-native-accordion');

import { config } from '../utils/Config';
import { fetchBRS } from '../utils/ApiService';
import { ThousandSeparator } from '../utils/CommonService';

var styles = StyleSheet.create(config.Style.ResultReviewPage);

function urlForQueryAndPage(key, value, pageNumber, path) {
  var data = {
      page: pageNumber,
			per_page: 6
  };
  data[key] = value;

  var querystring = Object.keys(data)
    .map(key => key + '=' + encodeURIComponent(data[key]))
    .join('&');
  return config.BRS + path + querystring;
};

class SearchResults extends Component {

  static navigationOptions = ({ navigation }) => ({
    title: `Results of ${navigation.state.params.itemName}`,
  });

  constructor(props) {
    super(props);
 
    var dataSource = new ListView.DataSource(
      {rowHasChanged: (r1, r2) => r1.url !== r2.url});
    this.state = {
      dataSource: dataSource.cloneWithRows(this.props.navigation.state.params.listings)
    };
  }

  _executeQuery(query, screen, objectKey, blurl) {
	  this.setState({ isLoading: true });
    console.log(query);
	  fetchBRS(query)
		  .then(response => response.json())
		  .then(json => this._handleResponse(json, screen, objectKey, blurl))
		  .catch(error =>
		     console.log(error));
	}

	_handleResponse(response, screen, objectKey, blurl) {
	  this.setState({ isLoading: false , message: '' });
	  if (response[objectKey]) {
        console.log(response[objectKey]);
		    this.props.navigation.navigate(screen, {
		  	listings: response[objectKey],
				itemName: this.state.searchString,
        url: blurl
			});
	  } else {
	    console.log(response);
	  }
	}

  rowPressed(rowID) {
    var item = this.props.navigation.state.params.listings[rowID];

    this.state.searchString = item.name;
  }

  detailPressed(rowID) {
	  var item = this.props.navigation.state.params.listings[rowID];

	  this.props.navigation.navigate('ItemView',{
	    item: item,
      url: item.url
	  });
	}

  bukalapakReviewPressed(rowID) {
	  var item = this.props.navigation.state.params.listings[rowID];

    var query = urlForQueryAndPage('itemId', item.id, 1, '/review/bukalapak?', item.url);
	  this._executeQuery(query, 'ReviewBL', 'reviews');
	}

  googleReviewPressed(rowID) {
	  var item = this.props.navigation.state.params.listings[rowID];

    var query = urlForQueryAndPage('keywords', item.name, 1, '/review/google?', item.url);
	  this._executeQuery(query, 'ReviewG', 'items');
	}

  youtubeReviewPressed(rowID) {
	  var item = this.props.navigation.state.params.listings[rowID];

    var query = urlForQueryAndPage('keywords', item.name, 1, '/review/youtube?', item.url);
	  this._executeQuery(query, 'ReviewY', 'items');
	}

  renderRow(rowData, sectionID, rowID) {
      var price = ThousandSeparator(rowData.price);

      var header = (
        <View>
          <View style={ styles.rowContainer }>
            <Image style={styles.thumb} source={{ uri: rowData.images[0] }} />
            <View  style={styles.textContainer}>
              <Text style={styles.price}>Rp {price}</Text>
              <Text style={styles.title}
                    numberOfLines={1}>{rowData.name}</Text>
            </View>
          </View>
          <View style={styles.separator}/>
        </View>
      );
    
        var content = (
          <View>
              <View style={styles.buttonContainer}>
                <Button
                  onPress={() => this.detailPressed(rowID)}
                  title="Detil Produk"
                  color="#C30F42"
                  accessibilityLabel="Detil Produk ini"
                />
              </View>
              <View style={styles.buttonContainer}>
                <Button
                  onPress={() => this.bukalapakReviewPressed(rowID)}
                  title="Review di Bukalapak"
                  color="#C40C41"
                  accessibilityLabel="Review barang ini di Bukalapak"
                />
              </View>
              <View style={styles.buttonContainer}>
                <Button
                  onPress={() => this.googleReviewPressed(rowID)}
                  title="Review di Google"
                  color="#4285F4"
                  accessibilityLabel="Cari Review barang ini di Google"
                />
              </View>
              <View style={styles.buttonContainer}>
                <Button
                  onPress={() => this.youtubeReviewPressed(rowID)}
                  title="Review di Youtube"
                  color="#bb0000"
                  accessibilityLabel="Cari Review barang ini di Youtube"
                />
              </View>
          </View>
        );

	  

	  return (
      <Accordion
        header={header}
        content={content}
        easing="easeOutCubic"
        underlayColor = "#ddd"
        onPress = {() => this.rowPressed(rowID)}
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

module.exports = SearchResults;