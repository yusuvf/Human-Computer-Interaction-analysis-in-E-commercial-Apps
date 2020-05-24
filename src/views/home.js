import * as React from 'react';
import {StyleSheet, Text, SafeAreaView, View, Image} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {SearchBar} from 'react-native-elements';
import Product from '../components/product';
import { useState } from 'react';

import DismissKeyboardView from '../components/DismissKeyboard';

//const HomeStack = createStackNavigator();

function LogoTitle() {
  return (
      <Image
          style={{ width: 48, height: 48 }}
          source={require('../img/logo.png')}
      />
  );
}

function HomeScreen() {
  return (
    <HomeView/>
  );
}

function HomeView() {
  const [text, setText] = useState("");

  return (
    <SafeAreaView style={styles.MainContainer}>
      <LogoTitle style = {styles.logoContainer}/>
      <View style={styles.container}>
        <DismissKeyboardView>
         <SearchBar
          inputContainerStyle={{
            backgroundColor: 'white',
            borderRadius: 20,
            width:320,
          }}
          inputStyle={{
            fontSize: 16
          }}
          containerStyle={{
            marginTop:20,
            alignItems: 'center',
            flex: 1,
            backgroundColor: 'transparent',
            borderBottomWidth: 0,
            borderTopWidth: 0,
          }}
          returnKeyType="search"
          searchIcon={{
            size: 20
          }}
          placeholder="Aradığınız ürün burada"
          placeholderTextColor="#afafaf"
            onChangeText={(text) => setText(text)}
            value={text}
          ref={search => (search = search)}
         />
        </DismissKeyboardView>
        <View style={styles.productFlow}>
          <Product />
        </View>
      </View>
    </SafeAreaView>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    backgroundColor: '#74b9ff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer:{

  }

});
