import React, { Component } from 'react';
import { WebView, Linking, Button } from 'react-native';
import { Config } from '../utils/Config';

class WebViewY extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: `${navigation.state.params.item.snippet.title}`,
        headerRight: <Button  
                    onPress={() => Linking.openURL(navigation.state.params.url)}
                    title= { Config.Buy.Title }
                    color= { Config.Buy.Color } />,
    });
    render() {
        const { params } = this.props.navigation.state;

        return (
        <WebView
            source={{uri: 'https://www.youtube.com/watch?v='+params.item.id.videoId}}
        />
        );
    }
}

module.exports = WebViewY;