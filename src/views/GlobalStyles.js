import { StyleSheet, Platform } from 'react-native';
import {responsiveHeight, responsiveWidth} from 'react-native-responsive-dimensions';
export default StyleSheet.create({
    droidSafeArea: {
        flex: 1,
        width: responsiveWidth(100),
        height: responsiveHeight(100),
        backgroundColor: '#ffffff',
        alignItems: 'center',
        paddingTop: Platform.OS === 'android' ? 25 : 0
    },
    scrollViewContainer: {
        flex: 1,

    }
});
