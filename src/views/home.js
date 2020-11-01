import React from 'react';
import {
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  Image,
  Button,
} from 'react-native';
import {SearchBar} from 'react-native-elements';
import Product from '../components/product';
import {useState} from 'react';
import {SliderBox} from 'react-native-image-slider-box';
import GlobalStyles from './GlobalStyles';

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

  //const [images, setImage] = useState("./img/logo.png");

  const images = [
    require('../img/advertisement.jpg'),
    require('../img/advertisement1.jpg'),
  ];

  return (
    <SafeAreaView style={GlobalStyles.droidSafeArea}>
      <View style={styles.LogoContainer}>
        <LogoTitle />
      </View>
      <View style={styles.searchbar}>
        <DismissKeyboardView>
          <SearchBar
            inputContainerStyle={{
              backgroundColor: 'white',
              borderRadius: 16,
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
          images={images}
          sliderBoxHeight={responsiveHeight(20)}
          parentWidth={responsiveWidth(80)}
          style={styles.SliderBox}
        />
      </View>
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
    backgroundColor: '#40739e',
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
    height: responsiveHeight(25),
    marginTop: responsiveHeight(1),
    alignItems: 'center',
  },
  SliderBox: {
    width: responsiveWidth(80),
    height: responsiveHeight(25),
    borderRadius: 12,
  },
});

export default HomeView;
