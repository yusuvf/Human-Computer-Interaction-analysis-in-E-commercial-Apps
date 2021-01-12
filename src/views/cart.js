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

import {LogBox} from 'react-native';
LogBox.ignoreLogs(['Warning: ...']);
LogBox.ignoreAllLogs();

import {Footer} from '../components/Footer';

let data = require('../db/products.json');
let summaryPrice = data.summaryPrice;
data = data.products;

const CartStack = createStackNavigator();

const DeleteIcon = (props) => <Icon {...props} name="trash-2-outline" />;

function CartViewStack() {
    return (
        <CartStack.Navigator>
            <CartStack.Screen name="Sepetim" component={CartView} />
        </CartStack.Navigator>
    );
}

function CartView() {
    const [sumPrice, setSumPrice] = useState(summaryPrice);
    const [val, setVal] = useContext(CartInfoContext);
    const [allProducts, setAllProducts] = useState([]);

    useEffect(() => {
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

    if (val[0].count === 0) {
        return (
            <SafeAreaView style={styles.CartContainer}>
                <View>
                    <Text category={'s1'}>Sepetinizde ürün bulunmamaktadır.</Text>
                </View>
            </SafeAreaView>
        );
    } else {
        function renderCart({item}) {
            return (
                <Item
                    val={val}
                    setVal={setVal}
                    setSumPrice={setSumPrice}
                    setAllProducts={setAllProducts}
                    item={item}
                />
            );
        }
        return (
            <SafeAreaView style={styles.CartContainer}>
                <FlatList
                    style={styles.FlatListContainer}
                    data={allProducts}
                    renderItem={renderCart}
                    keyExtractor={(item) => item.id.toString()}
                />
                <Footer sumPrice={sumPrice} />
            </SafeAreaView>
        );
    }
}

const Item = (props) => {
    const [item, setItem] = useState(props.item);

    const increase = () => {
        setItem((prev) => {
            return {
                ...prev,
                amount: prev.amount + 1,
            };
        });
        setItem((prev) => {
            return {
                ...prev,
                salePrice: props.item.salePrice * prev.amount,
            };
        });
        props.setSumPrice((prev) => prev + props.item.salePrice);
    };
    const decrease = () => {
        setItem((prev) => {
            return {
                ...prev,
                amount: prev.amount - 1,
            };
        });
        setItem((prev) => {
            return {
                ...prev,
                salePrice: props.item.salePrice * prev.amount,
            };
        });
        props.setSumPrice((prev) => prev - props.item.salePrice);
    };
    function removeElement(params) {
        props.setSumPrice((prev) => prev - props.item.salePrice * item.amount);
    }

    if (props.item.salePrice) {
        return (
            <Layout style={styles.CartProductContainer}>
                <Image
                    style={styles.CartProductImageContainer}
                    source={{uri: props.item.img_url[0]}}
                />
                <View tyle={styles.CartProductInfoContainer}>
                    <View>
                        <Button
                            style={styles.button}
                            appearance="ghost"
                            status="danger"
                            accessoryLeft={DeleteIcon}
                            onPress={() => {
                                let temp = new Array();
                                props.val[1].map((p) => {
                                    if (props.item.id !== p) {
                                        temp.push(p);
                                    }
                                });

                                let object = {
                                    count: props.val[0].count - 1,
                                };
                                props.setVal([object, temp]);
                                console.log('props.val', props.val);
                                removeElement();
                                // props.setAllProducts((prev) => {
                                //   for (let [i, user] of prev.entries()) {
                                //     if (user.id == props.item.id) {
                                //       prev.splice(i, 1);
                                //     }
                                //   }
                                //   return prev;
                                // });
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
                        Ücretsiz Kargo
                    </Text>
                    <View
                        style={{
                            alignSelf: 'flex-end',
                            flexDirection: 'row',
                            alignContent: 'space-between',
                            justifyContent: 'center',
                            alignItems:'center'
                        }}>
                        <Button style={styles.decreaseButton} disabled={item.amount === 0} onPress={() => decrease(item)}>-</Button>
                        <Text style={{fontSize: 16, paddingLeft:8, paddingRight:8}} category="s2">
                            {item.amount}
                        </Text>
                        <Button style={styles.increaseButton} onPress={() => increase(item)}>+</Button>
                    </View>
                </View>
            </Layout>
        );
    } else {
    }
};

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
    decreaseButton:{
        height: 20
    },
    increaseButton:{
        height:20
    }
});

export default CartViewStack;
