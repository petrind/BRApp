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
  ActivityIndicator,
} from 'react-native';
var Accordion = require('react-native-accordion');

import { Config } from '../utils/Config';
import { fetchBRS, urlForQueryAndPage } from '../utils/ApiService';
import { ThousandSeparator } from '../utils/CommonService';
import Spinner from 'react-native-loading-spinner-overlay';
import PaginatedListView from 'react-native-paginated-listview';

var styles = StyleSheet.create(Config.Style.ResultReviewPage);

class SearchResults extends Component {

  static navigationOptions = ({ navigation }) => ({
    title: `Results of ${navigation.state.params.searchString}`,
  });

  constructor(props) {
    super(props);
 
    this.state = {
      initialData: this.props.navigation.state.params.listings,
      isLoading: false,
      searchString: this.props.navigation.state.params.searchString
    };
  }

  _executeQuery(query, screen, objectKey, blurl) {
	  this.setState({ isLoading: true });

	  fetchBRS(query)
		  .then(response => response.json())
		  .then(json => this._handleResponse(json, screen, objectKey, blurl))
		  .catch(error => this._handleError(error));
	}

	_handleResponse(response, screen, objectKey, blurl) {
	  this.setState({ isLoading: false , message: '' });
	  if (response[objectKey]) {

		    this.props.navigation.navigate(screen, {
          listings: response[objectKey],
          itemName: this.state.itemName,
          url: blurl
			});
	  } else {
	    console.log(response);
	  }
	}

  _handleError(error) {
      this.setState({ isLoading: false });
		  console.log(error);
  }

  rowPressed(rowData) {
    this.state.itemName = rowData.name;
  }

  detailPressed(rowData) {
	  var item = rowData;

	  this.props.navigation.navigate('ItemView',{
	    item: item,
      url: item.url
	  });
	}

  bukalapakReviewPressed(rowData) {
	  var item = rowData;
    var query = urlForQueryAndPage(['itemId', 'bukaSearch'], [item.id, this.state.searchString], 1, '/review/bukalapak?');
	  this._executeQuery(query, 'ReviewBL', 'reviews', item.url);
	}

  googleReviewPressed(rowData) {
    var item = rowData;
    var query = urlForQueryAndPage('keywords', item.name, 1, '/review/google?');
	  this._executeQuery(query, 'ReviewG', 'items', item.url);
	}

  youtubeReviewPressed(rowData) {
	  var item = rowData;

    var query = urlForQueryAndPage('keywords', item.name, 1, '/review/youtube?');
	  this._executeQuery(query, 'ReviewY', 'items', item.url);
	}

  onFetch(pageNumber) {
    var searchString = this.state.searchString;
    var query = urlForQueryAndPage('keywords', 
      searchString, pageNumber, '/search?');
    return new Promise((resolve, reject) => {
      fetchBRS(query)
		  .then(response => response.json())
		  .then(json => resolve(json.products))
      .catch(error => reject(error));
    })
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
                  onPress={() => this.detailPressed(rowData)}
                  title="Detil Produk"
                  color="#C30F42"
                  accessibilityLabel="Detil Produk ini"
                />
              </View>
              <View style={styles.buttonContainer}>
                <Button
                  onPress={() => this.bukalapakReviewPressed(rowData)}
                  title="Review di Bukalapak"
                  color="#C40C41"
                  accessibilityLabel="Review barang ini di Bukalapak"
                />
              </View>
              <View style={styles.buttonContainer}>
                <Button
                  onPress={() => this.youtubeReviewPressed(rowData)}
                  title="Review di Youtube"
                  color="#bb0000"
                  accessibilityLabel="Cari Review barang ini di Youtube"
                />
              </View>
              <View style={styles.buttonContainer}>
                <Button
                  onPress={() => this.googleReviewPressed(rowData)}
                  title="Review di Google"
                  color="#4285F4"
                  accessibilityLabel="Cari Review barang ini di Google"
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
        
        onPress = {() => this.rowPressed(rowData)}
      />

	  );
	}

  render() {
    return (
      <View>
      <Spinner visible={this.state.isLoading} textContent={"Loading..."} textStyle={{color: '#FFF'}} />
      <PaginatedListView
        initialData={this.state.initialData}
        itemsPerPage={18}
        renderFetchMoreComponent = {() => {return (
                <View style={styles.buttonComponent} >
                  <Text style={styles.buttonText}>Load More</Text>
                </View>)}}
        renderLoadingComponent = {() => {return (
                <ActivityIndicator size='large' />)}}
        autoFetch = { true }
        onFetch={this.onFetch.bind(this)}
        renderRow={this.renderRow.bind(this)}/>
      </View>
    );
  }

}

module.exports = SearchResults;