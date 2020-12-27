import * as React from 'react';
import {View, StyleSheet, SafeAreaView, FlatList, Image} from 'react-native';

import {Layout, Text, Button} from '@ui-kitten/components';

import {CartInfoContext} from '../components/CartInfoContext';
import {createStackNavigator} from '@react-navigation/stack';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

import InputSpinner from 'react-native-input-spinner';

const CartStack = createStackNavigator();

function CartViewStack() {
  return (
    <CartStack.Navigator>
      <CartStack.Screen name="Sepetim" component={CartView} />
    </CartStack.Navigator>
  );
}

let sumPricesArray = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
let count = 0;
let sumPrice = 0;

function calculate() {
  sumPrice = 0;
  for (let val of sumPricesArray) {
    sumPrice += val;
  }
  console.log(sumPricesArray);
}

function Item({item}) {
  //console.log(product);
  if (item.salePrice === '') {
    count++;
    const [itemPrice, setItemPrice] = React.useState(item.price);
    React.useEffect(() => {
      // Update the document title using the browser API
      sumPricesArray[count] = itemPrice;
      calculate();
    }, [itemPrice]);
    return (
      <Layout style={styles.CartProductContainer}>
        <Image
          style={styles.CartProductImageContainer}
          source={{uri: item.img_url[0]}}
        />
        <View tyle={styles.CartProductInfoContainer}>
          <Text
            style={{
              flexWrap: 'wrap',
              width: 280,
              marginLeft: 16,
              marginTop: 10,
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
          <View style={{alignSelf: 'flex-end', height: 100}}>
            <InputSpinner
              max={99}
              min={1}
              step={1}
              colorMax={'#f04048'}
              colorMin={'#40739e'}
              value={1}
              style={{width: 100, marginTop: 10}}
              inputStyle={{backgroundColor: 'white', height: 30}}
              buttonPressStyle={{height: 30, width: 30}}
              buttonStyle={{height: 30, width: 30}}
              onChange={(num) => {
                setItemPrice(item.price * num);
              }}
            />
          </View>
        </View>
      </Layout>
    );
  } else {
    count++;
    const [itemPrice, setItemPrice] = React.useState(item.salePrice);

    React.useEffect(() => {
      sumPricesArray[count] = itemPrice;
      calculate();
    }, [itemPrice]);

    return (
      <Layout style={styles.CartProductContainer}>
        <Image
          style={styles.CartProductImageContainer}
          source={{uri: item.img_url[0]}}
        />
        <View tyle={styles.CartProductInfoContainer}>
          <Text
            style={{
              flexWrap: 'wrap',
              width: 280,
              marginLeft: 16,
              marginTop: 10,
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
            {itemPrice.toFixed(2) + '₺'}
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
            <InputSpinner
              max={99}
              min={1}
              step={1}
              colorMax={'#f04048'}
              colorMin={'#40739e'}
              value={1}
              style={{width: 100, marginTop: 10}}
              inputStyle={{backgroundColor: 'white', height: 30}}
              buttonPressStyle={{height: 30, width: 30}}
              buttonStyle={{height: 30, width: 30}}
              onChange={(num) => {
                setItemPrice(item.salePrice * num);
              }}
            />
          </View>
        </View>
      </Layout>
    );
  }
}

function renderCart({item}) {
  return <Item item={item} />;
}

function CartView() {
  const [value, setValue] = React.useContext(CartInfoContext);
  console.log(value);
    if(value[0].count === 0){
        return(
            <SafeAreaView style={styles.CartContainer}>
                <View>
                    <Text category={"s1"}>Sepetinizde ürün bulunmamaktadır.</Text>
                </View>
            </SafeAreaView>
        )
    }else{
        return (
            <SafeAreaView style={styles.CartContainer}>
                <FlatList
                    style={styles.FlatListContainer}
                    data={value[1]}
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
                        Toplam: {sumPrice}
                    </Text>
                    <Button
                        style={{marginLeft: 130, marginTop: 15, width: 180, height: 50}}
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
    //alignItems: 'center',
    marginTop:8,
    height: 160,
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
});

export default CartViewStack;
