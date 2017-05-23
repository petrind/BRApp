//import React, { Component } from 'react';
import { AppRegistry, ListView, Text, View, StyleSheet, NavigatorIOS } from 'react-native';


var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  }
});

var SearchPage = require('./page/SearchPage');

class PropertyFinderApp extends React.Component {
  render() {
    return (
      <NavigatorIOS
        style={styles.container}
        initialRoute={{
          title: 'BukaReview',
          component: SearchPage,
        }}/>
    );
  }
}

AppRegistry.registerComponent('BukaReview', () => PropertyFinderApp);
