import * as React from 'react';
import {
  ActivityIndicator, FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
    Alert,
} from 'react-native';
import {
  Text,
  Button,
  Drawer,
  DrawerGroup,
  DrawerItem,
  Icon,
  Layout,
  TopNavigation,
  TopNavigationAction,
  OverflowMenu,
  MenuItem,
    Tab,
    TabView,
} from '@ui-kitten/components';
import GlobalStyles from './GlobalStyles';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {SliderBox} from 'react-native-image-slider-box';
import Swiper from 'react-native-swiper';

import {CartInfoContext} from "../components/CartInfoContext";
import {Shadow} from 'react-native-neomorph-shadows';
import {AirbnbRating} from 'react-native-ratings';

function ProductView({route, navigation}) {
  const [selectedTabIndex, setSelectedTabIndex] = React.useState(0);

  const [value, setValue] = React.useContext(CartInfoContext);
  //console.log(value);

  const product = route.params;

  const [menuVisible, setMenuVisible] = React.useState(false);

  const BackIcon = (props) => <Icon {...props} name="arrow-back" />;

  const EditIcon = (props) => <Icon {...props} name="edit" />;

  const MenuIcon = (props) => <Icon {...props} name="more-vertical" />;

  const InfoIcon = (props) => <Icon {...props} name="info" />;

  const LogoutIcon = (props) => <Icon {...props} name="log-out" />;

  const personIcon = (props) => <Icon {...props} name="person" />;

  const SmartphoneIcon = (props) => (
    <Icon {...props} name="smartphone-outline" />
  );

  const BrowserIcon = (props) => <Icon {...props} name="browser-outline" />;

  const ColorPaletteIcon = (props) => (
    <Icon {...props} name="color-palette-outline" />
  );

  const CartIcon = (props) => <Icon {...props} name="shopping-cart-outline" />;
  const StarIcon = (props) => <Icon {...props} name="star" />;

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const renderMenuAction = () => (
    <TopNavigationAction icon={MenuIcon} onPress={toggleMenu} />
  );

  const renderRightActions = () => (
    <React.Fragment>
      <OverflowMenu
        anchor={renderMenuAction}
        visible={menuVisible}
        onBackdropPress={toggleMenu}>
        <MenuItem accessoryLeft={InfoIcon} title="About" />
        <MenuItem accessoryLeft={LogoutIcon} title="Logout" />
      </OverflowMenu>
    </React.Fragment>
  );

  const navigateBack = () => {
    navigation.goBack();
  };

  const renderBackAction = () => {
    return <TopNavigationAction onPress={navigateBack} icon={BackIcon} />;
  };

  const ProductSwiper = () => {
    return (
      <Swiper
        style={styles.wrapper}
        removeClippedSubviews={false}
        showsButtons={true}>
        <View style={styles.slide1}>
          <Image
            style={styles.images}
            source={{uri: product.item.img_url[0]}}
          />
        </View>
        <View style={styles.slide2}>
          <Image
            style={styles.images}
            source={{uri: product.item.img_url[1]}}
          />
        </View>
        <View style={styles.slide3}>
          <Image
            style={styles.images}
            source={{uri: product.item.img_url[2]}}
          />
        </View>
      </Swiper>
    );
  };

  const SuccessAlert = () =>
      Alert.alert(
          "Ürün Sepetinize Başarıyla Eklendi",
          " "
          [
            { text: "OK", onPress: () => console.log("OK Pressed") }
          ],
          { cancelable: false }
      );

  const renderComments = ({item}) => {
    return (
        <Item item={item}/>
        );
  }

  const Item = ({item}) => {
    console.log(item);
      return(
          <View style={styles.comment}>
            <Text>{item.id}</Text>
          </View>
      );
  };

  const TabBar = ({param}) =>{
    let comments = param.item.comments;
    return(
        <TabView
            selectedIndex={selectedTabIndex}
            onSelect={index => setSelectedTabIndex(index)}>
          <Tab title='Ürün Açıklaması'>
            <Layout style={styles.InsideTabContainer1}>
              <Text category='s1'>{param.item.productInfo}</Text>
            </Layout>
          </Tab>
          <Tab title='Yorumlar'>
            <Layout style={styles.InsideTabContainer}>
              {
                comments.map((x) => {
                  return(
                      <View style={{flex:1, flexDirection:'row', alignSelf:'center', justifyContent:'center', alignItems:'center' ,borderColor:'grey',marginTop:6,
                        borderRadius: 6, borderWidth:0.8, marginBottom:6}}>
                        <View style={{width:80, height:80,alignItems:'center', justifyContent:'center'}}>
                          <View style={{borderWidth:0.7, borderRadius: 28, borderColor:'grey', height:50, width:50, alignItems:'center', justifyContent:'center'}}>
                            <Icon
                                style={{height:36, width:36}}
                                fill='#8F9BB3'
                                name='person'
                            />
                          </View>
                          <View>
                            <Text>
                              Ahmet
                            </Text>
                          </View>
                        </View>
                        <View style={{flex:1, marginRight:8, justifyContent:'center', flexWrap:'nowrap', backgroundColor:'#eaeaea', borderRadius:6, height:80}}>
                          <Text style={{width:270, padding:6, color:'black', fontSize:13}}>
                            {x.comment}
                          </Text>
                        </View>
                      </View>
                  );
                })
              }
            </Layout>
          </Tab>
        </TabView>
    );
  }

  if (product.item.salePrice === '') {
    return (
      <SafeAreaView>
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}>
          <Layout style={styles.ProductSliderContainer} level="1">
            <TopNavigation
              title={product.item.brand}
              alignment="center"
              accessoryLeft={() => renderBackAction(navigation)}
            />
            <View style={styles.ProductSlider}>
              <ProductSwiper />
            </View>
            <View style={styles.ProductInfoContainer}>
              <View style={styles.NameInfoContainer}>
                <Text category="s1">{product.item.name}</Text>
                <View style={{width:84, height:1}}>
                  <AirbnbRating
                      count={5}
                      reviewSize={0.1}
                      defaultRating={product.item.itemRating}
                      size={12}
                      isDisabled={true}
                      //selectedColor={'#9a4b8d'}
                  />
                </View>
              </View>
              <View style={styles.PriceButtonContainer}>
                <View style={styles.priceContainer}>
                  <Text category="s1" style={{fontSize: 18}}>
                    {product.item.price.toFixed(2) + '₺'}
                  </Text>
                </View>
                <Button
                  style={styles.button}
                  status="success"
                  accessoryLeft={CartIcon}
                  onPress={() => {
                    let temp = value[1];
                    if(temp.includes(product.item.id))
                    {
                      setValue([{count:value[0].count}, temp, {flag:false}]);
                      SuccessAlert();
                    }else{
                      temp.push(product.item.id);
                      setValue([{count:value[0].count + 1}, temp, {flag:false}]);
                      SuccessAlert();
                    }
                  }}
                >
                  Sepete Ekle
                </Button>
              </View>
              <View style={styles.TabContainer}>
                <TabBar param={product}/>
              </View>
            </View>
          </Layout>
        </ScrollView>
      </SafeAreaView>
    );
  } else {
    return (
      <SafeAreaView>
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}>
          <Layout style={styles.ProductSliderContainer} level="1">
            <TopNavigation
              title={product.item.brand}
              alignment="center"
              accessoryLeft={() => renderBackAction(navigation)}
            />
            <View style={styles.ProductSlider}>
              <ProductSwiper />
            </View>
            <View style={styles.ProductInfoContainer}>
              <View style={styles.NameInfoContainer}>
                <Text category="s1">{product.item.name}</Text>
                <View style={{width:84, height:1}}>
                  <AirbnbRating
                      count={5}
                      reviewSize={0.1}
                      defaultRating={product.item.itemRating}
                      size={12}
                      isDisabled={true}
                      //selectedColor={'#9a4b8d'}
                  />
                </View>
              </View>
              <View style={styles.PriceButtonContainer}>
                <View style={styles.priceContainer}>
                  <Text
                    category="s1"
                    style={{
                      fontSize: 13,
                      textDecorationLine: 'line-through',
                      textDecorationStyle: 'solid',
                    }}>
                    {product.item.price.toFixed(2) + '₺'}
                  </Text>
                  <View
                    style={{
                      backgroundColor: 'green',
                      width: 100,
                      borderRadius: 3,
                    }}>
                    <Text
                      category="s1"
                      style={{
                        fontSize: 17,
                        fontWeight: 'bold',
                        color: 'white',
                        textAlign: 'center',
                      }}>
                      {product.item.salePrice.toFixed(2) + '₺'}
                    </Text>
                  </View>
                </View>
                  <Button
                    style={styles.button}
                    status="success"
                    accessoryLeft={CartIcon}
                    onPress={() => {
                      let temp = value[1];
                      if(temp.includes(product.item.id))
                      {
                        setValue([{count:value[0].count}, temp, {flag:false}]);
                        SuccessAlert();
                      }else{
                        temp.push(product.item.id);
                        setValue([{count:value[0].count + 1}, temp, {flag:false}]);
                        SuccessAlert();
                      }
                    }}
                  >
                    Sepete Ekle
                  </Button>
                </View>
              <View style={styles.TabContainer}>
                <TabBar param={product}/>
              </View>
            </View>
          </Layout>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  ProductSlider: {
    width: responsiveWidth(90),
    height: 320,
    borderRadius: 12,
    alignSelf: 'center',
  },
  ProductSliderContainer: {
    flex: 1,
    height: responsiveHeight(100),
  },
  PriceButtonContainer: {
    flexDirection: 'row',
    width: responsiveWidth(100),
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: responsiveWidth(40),
    marginRight: responsiveWidth(5),
  },
  priceContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    marginLeft: responsiveWidth(5),
  },
  ProductInfoContainer: {

  },
  NameInfoContainer: {
    justifyContent: 'center',
    alignSelf: 'center',
    width: responsiveWidth(90),
    height: 80,
  },
  wrapper: {},
  slide1: {
    flex: 1,
    alignItems: 'center',
    //backgroundColor: '#b2bec3',
    borderTopWidth: 0.3,
    borderBottomWidth:0.3,
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    //backgroundColor: '#b2bec3',

    borderTopWidth: 0.3,
    borderBottomWidth:0.3,
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    //backgroundColor: '#b2bec3',

    borderTopWidth: 0.3,
    borderBottomWidth:0.3,
  },
  images: {
    width: 220,
    height: 260,
    marginTop:12
  },
  TabContainer: {
    alignSelf:'center',
    width: responsiveWidth(90),
    marginTop: 30
  },
  InsideTabContainer: {
    marginTop:6,
    height: 240,
    width:responsiveWidth(88),
    alignItems:'center',
    alignSelf:'center'
  },
  comment: {
    flex:1
  },
  InsideTabContainer1: {
    padding:12,
    flex:1
  }
});

export default ProductView;
