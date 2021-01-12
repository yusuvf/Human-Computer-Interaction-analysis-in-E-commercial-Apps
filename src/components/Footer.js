import * as React from 'react';
import {useEffect, useState, useContext} from 'react';
import {
    View,
    StyleSheet,
    SafeAreaView,
    FlatList,
    Image,
    TouchableOpacity,
    Text,
} from 'react-native';

import {Layout, Button, Icon} from '@ui-kitten/components';

import {CartInfoContext} from '../components/CartInfoContext';
import {createStackNavigator} from '@react-navigation/stack';
import {
    responsiveHeight,
    responsiveWidth,
} from 'react-native-responsive-dimensions';
export const Footer = (props) => {
    return (
        <Layout
            style={{
                flex: 1,
                flexDirection: 'row',
                bottom: 0,
                position: 'absolute',
                width: responsiveWidth(100),
                height: 80,
            }}>
            <Text
                style={{
                    marginLeft: 16,
                    marginTop: 30,
                    fontSize: 17,
                    fontWeight: '700',
                }}
                category={'s1'}>
                Toplam: {props.sumPrice + '₺'}
            </Text>
            <Button
                style={{marginLeft: 50, marginTop: 15, width: 180, height: 50}}
                status="success">
                <Text style={{color: 'white', fontSize: 16}} category={'s1'}>
                    Sepeti Onayla
                </Text>
            </Button>
        </Layout>
    );
};
