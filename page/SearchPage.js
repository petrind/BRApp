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

var SearchResults = require('./SearchResults');

var styles = StyleSheet.create({
	description: {
	    marginBottom: 20,
	    fontSize: 18,
	    textAlign: 'center',
	    color: '#656565'
	},
	container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 30
	},
  	flowRight: {
	  flexDirection: 'row',
	  alignItems: 'center',
	  alignSelf: 'stretch'
	},
    center: {
	  flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
	  alignSelf: 'stretch'
	},
	buttonText: {
	  fontSize: 18,
	  color: 'white',
	  alignSelf: 'center'
	},
	button: {
	  height: 36,
	  flexDirection: 'row',
	  backgroundColor: '#48BBEC',
	  borderColor: '#48BBEC',
	  borderWidth: 1,
	  borderRadius: 8,
	  marginBottom: 10,
	  alignSelf: 'stretch',
	  justifyContent: 'center'
	},
	searchInput: {
	  height: 36,
	  padding: 4,
	  marginRight: 5,
	  flex: 4,
	  fontSize: 18,
	  borderWidth: 1,
	  borderColor: '#48BBEC',
	  borderRadius: 8,
	  color: '#48BBEC'
	}
});

function urlForQueryAndPage(key, value, pageNumber) {
  var data = {
      country: 'uk',
      pretty: '1',
      encoding: 'json',
      listing_type: 'buy',
      action: 'search_listings',
      page: pageNumber
  };
  data[key] = value;

  var querystring = Object.keys(data)
    .map(key => key + '=' + encodeURIComponent(data[key]))
    .join('&');

  return 'https://api.nestoria.co.uk/api?' + querystring;
};

class SearchPage extends Component {
	static navigationOptions = {
    title: 'BukaReview',
  };

	constructor(props) {
	    super(props);
	    this.state = {
	    	searchString: 'london',
	    	isLoading : false,
	    	message: ''
	    };
	}

	onSearchTextChanged(event) {
	  console.log('onSearchTextChanged');
	  this.setState({ searchString: event.nativeEvent.text });
	  console.log(this.state.searchString);
	}
	
	onLocationPressed() {
	  navigator.geolocation.getCurrentPosition(
	    location => {
	      var search = location.coords.latitude + ',' + location.coords.longitude;
	      this.setState({ searchString: search });
	      var query = urlForQueryAndPage('centre_point', search, 1);
	      this._executeQuery(query);
	    },
	    error => {
	      this.setState({
	        message: 'There was a problem with obtaining your location: ' + error
	      });
	    });
	}
	_executeQuery(query) {
	  console.log(query);
	  this.setState({ isLoading: true });
	  fetch(query)
		  .then(response => response.json())
		  .then(json => this._handleResponse(json.response))
		  .catch(error =>
		     this.setState({
		      isLoading: false,
		      message: 'Something bad happened ' + error
		   }));
	}

	_handleResponse(response) {
	  this.setState({ isLoading: false , message: '' });
	  if (response.application_response_code.substr(0, 1) === '1') {
	    this.props.navigator.push({
		  title: 'Results',
		  component: SearchResults,
		  passProps: {listings: response.listings}
		});
	  } else {
	    this.setState({ message: 'Location not recognized; please try again.'});
	  }
	}

	onSearchPressed() {
	  var query = urlForQueryAndPage('place_name', this.state.searchString, 1);
	  this._executeQuery(query);
	}

	render() {
	  	console.log('SearchPage.render');
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
				  placeholder='Search via name or postcode'/>
			  <TouchableHighlight style={[styles.button,{flex: 1}]}
			  	onPress={this.onSearchPressed.bind(this)}
			      underlayColor='#99d9f4'>
			    <Text style={styles.buttonText}>Go</Text>
			  </TouchableHighlight>
			</View>
            <View style={styles.center}>
                <TouchableHighlight style={styles.button}
                    underlayColor='#99d9f4' 
                    onPress={this.onLocationPressed.bind(this)}>
                  <Text style={styles.buttonText}>Popular</Text>
                </TouchableHighlight>
                <TouchableHighlight style={styles.button}
                    underlayColor='#99d9f4' 
                    onPress={this.onLocationPressed.bind(this)}>
                  <Text style={styles.buttonText}>Promo</Text>
                </TouchableHighlight>
                <Text style={styles.description}>
                  Cari barang yang sedang populer atau promo
                </Text>
            </View>
			<Image source={require('../resources/house.png')} style={styles.image}/>
			{spinner}
			<Text style={styles.description}>{this.state.message}</Text>
	      </View>
	    );
	  }
}

module.exports = SearchPage;