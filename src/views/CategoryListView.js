import * as React from 'react';

import {
    ApplicationProvider,
    Layout,
    Text,
    IconRegistry, TopNavigation,
} from '@ui-kitten/components';
import {ActivityIndicator, FlatList, SafeAreaView, StyleSheet, TouchableOpacity, View} from 'react-native';
import GlobalStyles from './GlobalStyles';
import {responsiveWidth} from 'react-native-responsive-dimensions';
import {Shadow} from 'react-native-neomorph-shadows';
import {Image} from 'react-native-elements';
import {AirbnbRating} from 'react-native-ratings';

const Products = require('../db/products.json');

function findSearchedProduct(searchedText) {
    let allProducts = [];

    for (let i = 0; i < Products.products.length; i++) {
        for (let k = 0; k < Products.products[i].keywords.length; k++) {
            if (searchedText === Products.products[i].keywords[k]) {
                allProducts.push(Products.products[i]);
                break;
            }
        }
    }
    return allProducts;
}

const CategoryResult = ({route, navigation}) => {
    let result = findSearchedProduct(route.params);

    const renderItem = ({item}) => {
        //console.log(selectedId);
        return (
            <Item
                item={item}
                onPress={() => navigation.navigate('ProductView', {item})}
            />
        );
    };

    const Item = ({item, onPress}) => {
        //console.log(item);
        if (item.salePrice === '') {
            return (
                <View style={styles.ProductContainer}>
                    <Shadow style={styles.shadow}>
                        <TouchableOpacity onPress={onPress} style={{alignItems: 'center'}}>
                            <Image
                                source={{uri: item.img_url[0]}}
                                style={{
                                    width: responsiveWidth(30),
                                    maxHeight: 160,
                                    height: 200,
                                }}
                                PlaceholderContent={<ActivityIndicator />}
                            />
                            <View style={{padding: 0, alignItems: 'center'}}>
                                <AirbnbRating
                                    count={5}
                                    reviewSize={0.1}
                                    defaultRating={item.itemRating}
                                    size={12}
                                    isDisabled={true}
                                />
                                <View style={{padding: 8, alignItems: 'center'}}>
                                    <Text
                                        numberOfLines={2}
                                        category="p1"
                                        style={{
                                            fontSize: 13,
                                            alignSelf: 'center',
                                            textAlign: 'center',
                                        }}>
                                        {item.name}
                                    </Text>
                                    <View
                                        style={{
                                            alignItems: 'center',
                                            position: 'absolute',
                                            marginTop: 45,
                                        }}>
                                        <View style={{borderRadius: 4, padding: 3, marginTop: 3}}>
                                            <Text
                                                category="s1"
                                                style={{fontSize: 15, fontWeight: 'bold'}}>
                                                {item.price.toFixed(2) + '₺'}
                                            </Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </Shadow>
                </View>
            );
        } else {
            return (
                <View style={styles.ProductContainer}>
                    <Shadow style={styles.shadow}>
                        <TouchableOpacity onPress={onPress} style={{alignItems: 'center'}}>
                            <Image
                                source={{uri: item.img_url[0]}}
                                style={{
                                    width: responsiveWidth(30),
                                    maxHeight: 160,
                                    height: 200,
                                }}
                                PlaceholderContent={<ActivityIndicator />}
                            />
                            <View style={{padding: 0, alignItems: 'center'}}>
                                <AirbnbRating
                                    count={5}
                                    reviewSize={0.1}
                                    defaultRating={item.itemRating}
                                    size={12}
                                    isDisabled={true}
                                />
                                <View style={{padding: 8, alignItems: 'center'}}>
                                    <Text
                                        numberOfLines={2}
                                        category="p1"
                                        style={{
                                            fontSize: 13,
                                            alignSelf: 'center',
                                            textAlign: 'center',
                                        }}>
                                        {item.name}
                                    </Text>
                                    <View
                                        style={{
                                            alignItems: 'center',
                                            position: 'absolute',
                                            marginTop: 45,
                                        }}>
                                        <View
                                            style={{
                                                backgroundColor: 'green',
                                                borderRadius: 4,
                                                padding: 3,
                                                marginTop: 3,
                                            }}>
                                            <Text
                                                category="s1"
                                                style={{
                                                    fontSize: 15,
                                                    color: 'white',
                                                    fontWeight: 'bold',
                                                }}>
                                                {item.salePrice.toFixed(2) + '₺'}
                                            </Text>
                                        </View>
                                        <Text
                                            category="s1"
                                            style={{
                                                fontSize: 13,
                                                textDecorationLine: 'line-through',
                                                textDecorationStyle: 'solid',
                                            }}>
                                            {item.price.toFixed(2) + '₺'}
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </Shadow>
                </View>
            );
        }
    };

    return(
        <SafeAreaView style={GlobalStyles.droidSafeArea}>
            <Layout style={styles.container} level="1">
                <FlatList
                    data={result.sort(function (a, b) {
                        if (a.price > b.price) return 1;
                        if (a.price < b.price) return -1;
                        return 0;
                    })}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                    //contentContainerStyle={styles.list}
                    horizontal={false}
                    numColumns={2}
                />
            </Layout>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    ProductContainer: {
        padding: responsiveWidth(2.5),
        alignItems: 'center',
    },
    container: {
        flex: 1,
        width: responsiveWidth(100),
    },
    shadow: {
        paddingTop: 15,
        shadowOffset: {width: 7, height: 7},
        shadowOpacity: 1,
        shadowColor: 'grey',
        shadowRadius: 10,
        borderRadius: 10,
        backgroundColor: 'white',
        height: 320,
        width: responsiveWidth(45),
        alignSelf: 'center',
    },
});

export default CategoryResult;
