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
  ActivityIndicator
} from 'react-native';
var Accordion = require('react-native-accordion');

import { Config } from '../utils/Config';
import { fetchBRS, urlForQueryAndPage } from '../utils/ApiService';
import { BetaAlert } from '../utils/CommonService';
import PaginatedListView from 'react-native-paginated-listview';

var styles = StyleSheet.create(Config.Style.ResultReviewPage);

class ReviewY extends Component {

  static navigationOptions = ({ navigation }) => ({
    title: `Review ${navigation.state.params.itemName} di Youtube`,
  });

  constructor(props) {
    super(props);
    var listings = this.props.navigation.state.params.listings;
    this.state = {
      itemName: this.props.navigation.state.params.itemName,
      initialData: listings
    };
  }

  onFetch(pageNumber) {
    var searchString = this.state.itemName;
    var query = urlForQueryAndPage('keywords', 
      searchString, pageNumber, '/review/youtube?');
    BetaAlert();
    return new Promise((resolve, reject) => {
      fetchBRS(query)
		  .then(response => response.json())
		  .then(json => resolve(json.items))
      .catch(error => reject(error));
    })
  }

  goToUrl(rowData) {
    var item = rowData;

    this.props.navigation.navigate('WebViewY', {
      item: item,
      url: this.props.navigation.state.params.url,
    });
  }

  renderRow(rowData, sectionID, rowID) {
      var imageUri = rowData && rowData.snippet && rowData.snippet.thumbnails
                      && rowData.snippet.thumbnails.default && rowData.snippet.thumbnails.default.url;

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
                onPress={() => this.goToUrl(rowData)}
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
          <PaginatedListView
            initialData={this.state.initialData}
            itemsPerPage={10}
            renderFetchMoreComponent = {() => {return (
                    <View style={styles.buttonComponent} >
                      <Text style={styles.buttonText}>Load More</Text>
                    </View>)}}
            renderLoadingComponent = {() => {return (
                    <ActivityIndicator size='small' />)}}
            autoFetch = { false }
            onFetch={this.onFetch.bind(this)}
            renderRow={this.renderRow.bind(this)}/>
            <Text>Catatan: Di atas adalah hasil pencarian untuk {this.state.itemName} namun belum tentu adalah review dari {this.state.itemName}</Text>
      </View>
    );
  }

}

module.exports = ReviewY;