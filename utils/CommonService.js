import { Alert, } from 'react-native';

export function ThousandSeparator (num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

export function BetaAlert () {
    Alert.alert(
        'Beta Version',
        'Versi beta belum memungkinkan untuk page kedua Youtube search dan Google search',
        [
            {text: 'OK', onPress: () => console.log('OK Pressed')},
        ],
        { cancelable: true }
    )
}