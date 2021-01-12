import * as React from 'react';
import {useEffect, useState, useContext} from 'react';
import {
    View,
    StyleSheet,
    SafeAreaView,
    FlatList,
    Image,
    TouchableOpacity,
} from 'react-native';

import {Layout, Text, Button, Icon} from '@ui-kitten/components';

import {CartInfoContext} from '../components/CartInfoContext';
import {createStackNavigator} from '@react-navigation/stack';
import {
    responsiveHeight,
    responsiveWidth,
} from 'react-native-responsive-dimensions';

import {LogBox} from 'react-native';
LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications

import InputSpinner from 'react-native-input-spinner';

import NumericInput from 'react-native-numeric-input';

let data = require('../db/products.json');
data = data.products;

const CartStack = createStackNavigator();
let tempPrice = 0;

const DeleteIcon = (props) => <Icon {...props} name="trash-2-outline" />;
//trash-2-outline

function CartViewStack() {
    return (
        <CartStack.Navigator>
            <CartStack.Screen name="Sepetim" component={CartView} />
        </CartStack.Navigator>
    );
}

function CartView() {
    const [sumPrice, setSumPrice] = useState();
    const [selectedId, setSelectedId] = useState(null);
    const [val, setVal] = useContext(CartInfoContext);
    const [allProducts, setAllProducts] = useState([]);
    const [changingProducts, setChangingProducts] = useState(0);

    useEffect(() => {
        console.log('useeffect çalııştı allproducts');
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


    /*
    useEffect(() => {
        async function calculate(){
            console.log("hiii");
        }


        let isMounted = true; // note this flag denote mount status
        calculate().then(data => {
            if (isMounted) setState(data);
        })
        return () => { isMounted = false }; // use effect cleanup to set flag false, if unmounted
    }, [changingProducts]);
    */
    /*
    useEffect(() => {
        console.log("değişti");
    }, [changingProducts]);

     */

    const Item = ({item}) => {
        //calculateSumPrice();

        const [count, setCount] = useState(1);

        if (item.salePrice === '') {
            return (
                <Layout style={styles.CartProductContainer}>
                    <Image
                        style={styles.CartProductImageContainer}
                        source={{uri: item.img_url[0]}}
                    />
                    <View tyle={styles.CartProductInfoContainer}>
                        <View>
                            <Button
                                style={styles.button}
                                appearance="ghost"
                                status="danger"
                                accessoryLeft={DeleteIcon}
                            />
                        </View>
                        <Text
                            style={{
                                flexWrap: 'wrap',
                                width: 260,
                                marginLeft: 16,
                                height: 50,
                            }}
                            category="p1">
                            {item.name}
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
                        <View style={{alignSelf: 'flex-end', height: 100}}></View>
                    </View>
                </Layout>
            );
        } else {
            return (
                <Layout style={styles.CartProductContainer}>
                    <Image
                        style={styles.CartProductImageContainer}
                        source={{uri: item.img_url[0]}}
                    />
                    <View tyle={styles.CartProductInfoContainer}>
                        <View>
                            <Button
                                style={styles.button}
                                appearance="ghost"
                                status="danger"
                                accessoryLeft={DeleteIcon}
                                onPress={() => {
                                    for(let t= 0; t < val[1].length; t++){
                                        let temp = val[1];
                                        if(item.id === val[1][t]){
                                            val[1].splice(t, 1);
                                            console.log(val[1]);
                                            setVal(val)
                                        }
                                    }
                                }}
                            />
                        </View>

                        <Text
                            style={{
                                flexWrap: 'wrap',
                                width: 260,
                                marginLeft: 16,
                                height: 50,
                            }}
                            category="p1">
                            {item.name}
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
                            Ücretsiz Kargo
                        </Text>
                        <View style={{alignSelf: 'flex-end', height: 1}}>
                            {/*
                            <Button onPress={() => calculateSumPrice(item)}>Artır</Button>
                            <Button onPress={() => setCount(count - 1)}>Azalt</Button>*/}
                            <NumericInput
                value={count}
                onChange={(value) => {
                  setCount(value);
                    console.log(value);
                    console.log(sumPrice);
                  for (let i = 0; i < allProducts.length ; i++){
                      if(allProducts[i].id === item.id){
                          tempPrice = allProducts[i].salePrice * value;
                      }
                      setSumPrice(tempPrice)
                  }
                }}
                onLimitReached={(isMax, msg) => console.log(isMax, msg)}
                totalWidth={120}
                totalHeight={34}
                iconSize={20}
                step={1}
                minValue={1}
                valueType="integer"
                rounded
                textColor="#B0228C"
                iconStyle={{color: 'white'}}
                rightButtonBackgroundColor="#EA3788"
                leftButtonBackgroundColor="#E56B70"
              />
                        </View>
                    </View>
                </Layout>
            );
        }
    };

    const renderCart = ({item}) => {
        return <Item item={item}/>;
    };

    if (val[0].count === 0) {
        return (
            <SafeAreaView style={styles.CartContainer}>
                <View>
                    <Text category={'s1'}>Sepetinizde ürün bulunmamaktadır.</Text>
                </View>
            </SafeAreaView>
        );
    } else {
        function calculateSumPrice(item) {
            console.log(item);
        }
        return (
            <SafeAreaView style={styles.CartContainer}>
                <FlatList
                    style={styles.FlatListContainer}
                    data={allProducts}
                    renderItem={renderCart}
                    keyExtractor={(item) => item.id.toString()}
                />
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
                        Toplam: {sumPrice + '₺'}
                    </Text>
                    <Button
                        style={{marginLeft: 50, marginTop: 15, width: 180, height: 50}}
                        status="success">
                        <Text style={{color: 'white', fontSize: 16}} category={'s1'}>
                            Sepeti Onayla
                        </Text>
                    </Button>
                </Layout>
            </SafeAreaView>
        );
    }
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
        marginTop: 8,
        height: 180,
        padding: 6,
    },
    CartProductImageContainer: {
        width: 100,
        height: responsiveHeight(15),
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
        marginRight: 6,
        alignSelf: 'flex-end',
    },
});

export default CartViewStack;
