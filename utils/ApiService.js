import { config } from './Config';
import { Linking, } from 'react-native';

export function fetchBRS (url, options) {
    if (!options) {
        options = {
            headers: {
                'brtoken' : config['brtoken']
            }
        }
    }
    return fetch(url, options)
}

export function Buy (url, additionalData) {
    
    return Linking.openURL(url)
}