import { Config } from './Config';
import { Linking, } from 'react-native';

export function fetchBRS (url, options) {
    if (!options) {
        options = {
            headers: {
                'brtoken' : Config['brtoken']
            }
        }
    }
    return fetch(url, options)
}

export function Buy (url, additionalData) {

    return Linking.openURL(url)
}

export function urlForQueryAndPage(key, value, pageNumber, path) {
  var data = {
      page: pageNumber,
      maxResults: 50,
  };
  if(Array.isArray(key)) {
    key.forEach(function callback(currentValue, index, array) {
      data[currentValue] = value[index];
    })
  } else {
    data[key] = value;
  }

  var querystring = Object.keys(data)
    .map(key => key + '=' + encodeURIComponent(data[key]))
    .join('&');
  return Config.BRS + path + querystring;
};