import * as React from 'react';
import {SafeAreaView, Alert, FlatList, View, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {
  Layout,
  Text,
  Button,
  Icon,
  MenuItem,
  Menu,
} from '@ui-kitten/components';
import {createStackNavigator} from '@react-navigation/stack';
import {useContext, useEffect, useState} from 'react';
import {CartInfoContext} from '../components/CartInfoContext';
import {responsiveHeight, responsiveWidth} from 'react-native-responsive-dimensions';

let data = require('../db/products.json');
let summaryPrice = data.summaryPrice;
data = data.products;

function OrdersView({navigation}) {
    const [val, setVal] = useContext(CartInfoContext);
    const [allProducts, setAllProducts] = useState([]);

    React.useEffect(() => {
        let temp = [];
        for (let t = 0; t < data.length; t++) {
            for (let s = 0; s < val[1].length; s++) {
                if (data[t].id === val[1][s]) {
                    temp.push(data[t]);
                }
            }
        }
        setAllProducts(temp);
    }, [val]);

    const Item = (props) => {
        const [item, setItem] = useState(props.item);
        if (props.item.salePrice) {
            return (
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate('ProductView', {item});
                    }}>
                    <Layout style={styles.CartProductContainer}>
                        <Image
                            style={styles.CartProductImageContainer}
                            source={{uri: props.item.img_url[0]}}
                        />
                        <View tyle={styles.CartProductInfoContainer}>
                            <Text
                                style={{
                                    flexWrap: 'wrap',
                                    width: 260,
                                    marginLeft: 16,
                                    height: 50,
                                }}
                                category="p1">
                                {props.item.name}
                            </Text>
                            <Text
                                style={{
                                    flexWrap: 'wrap',
                                    width: 280,
                                    marginLeft: 16,
                                    fontSize: 16,
                                    color: '#663300',
                                }}
                                category="s1">
                                {item.salePrice.toFixed(2) + '₺'}
                            </Text>
                            <Text
                                style={{
                                    flexWrap: 'wrap',
                                    width: 280,
                                    marginLeft: 16,
                                    marginTop: 4,
                                    color: '#006633',
                                }}
                                category="s2">
                                1 Adet
                            </Text>
                        </View>
                    </Layout>
                </TouchableOpacity>
            );
        } else {
            return (
                <TouchableOpacity
                    onPress={() => {
                        props.navigation.navigate('ProductView', {item});
                    }}>
                    <Layout style={styles.CartProductContainer}>
                        <Image
                            style={styles.CartProductImageContainer}
                            source={{uri: props.item.img_url[0]}}
                        />
                        <View tyle={styles.CartProductInfoContainer}>
                            <Text
                                style={{
                                    flexWrap: 'wrap',
                                    width: 260,
                                    marginLeft: 16,
                                    height: 50,
                                }}
                                category="p1">
                                {props.item.name}
                            </Text>
                            <Text
                                style={{
                                    flexWrap: 'wrap',
                                    width: 280,
                                    marginLeft: 16,
                                    fontSize: 16,
                                    color: '#663300',
                                }}
                                category="s1">
                                {item.price.toFixed(2) + '₺'}
                            </Text>
                            <Text
                                style={{
                                    flexWrap: 'wrap',
                                    width: 280,
                                    marginLeft: 16,
                                    marginTop: 4,
                                    color: '#006633',
                                }}
                                category="s2">
                                Ücretsiz Kargo
                            </Text>
                            <View
                                style={{
                                    alignSelf: 'flex-end',
                                    flexDirection: 'row',
                                    alignContent: 'space-between',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}>
                            </View>
                        </View>
                    </Layout>
                </TouchableOpacity>
            );
        }
    }

    function renderOrders({item}) {
        return (
            <Item
                item={item}
            />
        );
    }

    return (
        <SafeAreaView>
            <View>
                <FlatList
                    style={styles.FlatListContainer}
                    data={allProducts}
                    renderItem={renderOrders}
                    keyExtractor={(item) => item.id.toString()}
                />
            </View>
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    CartContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    CartProductContainer: {
        flex: 1,
        flexDirection: 'row',
        height: 180,
        padding: 6,
    },
    CartProductImageContainer: {
        width: 100,
        height: responsiveHeight(15),
        marginTop: 10,
    },
    CartProductInfoContainer: {
        flexWrap: 'wrap',
        flex: 1,
    },
    FlatListContainer: {
        width: responsiveWidth(100),
    },
    button: {
        height: 0,
        width: 10,
        marginBottom: 8,
        marginRight: 6,
        alignSelf: 'flex-end',
    },
    decreaseButton: {
        borderWidth: 0.8,
        borderColor: 'grey',
        height: 36,
        width: 36,
        borderRadius: 800,
    },
    increaseButton: {
        borderWidth: 0.8,
        borderColor: 'grey',
        height: 36,
        width: 36,
        borderRadius: 800,
    },
});

export default OrdersView;
