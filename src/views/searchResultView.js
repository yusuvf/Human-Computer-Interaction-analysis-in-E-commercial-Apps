import * as React from 'react';
import {Button, SafeAreaView, View, Text, FlatList, StyleSheet} from 'react-native';

import ProductView from './productView';

import {
    responsiveHeight,
    responsiveWidth,
    responsiveFontSize
} from "react-native-responsive-dimensions"

const Products = require('../db/products.json');

function findSearchedProduct(searchedText) {
    let allProducts = [];
    let keyCount = 0;

    for(let i = 0; i < Products.products.length; i++) {
        for(let k = 0; k < Products.products[i].keywords.length; k++) {
            if(searchedText === Products.products[i].keywords[k]){
                keyCount = keyCount + 1;
                allProducts.push({
                    id : keyCount,
                    name : Products.products[i].name,
                    price : Products.products[i].price,
                    img_reference : Products.products[i].img_reference,
                })
            }
        }
    }
    return allProducts;
}


function SearchResultView({ route, navigation }){

    const searchedText  = route.params;
    let result = findSearchedProduct(searchedText);
    if(result == null)
    {
        result = "Aradığınız ürün maalesef bulunamadı.";
    }

    return(
        <SafeAreaView>
            <FlatList
                data={result}
                style={styles.MainContainer}
                renderItem={
                    ({item}) => <Text>{item.name}</Text>
                }
                keyExtractor={item => item.id}
            />
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    MainContainer: {
        backgroundColor: 'blue',
        flex: 1,
        width: responsiveWidth(100),
    },
    ProductContainer:{
        backgroundColor: 'red',
    }
});

export default SearchResultView;
