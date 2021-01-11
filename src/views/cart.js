import * as React from 'react';
import {useEffect,useState,useContext} from 'react';
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

import NumericInput from 'react-native-numeric-input'

let data = require('../db/products.json');
data = data.products;

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

function CartView() {
  const [sumPrice, setSumPrice] = useState(0);
  const [selectedId, setSelectedId] = useState(null);
  const [val, setVal] = useContext(CartInfoContext);

    const [allProducts, setAllProducts] = useState([]);

    const [changingProducts, setChangingProducts] = useState([]);

    let copyproducts = []
    /*
       const map = new Map(Object.entries(data));
       console.log(map);

       val[1].map((x) => {
           if(map.has(x)){
               console.log(map);
           }
       })

      */

    useEffect(() => {
        console.log("useeffect çalııştıı")
        let temp = [];
        for (let t = 0; t<data.length; t++){
            for (let s = 0 ; s< val[1].length; s++){
                if(data[t].id === val[1][s]){
                    temp.push(data[t]);
                }
            }
        }
        setAllProducts(temp);
        //setAllProducts(state => ({ ...state, temp }));
    }, [allProducts]);

    console.log(allProducts);


  //setMyProducts(copyproducts);


    //console.log(myproducts);

  //let myarray = [];

  /*
   for (let t = 0; t < val[1].length; t++) {
    myarray.push({
      id: val[1][t].id,
      price: val[1][t].price,
      salePrice: val[1][t].salePrice,
    });
  }
 */

  //console.log(myarray);

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
      return (
        <TouchableOpacity>
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
                      /*
                    for (let k = 0; k < value[1].length; k++) {
                      if (value[1][k].id === item.id) {
                        value[1].splice(k, 1);
                      }
                    }
                    */
                    //setValue(value);
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
                {item.salePrice.toFixed(2) + '₺'}
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
                  <NumericInput
                      value={count}
                      onChange={value => {
                          setCount(value)

                          let temp = copyproducts;

                          for(let i =0; i<copyproducts.length; i++){
                              if(item.id === copyproducts[i].id){
                                  temp[i].salePrice = value * copyproducts[i].salePrice;
                                  console.log(copyproducts[i].salePrice);
                              }
                          }
                          setChangingProducts(copyproducts);
                      }}
                      onLimitReached={(isMax,msg) => console.log(isMax,msg)}
                      totalWidth={120}
                      totalHeight={34}
                      iconSize={20}
                      step={1}
                      minValue={1}
                      valueType='integer'
                      rounded
                      textColor='#B0228C'
                      iconStyle={{ color: 'white' }}
                      rightButtonBackgroundColor='#EA3788'
                      leftButtonBackgroundColor='#E56B70'
                  />
              </View>
            </View>
          </Layout>
        </TouchableOpacity>
      );
    }
  };

  const renderCart = ({item}) => {
    return <Item item={item}
                 onPress={() => setSelectedId(item.id + 1)} />;
  };
    /*
    const renderAllProducts = () => {
        products.map( (p,i) => (
            <Text key={i}>aaaa</Text>
            ));
    }
            <FlatList
          style={styles.FlatListContainer}
          data={myProducts}
          renderItem={renderCart}
          keyExtractor={(item) => item.id.toString()}
        />

                  {products.map((p, i) => (
                    <Item item={p}/>
                ))}
     */

  if (val[0].count === 0) {
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
