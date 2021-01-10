import * as React from 'react';
import {useEffect} from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';

import {Layout, Text, Button, Icon} from '@ui-kitten/components';

import {CartInfoContext} from '../components/CartInfoContext';
import {createStackNavigator} from '@react-navigation/stack';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

import {LogBox} from 'react-native';
LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications

import InputSpinner from 'react-native-input-spinner';

const CartStack = createStackNavigator();

const DeleteIcon = (props) => <Icon {...props} name="trash-2-outline" />;
//trash-2-outline

function CartViewStack() {
  return (
    <CartStack.Navigator>
      <CartStack.Screen name="Sepetim" component={CartView} />
    </CartStack.Navigator>
  );
}

let sumPricesArray = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

function CartView() {
  const [sumPrice, setSumPrice] = React.useState(0);
  const [selectedId, setSelectedId] = React.useState(null);
  const [value, setValue] = React.useContext(CartInfoContext);
  const [products, setProducts] = React.useState(value[1]);
  let copyArray = value[1];

  let myarray = [];

  for (let t = 0; t < value[1].length; t++) {
    myarray.push({
      id: value[1][t].id,
      price: value[1][t].price,
      salePrice: value[1][t].salePrice,
    });
  }
  console.log(myarray);




  const Item = ({item, onPress}) => {
    //console.log(product);
    if (item.salePrice === '') {

      return (
        <Layout style={styles.CartProductContainer}>
          <Image
            style={styles.CartProductImageContainer}
            source={{uri: item.img_url[0]}}
          />
          <View tyle={styles.CartProductInfoContainer}>
            <View>
              <Button
                style={styles.button}
                appearance="ghost"
                status="danger"
                accessoryLeft={DeleteIcon}
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
                  //setCart([...cart, {id:item.id, price: item.price * num}]);
                  //setItemPrice(item.price * num);
                }}
              />
            </View>
          </View>
        </Layout>
      );
    } else {

        useEffect(() => {
            /*
                let sum = 0;

                for (let p = 0; p < products.length; p++){
                    if(products[p].salePrice === ''){
                        sum = sum + products[p].price;
                    }else{
                        sum = sum + products[p].salePrice;
                    }
                }
                */

            console.log('başarılı');

            //setSumPrice(sum);
        }, [products]);

      return (
        <TouchableOpacity onPress={onPress}>
          <Layout style={styles.CartProductContainer}>
            <Image
              style={styles.CartProductImageContainer}
              source={{uri: item.img_url[0]}}
            />
            <View tyle={styles.CartProductInfoContainer}>
              <View>
                <Button
                  style={styles.button}
                  appearance="ghost"
                  status="danger"
                  accessoryLeft={DeleteIcon}
                  onPress={() => {
                    for (let k = 0; k < value[1].length; k++) {
                      if (value[1][k].id === item.id) {
                        value[1].splice(k, 1);
                      }
                    }
                    setValue(value);
                    //console.log(value);
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
                {itemSalePrice.toFixed(2) + '₺'}
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
                    let temp = copyArray;
                    /*
                    for (let i = 0; i < copyArray.length; i++) {
                      if (products[i].id === item.id) {
                        temp[i].salePrice = num * myarray[i].salePrice;
                      }
                    }
                    */
                    copyArray.map((x, i) => {
                      if (products[i].id === x.id) {
                          temp[i].salePrice = num * myarray[i].salePrice;
                      }
                    });

                    setProducts(temp);
                    console.log(products[0].salePrice);
                    /*
                                  let sum = 0;
                                  for (let c = 0; c < products.length; c++){
                                      console.log(sum);
                                      console.log(products[c].price);
                                      if(products[c].salePrice === undefined){
                                          sum += products[c].price;
                                      }else{
                                          sum += products[c].salePrice;
                                      }
                                  }
                                  console.log(sum);
                                  */
                  }}
                />
              </View>
            </View>
          </Layout>
        </TouchableOpacity>
      );
    }
  };

  const renderCart = ({item}) => {
    return <Item item={item} onPress={() => setSelectedId(item.id)} />;
  };

  if (value[0].count === 0) {
    return (
      <SafeAreaView style={styles.CartContainer}>
        <View>
          <Text category={'s1'}>Sepetinizde ürün bulunmamaktadır.</Text>
        </View>
      </SafeAreaView>
    );
  } else {
    return (
      <SafeAreaView style={styles.CartContainer}>
        <FlatList
          style={styles.FlatListContainer}
          data={products}
          renderItem={renderCart}
          extraData={products}
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
            Toplam: {sumPrice.toFixed(2) + '₺'}
          </Text>
          <Button
            style={{marginLeft: 50, marginTop: 15, width: 180, height: 50}}
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
});

export default CartViewStack;
