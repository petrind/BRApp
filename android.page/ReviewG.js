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
import PaginatedListView from 'react-native-paginated-listview';

import { Config } from '../utils/Config';
import { fetchBRS, urlForQueryAndPage } from '../utils/ApiService';
import { BetaAlert } from '../utils/CommonService';

var styles = StyleSheet.create(Config.Style.ResultReviewPage);

class ReviewG extends Component {

  static navigationOptions = ({ navigation }) => ({
    title: `Review ${navigation.state.params.itemName} di Google`,
    headerRight: <Button  
                    onPress={() => Linking.openURL(navigation.state.params.url)}
                    title= { Config.Buy.Title }
                    color= { Config.Buy.Color } />,
  });

  constructor(props) {
    super(props);
    var listings = this.props.navigation.state.params.listings;
    this.state = {
      initialData: listings,
      itemName: this.props.navigation.state.params.itemName
    };
  }

  goToUrl(rowData, screen) {
    var item = rowData;

    this.props.navigation.navigate(screen, {
      item: item,
      url: this.props.navigation.state.params.url,
    });
  }

  onFetch(pageNumber) {
    var searchString = this.state.itemName;
    var query = urlForQueryAndPage('keywords', 
      searchString, pageNumber, '/review/google?');
    BetaAlert();
    return new Promise((resolve, reject) => {
      fetchBRS(query)
		  .then(response => response.json())
		  .then(json => resolve(json.items))
      .catch(error => reject(error));
    })
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
                  onPress={() => this.goToUrl(rowData, 'WebViewG')}
                  title="Kunjungi"
                  color="#4285F4"
                  accessibilityLabel="Kunjungi URL ini"
                />
                <Button
                  onPress={() => this.goToUrl(rowData, 'WebViewGTranslate')}
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

module.exports = ReviewG;