import * as React from 'react';
import {useEffect, useState, useContext} from 'react';
import {
    View,
    StyleSheet,
    SafeAreaView,
    FlatList,
    Image,
    TouchableOpacity,
    Text, Alert,
} from 'react-native';

import {Layout, Button, Icon} from '@ui-kitten/components';

import {CartInfoContext} from '../components/CartInfoContext';
import {createStackNavigator} from '@react-navigation/stack';
import {
    responsiveHeight,
    responsiveWidth,
} from 'react-native-responsive-dimensions';

import HomeView from '../views/home'

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
            <View style={{width:160}}>
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
            </View>
            <Button
                style={{marginLeft: 60, marginTop: 15, width: 180, height: 50}}
                status="success"
                onPress={() =>{

                    if(props.sumPrice===0){
                        Alert.alert(
                            "Lütfen seçtiğiniz ürünün adet bilgisini giriniz",
                            " "
                                [
                                { text: "OK", onPress: () => console.log("OK Pressed") }
                                ],
                            { cancelable: false }
                        );
                    }else{
                        Alert.alert(
                            "Siparişiniz Onaylanmıştır.",
                            " "
                                [
                                { text: "OK", onPress: () => console.log("OK Pressed") }
                                ],
                            { cancelable: false }
                        );
                        props.navigation.navigate("Onay");
                        let array = props.val;
                        array[0] = {count:0}
                        array[2] = {flag:true}
                        console.log(array);
                        props.setVal(array)
                        console.log(props.setVal);
                    }
                }}
            >
                <Text style={{color: 'white', fontSize: 16}} category={'s1'}>
                    Sepeti Onayla
                </Text>
            </Button>
        </Layout>
    );
};
