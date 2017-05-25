import React, { Component } from 'react';
import { AppRegistry, ListView, Text, View, StyleSheet, Navigator } from 'react-native';

import { StackNavigator,} from 'react-navigation';


var SearchPage = require('./android.page/SearchPage');
var SearchResults = require('./android.page/SearchResults');
// var PromoView = require('./android.page/PromoView');
// var PromoSearchResults = require('./android.page/PromoSearchResults');
var ItemView = require('./android.page/ItemView');

const App = StackNavigator({
  Main: {screen: SearchPage},
  SearchResults: {screen: SearchResults},
  // PromoView: {screen: PromoView},
  // PromoSearchResults: {screen: PromoSearchResults},
  ItemView: {screen: ItemView},
});

AppRegistry.registerComponent('BukaReview', () => App);