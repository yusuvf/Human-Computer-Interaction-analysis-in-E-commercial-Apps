import React from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  Image,
  Button, FlatList, TouchableOpacity, ActivityIndicator, ScrollView,
} from 'react-native';
import {SearchBar} from 'react-native-elements';
import Product from '../components/product';
import {useState} from 'react';
import {SliderBox} from 'react-native-image-slider-box';
import GlobalStyles from './GlobalStyles';

import { Rating, AirbnbRating } from 'react-native-ratings';

import { Shadow } from 'react-native-neomorph-shadows';

import { Text } from '@ui-kitten/components';

import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import ProductView from './productView';
import SearchResultView from './searchResultView';

import DismissKeyboardView from '../components/DismissKeyboard';

const SaleProducts = require('../db/onSaleProducts.json');

const HomeStack = createStackNavigator();

function LogoTitle() {
  return (
    <Image
      style={{width: 48, height: 48}}
      source={require('../img/logo.png')}
    />
  );
}

function MainPage({navigation}) {
  const [text, setText] = useState('');
  const [selectedId, setSelectedId] = React.useState(null);

  //const [images, setImage] = useState("./img/logo.png");

  const bannerImages = [
    require('../img/apple_advertisement.jpeg'),
    require('../img/tire_advertisement.jpeg'),
    require('../img/philips_advertisement.jpeg'),
  ];

  const saleProductsData = []
  let count = 0;

  for (let index = 0; index < SaleProducts.products.length; index++){
    saleProductsData.push({
          id: count,
          name: SaleProducts.products[index].name,
          price : SaleProducts.products[index].price,
          onSalePrice : SaleProducts.products[index].salePrice,
          rating : SaleProducts.products[index].itemRating,
          img_reference: SaleProducts.products[index].img_reference,
          imgHash : SaleProducts.products[index].imgHash
        }
    )
    count++;
  }

  const renderItem = ({ item }) => {
    console.log(selectedId)
    return (
        <SaleItem
            item={item}
            onPress={() => navigation.navigate("ProductView",{item})}
        />
    );
  };

  const SaleItem = ({ item, onPress }) => {
    const saleImages = [
      require("../img/braun1.jpg"),
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
        <View>
          <Shadow
              style={{
                paddingTop: responsiveHeight(2.5),
                shadowOffset: {width: 7, height: 7},
                shadowOpacity: 1,
                shadowColor: "grey",
                shadowRadius: 10,
                borderRadius: 10,
                backgroundColor: 'white',
                height:responsiveHeight(37),
                width:responsiveWidth(45),
                alignSelf: 'center',
                marginLeft: responsiveWidth(3),
                marginRight: responsiveWidth(3)
                // ...include most of View/Layout styles
              }}
          >
            <TouchableOpacity onPress={onPress} style={{ alignItems:'center'}}>
              <Image
                  source={saleImages[item.imgHash]}
                  style={{ width: responsiveWidth(28), height: responsiveHeight(17) }}
                  PlaceholderContent={<ActivityIndicator />}
              />
              <View style={{padding:0,alignItems:'center'}}>
                <AirbnbRating
                    count={5}
                    reviewSize={0.1}
                    defaultRating={item.rating}
                    size={12}
                />
                <View style={{padding:8, alignItems:'center'}}>
                  <Text category='p1' style={{fontSize:13, alignSelf:"center", textAlign:'center'}}>{item.name}</Text>
                  <View style={{alignItems:'center', position:'absolute', marginTop:responsiveHeight(4.5)}}>
                    <View style={{backgroundColor:'green', borderRadius:4, padding:3, marginTop:3}}>
                      <Text category='s1' style={{fontSize:15, color:'white', fontWeight:'bold'}} >{item.onSalePrice}</Text>
                    </View>
                    <Text category='s1' style={{fontSize:13, textDecorationLine: 'line-through', textDecorationStyle: 'solid'}} >{item.price}</Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          </Shadow>
        </View>
    );
  };

  return (
    <SafeAreaView style={GlobalStyles.droidSafeArea}>
      <ScrollView showsVerticalScrollIndicator ={false}
                  showsHorizontalScrollIndicator={false}
                  style={GlobalStyles.scrollViewContainer}>
        <View style={styles.LogoContainer}>
          <LogoTitle />
        </View>
        <View style={styles.searchbar}>
          <DismissKeyboardView>
            <SearchBar
                inputContainerStyle={{
                  backgroundColor: 'white',
                  borderColor:'grey',
                  borderWidth: 1,
                  borderRadius: 12,
                  width: responsiveWidth(80),
                  height: responsiveHeight(5),
                }}
                inputStyle={{
                  fontSize: responsiveFontSize(1.8),
                }}
                containerStyle={{
                  alignItems: 'center',
                  backgroundColor: 'transparent',
                  borderBottomWidth: 0,
                  borderTopWidth: 0,
                }}
                returnKeyType="search"
                onSubmitEditing={() => {
                  navigation.navigate('SearchResultView', text);
                }}
                searchIcon={{
                  size: 20,
                }}
                placeholder="Aradığınız ürün burada"
                placeholderTextColor="#afafaf"
                onChangeText={(text) => setText(text)}
                value={text}
                //ref={search => (search = search)}
            />
          </DismissKeyboardView>
        </View>
        <View style={styles.SliderBoxContainer}>
          <SliderBox
              images={bannerImages}
              sliderBoxHeight={responsiveHeight(25)}
              parentWidth={responsiveWidth(90)}
              style={styles.SliderBox}
          />
        </View>
        <View style={styles.SaleContainer}>
          <Text category='h1' style={{fontSize:20, fontWeight:'bold', marginLeft: responsiveWidth(3), marginBottom:3 }} >Fırsat Ürünleri</Text>
          <FlatList
              data={saleProductsData}
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
              extraData={selectedId}
              contentContainerStyle={styles.list}
              horizontal
              showsHorizontalScrollIndicator={false}
              onPress={() => navigation.navigate("ProductView")}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function HomeView() {
  return (
    <HomeStack.Navigator
      initialRouteName="MainPage"
      screenOptions={{headerShown: false}}>
      <HomeStack.Screen name="MainPage" component={MainPage} />
      <HomeStack.Screen name="SearchResultView" component={SearchResultView} />
      <HomeStack.Screen name="ProductView" component={ProductView} />
    </HomeStack.Navigator>
  );
}

const styles = StyleSheet.create({
  MainContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    flex: 1,
    width: responsiveWidth(100),
  },
  searchbar: {
    width: responsiveWidth(100),
    height: responsiveHeight(5),
    alignItems: 'center',
    justifyContent: 'center',
  },
  LogoContainer: {
    width: responsiveWidth(100),
    height: responsiveHeight(5),
    marginBottom: responsiveHeight(2),
    alignItems: 'center',
    justifyContent: 'center',
  },
  SliderBoxContainer: {
    width: responsiveWidth(100),
    height: responsiveHeight(24),
    marginTop: responsiveHeight(1),
    alignItems: 'center',
  },
  SliderBox: {
    width: responsiveWidth(90),
    height: responsiveHeight(24),
    borderRadius: 12,
  },
  SaleContainer:{
    flex:1,
    justifyContent:'center',
    backgroundColor: "white",
    alignSelf: 'center',
    height:responsiveHeight(50),
    marginTop:30,
    width:responsiveWidth(90),
    /*
    borderRadius: 6,
    borderWidth:0.8,
    borderColor:"grey"
     */
  },
  SaleProductContainer:{
    paddingTop: responsiveHeight(2.5),
    height:responsiveHeight(37),
    width:responsiveWidth(45),
    borderWidth: 0.6,
    borderRadius: 8,
    borderColor: "grey",
    alignSelf: 'center',
    backgroundColor: 'white',
    marginLeft: responsiveWidth(5),
  },
  list:{
    marginTop:10,
    marginRight: responsiveWidth(3.4),
  }
});

export default HomeView;
