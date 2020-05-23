import * as React from 'react';
import {StyleSheet, Text, SafeAreaView, View, Image} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {SearchBar} from 'react-native-elements';
import Product from '../components/product';

const HomeStack = createStackNavigator();

function LogoTitle() {
  return (
      <Image
          style={{ width: 50, height: 50 }}
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
  return (
    <SafeAreaView style={styles.MainContainer}>
      <LogoTitle style = {styles.logoContainer}/>
      <View style={styles.container}>
        <SearchBar
            inputStyle={{
              textSize: 12
            }}
          inputContainerStyle={{
            backgroundColor: 'white',
          }}
          containerStyle={{
            alignItems: 'center',
            flex: 1,
            width: 300,
            backgroundColor: 'transparent',
            borderBottomWidth: 0,
            borderTopWidth: 0,
          }}
          placeholder="Aramak istediğiniz ürünü giriniz"
          placeholderTextColor="#afafaf"
          ref={search => (this.search = search)}
        />
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
    backgroundColor: 'orange',
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
