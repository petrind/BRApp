import { Alert, } from 'react-native';

export function ThousandSeparator (num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

export function BetaAlert () {
    Alert.alert(
        'Beta Version',
        'Fitur ini belum tersedia di versi beta, terima kasih',
        [
            {text: 'OK', onPress: () => console.log('OK Pressed')},
        ],
        { cancelable: true }
    )
}