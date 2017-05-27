import React, { Component } from 'react';
import { WebView, Linking, Button } from 'react-native';

class WebViewG extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: `${navigation.state.params.item.title}`,
        headerRight: <Button  
                    onPress={() => Linking.openURL(navigation.state.params.url)}
                    title="Beli di Bukalapak"
                    color="#C40C41" />,
    });
    render() {
        const { params } = this.props.navigation.state;

        return (
        <WebView
            source={{uri: params.item.link}}
        />
        );
    }
}

module.exports = WebViewG;