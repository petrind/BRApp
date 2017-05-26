'use strict';

import React, { Component } from 'react'
import {
  StyleSheet,
  Image,
  View,
  TouchableHighlight,
  ListView,
  Text
} from 'react-native';
var Accordion = require('react-native-accordion');

var styles = StyleSheet.create({
  thumb: {
    width: 80,
    height: 80,
    marginRight: 10
  },
  textContainer: {
    flex: 1
  },
  separator: {
    height: 1,
    backgroundColor: '#dddddd'
  },
  price: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#48BBEC'
  },
  title: {
    fontSize: 20,
    color: '#656565'
  },
  rowContainer: {
    flexDirection: 'row',
    padding: 10
  }
});

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

  detailPressed(url) {
	  var item = this.props.navigation.state.params.listings.filter(prop => prop.url === url)[0];

	  this.props.navigation.navigate('ItemView',{
	    item: item
	  });
	}

  accordionPressed(url) {

	}

  renderRow(rowData, sectionID, rowID) {
      var price = rowData.price;
      var header = (
        <View>
          <View style={styles.rowContainer}>
            <Image style={styles.thumb} source={{ uri: rowData.images[0] }} />
            <View  style={styles.textContainer}>
              <Text style={styles.price}>{price}</Text>
              <Text style={styles.title}
                    numberOfLines={1}>{rowData.name}</Text>
            </View>
          </View>
          <View style={styles.separator}/>
        </View>
      );
    
        var content = (
          <View>
            <TouchableHighlight onPress={() => this.detailPressed(rowData.url)}
                underlayColor='#dddddd'>
                <Text>This content is hidden in the accordion</Text>
            </TouchableHighlight>
          </View>
        );

	  

	  return (
      <Accordion
        header={header}
        content={content}
        easing="easeOutCubic"
        onpress={() => this.accordionPressed(rowData.url)}
      />

	  );
	}
  //https://www.npmjs.com/package/react-native-accordion
  render() {
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderRow.bind(this)}/>
    );
  }

}

module.exports = SearchResults;