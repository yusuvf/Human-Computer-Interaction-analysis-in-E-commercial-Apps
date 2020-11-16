import * as React from 'react';
import {Button, SafeAreaView, View, FlatList, StyleSheet, TouchableOpacity, ActivityIndicator} from 'react-native';
import {Image} from 'react-native-elements';
import { Text } from '@ui-kitten/components';

import ProductView from './productView';

import {
    responsiveHeight,
    responsiveWidth,
    responsiveFontSize
} from "react-native-responsive-dimensions"

import { Icon, Layout, MenuItem, OverflowMenu, TopNavigation, TopNavigationAction } from '@ui-kitten/components';

const BackIcon = (props) => (
    <Icon {...props} name='arrow-back'/>
);

const EditIcon = (props) => (
    <Icon {...props} name='edit'/>
);

const MenuIcon = (props) => (
    <Icon {...props} name='more-vertical'/>
);

const InfoIcon = (props) => (
    <Icon {...props} name='info'/>
);

const LogoutIcon = (props) => (
    <Icon {...props} name='log-out'/>
);

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
                    imgHash : Products.products[i].imgHash,
                })
            }
        }
    }
    return allProducts;
}

const Item = ({ item, onPress }) => {
    const images = [
        require("../img/iphone11-purple.png"),
        require("../img/iphone-xr-yellow.png"),
        require("../img/iphone-xr-black.png"),
        require("../img/iphone-xr-orange.png"),
        require("../img/iphone-xr-red.png"),
        require("../img/iphone-xr-blue.png"),
        require("../img/iphone-xr-white.png"),
    ]
    //console.log(item.img_reference);

    console.log(item)
    return(
        <View style={styles.ProductContainer}>
            <TouchableOpacity onPress={onPress} style={{ alignItems:'center'}}>
                <Image
                    source={images[item.imgHash]}
                    style={{ width: responsiveWidth(40), maxHeight: 200, height:responsiveHeight(25) }}
                    PlaceholderContent={<ActivityIndicator />}
                />
                <View style={{padding:12,alignItems:'center'}}>
                    <Text category='p1' style={{fontSize:13}} >{item.name}</Text>
                    <Text category='s1' style={{fontSize:16}} >{item.price}</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
};

const SearchResultView = ({ route, navigation }) => {
    const [menuVisible, setMenuVisible] = React.useState(false);
    const [selectedId, setSelectedId] = React.useState(null);

    /*
    React.useEffect(() => {
        navigation.navigate("ProductView", selectedId)
    }, [selectedId]);
     */
    const toggleMenu = () => {
        setMenuVisible(!menuVisible);
    };

    const renderMenuAction = () => (
        <TopNavigationAction icon={MenuIcon} onPress={toggleMenu}/>
    );

    const renderRightActions = () => (
        <React.Fragment>
            <TopNavigationAction icon={EditIcon}/>
            <OverflowMenu
                anchor={renderMenuAction}
                visible={menuVisible}
                onBackdropPress={toggleMenu}>
                <MenuItem accessoryLeft={InfoIcon} title='About'/>
                <MenuItem accessoryLeft={LogoutIcon} title='Logout'/>
            </OverflowMenu>
        </React.Fragment>
    );

    const navigateBack = () => {
        navigation.goBack();
    };

    const renderBackAction = () => {
        return(
            <TopNavigationAction onPress={navigateBack} icon={BackIcon}/>
        );
    }

    const searchedText  = route.params;
    let result = findSearchedProduct(searchedText);
    console.log(result)
    if(result.length === 0)
    {
        return(
            <SafeAreaView style={styles.MainContainer}>
                <Layout style={styles.container} level='1'>
                    <TopNavigation
                        alignment='center'
                        title = {'"'+searchedText+'"'}
                        subtitle='Arama Sonuçları'
                        accessoryLeft={() => renderBackAction(navigation)}
                        accessoryRight={renderRightActions}
                    />
                    <Text category='s1' style={{marginTop: 100,justifyContent:'center', alignSelf:'center'}}>
                        Aradağınız Ürün Bulunamadı..
                    </Text>
                </Layout>
            </SafeAreaView>
        )
    }
    //console.log(result[0].img_reference)

    const renderItem = ({ item }) => {
        console.log(selectedId)
        return (
            <Item
                item={item}
                onPress={() => navigation.navigate("ProductView",{item})}
            />
        );
    };

    return (
        <SafeAreaView style={styles.MainContainer}>
            <Layout style={styles.container} level='1'>
                <TopNavigation
                    alignment='center'
                    title = {'"'+searchedText+'"'}
                    subtitle='Arama Sonuçları'
                    accessoryLeft={renderBackAction}
                    accessoryRight={renderRightActions}
                />
                <FlatList
                    data={result}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                    extraData={selectedId}
                    //contentContainerStyle={styles.list}
                    horizontal={false}
                    numColumns={2}
                    onPress={() => navigation.navigate("ProductView")}
                />
            </Layout>

        </SafeAreaView>
    );
};


const styles = StyleSheet.create({
    MainContainer: {
        flex:1,
        backgroundColor: 'white',
        width: responsiveWidth(100),
    },
    ProductContainer:{
        backgroundColor: '#f5f6fa',
        width:responsiveWidth(45),
        alignItems:'center',
        margin:10,
        borderRadius:6,
        borderWidth: 0.4,
        borderColor: "grey",
        height:responsiveHeight(30)
    },
    container: {
        minHeight: 128
    },
});

export default SearchResultView;
