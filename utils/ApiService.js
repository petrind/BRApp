import { config } from './Config';

export function fetchBRS (url, options) {
    console.log(config['AuthorizationToken']);
    if (!options) {
        options = {
            headers: {
                'brtoken' : config['brtoken']
            }
        }
    }
    return fetch(url, options)
}