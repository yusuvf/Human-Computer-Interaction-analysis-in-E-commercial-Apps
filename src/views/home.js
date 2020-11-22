import React from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  Image,
  Button,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import {SearchBar} from 'react-native-elements';
import Product from '../components/product';
import {useState} from 'react';
import {SliderBox} from 'react-native-image-slider-box';
import GlobalStyles from './GlobalStyles';

import {Rating, AirbnbRating} from 'react-native-ratings';

import {Shadow} from 'react-native-neomorph-shadows';

import {Layout, Text} from '@ui-kitten/components';

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
  const [touchControl, setTouchControl] = React.useState({
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderBottomWidth: 0,
    borderTopWidth: 0,
      borderRadius: 40,
  });

  //const [images, setImage] = useState("./img/logo.png");

  const bannerImages = [
      require('../img/Banner1.png')
  ];

  const saleProductsData = [];
  let count = 0;

  for (let index = 0; index < SaleProducts.products.length; index++) {
    saleProductsData.push(SaleProducts.products[index]);
    count++;
  }

  const renderItem = ({item}) => {
    return (
      <SaleItem
        item={item}
        onPress={() => navigation.navigate('ProductView', {item})}
      />
    );
  };

  const SaleItem = ({item, onPress}) => {

    //backgroundColor:'rgba(120,120,120,0.08)

    return (
      <View style={{paddingTop: 3}}>
        <Shadow
          style={{
            paddingTop: responsiveHeight(2.5),
            shadowOffset: {width: 7, height: 7},
            shadowOpacity: 1,
            shadowColor: 'grey',
            shadowRadius: 10,
            borderRadius: 10,
            backgroundColor: 'white',
            borderColor: '#E7E5E4',
            borderWidth: 0.5,
            height: 320,
            width: responsiveWidth(45),
            alignSelf: 'center',
            marginLeft: responsiveWidth(3),
            marginRight: responsiveWidth(3),
          }}>
          <TouchableOpacity onPress={onPress} style={{alignItems: 'center'}}>
            <Image
                source={{uri:item.img_url[0]}}
              style={{width: 120, height: 150}}
              PlaceholderContent={<ActivityIndicator />}
            />
            <View style={{padding: 0, alignItems: 'center'}}>
              <AirbnbRating
                count={5}
                reviewSize={0.1}
                defaultRating={item.itemRating}
                size={12}
                isDisabled={true}
                //selectedColor={'#9a4b8d'}
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
                    marginTop: 50,
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
                      {item.salePrice.toFixed(2) + "₺"}
                    </Text>
                  </View>
                  <Text
                    category="s1"
                    style={{
                      fontSize: 13,
                      textDecorationLine: 'line-through',
                      textDecorationStyle: 'solid',
                    }}>
                    {item.price.toFixed(2) + "₺"}
                  </Text>
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
      <ScrollView
        showsVerticalScrollIndicator={false}
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
                borderColor: 'grey',
                borderWidth: 0.6,
                borderBottomWidth: 0.6,
                borderRadius: 40,
                width: responsiveWidth(85),
                height: 45,
              }}
              inputStyle={{
                fontSize: 16,
                color: 'black',
              }}
              containerStyle={touchControl}
              returnKeyType="search"
              onSubmitEditing={() => {
                  console.log(text.toLowerCase())
                navigation.navigate('SearchResultView', text.toLowerCase());
              }}
              searchIcon={{
                containerStyle: {marginLeft: 8},
                size: 20,
              }}
              rightIconContainerStyle={{marginRight: 10}}
              placeholder="Aradığınız ürün burada"
              placeholderTextColor="#afafaf"
              onChangeText={(text) => setText(text)}
              onFocus={() =>
                setTouchControl({
                  alignItems: 'center',
                  backgroundColor: 'transparent',
                  borderBottomWidth: 0,
                  borderTopWidth: 0,
                  shadowColor: '#6B7280',
                    borderRadius: 40,
                  shadowOpacity: 0.6,
                  shadowRadius: 3.62,
                  elevation: 5,
                })
              }
              onBlur={() =>
                setTouchControl({
                  alignItems: 'center',
                  backgroundColor: 'transparent',
                  borderBottomWidth: 0,
                  borderTopWidth: 0,
                    borderRadius: 40,
                })
              }
              clear
              value={text}
            />
          </DismissKeyboardView>
        </View>
        <View style={styles.SliderBoxContainer}>
          <SliderBox
            images={bannerImages}
            sliderBoxHeight={300}
            parentWidth={responsiveWidth(90)}
            style={styles.SliderBox}
          />
        </View>
        <Layout style={styles.SaleContainer}>
          <Text
            category="h1"
            style={{
              fontSize: 20,
              fontWeight: 'bold',
              marginBottom: 3,
            }}>
            Fırsat Ürünleri
          </Text>
          <FlatList
            data={saleProductsData}
            renderItem={renderItem}
            //keyExtractor={(item) => item.id}
            keyExtractor={(item, index) => index.toString()}
            extraData={selectedId}
            contentContainerStyle={styles.list}
            horizontal
            showsHorizontalScrollIndicator={false}
            onPress={() => navigation.navigate('ProductView')}
          />
        </Layout>
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
    height: 50,
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
    height: 300,
    marginTop: 15,
    alignItems: 'center',
  },
  SliderBox: {
    width: responsiveWidth(90),
    height: 300,
    borderRadius: 12,
  },
  SaleContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white',
    alignSelf: 'center',
    marginTop: 25,
    width: responsiveWidth(90),
    /*
    borderRadius: 6,
    borderWidth:0.8,
    borderColor:"grey"
     */
  },
  SaleProductContainer: {
    paddingTop: responsiveHeight(2.5),
    height: responsiveHeight(37),
    width: responsiveWidth(45),
    borderWidth: 0.6,
    borderRadius: 8,
    borderColor: 'grey',
    alignSelf: 'center',
    backgroundColor: 'white',
    marginLeft: responsiveWidth(5),
  },
  list: {
    marginTop: 10,
    marginRight: responsiveWidth(3.4),
  },
});

export default HomeView;
