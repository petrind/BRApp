import React, { Component } from 'react';
import { AppRegistry, ListView, Text, View, StyleSheet, Navigator } from 'react-native';

import { StackNavigator,} from 'react-navigation';


var SearchPage = require('./android.page/SearchPage');
var SearchResults = require('./android.page/SearchResults');
var ReviewBL = require('./android.page/ReviewBL');
var ReviewG = require('./android.page/ReviewG');
var ReviewY = require('./android.page/ReviewY');
// var PromoView = require('./android.page/PromoView');
// var PromoSearchResults = require('./android.page/PromoSearchResults');
var ItemView = require('./android.page/ItemView');
var WebViewG = require('./android.page/WebViewG');
var WebViewGTranslate = require('./android.page/WebViewGTranslate');
var WebViewY = require('./android.page/WebViewY');

const App = StackNavigator({
  Main: {screen: SearchPage},
  SearchResults: {screen: SearchResults},
  // PromoView: {screen: PromoView},
  // PromoSearchResults: {screen: PromoSearchResults},
  ItemView: {screen: ItemView},
  ReviewBL: {screen: ReviewBL},
  ReviewG: {screen: ReviewG},
  ReviewY: {screen: ReviewY},
  WebViewG: {screen: WebViewG},
  WebViewGTranslate: {screen: WebViewGTranslate},
  WebViewY: {screen: WebViewY},
});

AppRegistry.registerComponent('BukaReview', () => App);