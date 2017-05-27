 'use strict';

import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableHighlight,
  ActivityIndicator,
  Image
} from 'react-native';
import { StackNavigator,} from 'react-navigation';

import { config } from '../utils/Config';
import { fetchBRS } from '../utils/ApiService';

var styles = StyleSheet.create(config.Style.MainPage);

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

class SearchPage extends Component {
	static navigationOptions = {
    title: 'BukaReview',
  };

	constructor(props) {
	    super(props);
	    this.state = {
	    	searchString: 'iphone 7',
	    	isLoading : false,
	    	message: ''
	    };
	}

	onSearchTextChanged(event) {
	  console.log('onSearchTextChanged');
	  this.setState({ searchString: event.nativeEvent.text });
	  console.log(this.state.searchString);
	}
	
	onPromoPressed() {
	  navigator.geolocation.getCurrentPosition(
	    location => {
	      var search = location.coords.latitude + ',' + location.coords.longitude;
	      this.setState({ searchString: search });
	      var query = urlForQueryAndPage('centre_point', search, 1, '/search?');
	      this._executeQuery(query);
	    },
	    error => {
	      this.setState({
	        message: 'There was a problem with obtaining your location: ' + error
	      });
	    });
	}

	onPopularPressed() {
	  navigator.geolocation.getCurrentPosition(
	    location => {
	      var search = location.coords.latitude + ',' + location.coords.longitude;
	      this.setState({ searchString: search });
	      var query = urlForQueryAndPage('centre_point', search, 1, '/search?');
	      this._executeQuery(query);
	    },
	    error => {
	      this.setState({
	        message: 'There was a problem with obtaining your location: ' + error
	      });
	    });
	}

	_executeQuery(query) {
	  this.setState({ isLoading: true });
	  fetchBRS(query)
		  .then(response => response.json())
		  .then(json => this._handleResponse(json))
		  .catch(error =>
		     console.log(error));
	}

	_handleResponse(response) {
	  this.setState({ isLoading: false , message: '' });
	  if (response.status === 'OK') {
		    this.props.navigation.navigate('SearchResults',{
		  	listings: response.products,
				itemName: this.state.searchString,
			});
	  } else {
	    this.setState({ message: 'Location not recognized; please try again.'});
	  }
	}

	onSearchPressed() {
	  var query = urlForQueryAndPage('keywords', this.state.searchString, 1, '/search?');
		console.log(query);
	  this._executeQuery(query);
	}

	render() {
	  	var spinner = this.state.isLoading ? 
	  	(<ActivityIndicator 
	  		size='large' />) : (<View/>)

	    return (
	      <View style={styles.container}>
	        <Text style={styles.description}>
	          Cari produknya dan review sekaligus.
	        </Text>
	        <Text style={styles.description}>
	          Mantapkan hati untuk membeli barang.
	        </Text>
	        <View style={styles.flowRight}>
			  <TextInput
				  style={styles.searchInput}
				  value={this.state.searchString}
				  onChange={this.onSearchTextChanged.bind(this)}
				  placeholder='Cari barang'/>
			  <TouchableHighlight style={[styles.button,{flex: 1}]}
			  	onPress={this.onSearchPressed.bind(this)}
			      underlayColor='#99d9f4'>
			    <Text style={styles.buttonText}>Go</Text>
			  </TouchableHighlight>
			</View>
            <View style={styles.center}>
                <TouchableHighlight style={styles.button}
                    underlayColor='#99d9f4' 
                    onPress={this.onPopularPressed.bind(this)}>
                  <Text style={styles.buttonText}>Popular</Text>
                </TouchableHighlight>
                <TouchableHighlight style={styles.button}
                    underlayColor='#99d9f4' 
                    onPress={this.onPromoPressed.bind(this)}>
                  <Text style={styles.buttonText}>Promo</Text>
                </TouchableHighlight>
                <Text style={styles.description}>
                  Cari barang yang sedang populer atau promo
                </Text>
            </View>
			<Image source={require('../resources/BukaReview.png')} style={styles.image}/>
			{spinner}
			<Text style={styles.description}>{this.state.message}</Text>
	      </View>
	    );
	  }
}

module.exports = SearchPage;