import React, { Component } from 'react';
import { WebView, Linking, Button } from 'react-native';
import { Config } from '../utils/Config';

class WebViewGTranslate extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: `Terjemahan ${navigation.state.params.item.title}`,
        headerRight: <Button  
                    onPress={() => Linking.openURL(navigation.state.params.url)}
                    title= { Config.Buy.Title }
                    color= { Config.Buy.Color } />,
    });
    render() {
        const { params } = this.props.navigation.state;

        return (
        <WebView
            source={{ uri: 'https://translate.google.com/translate?sl=en&tl=id&js=y&prev=_t&hl=en&ie=UTF-8&u=' 
            + encodeURI(params.item.link) }}
        />
        );
    }
}

module.exports = WebViewGTranslate;