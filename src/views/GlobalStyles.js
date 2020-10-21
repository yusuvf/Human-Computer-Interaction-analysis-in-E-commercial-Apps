import { StyleSheet, Platform } from 'react-native';
import {responsiveWidth} from 'react-native-responsive-dimensions';
export default StyleSheet.create({
    droidSafeArea: {
        flex: 1,
        width: responsiveWidth(100),
        backgroundColor: '#40739e',
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: Platform.OS === 'android' ? 25 : 0
    },
});
