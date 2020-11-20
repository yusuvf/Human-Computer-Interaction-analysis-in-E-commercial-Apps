import { StyleSheet, Platform } from 'react-native';
import {responsiveHeight, responsiveWidth} from 'react-native-responsive-dimensions';
export default StyleSheet.create({
    droidSafeArea: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        paddingTop: Platform.OS === 'android' ? 25 : 0
    },
    scrollViewContainer: {
        flex: 1,
    }
});
