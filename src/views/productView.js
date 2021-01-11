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

  /*
  const DrawerGroupsShowcase = () => {
    const [selectedIndex, setSelectedIndex] = React.useState(null);

    return (
      <Drawer
        selectedIndex={selectedIndex}
        onSelect={(index) => setSelectedIndex(index)}>
        <DrawerGroup title="Ürün Açıklaması" accessoryLeft={SmartphoneIcon}>
          <DrawerItem onPress={() => {}} title="Test"/>
        </DrawerGroup>
        <DrawerGroup title="Ürün Özellikleri" accessoryLeft={BrowserIcon}>
          <DrawerItem onPress={() => {}} title="Nebular"  />
        </DrawerGroup>
        <DrawerGroup title="Taksit Bilgileri" accessoryLeft={ColorPaletteIcon}>
          <DrawerItem onPress={() => {}} title="Eva Design System"/>
        </DrawerGroup>
      </Drawer>
    );
  };
 */

  const renderComments = ({item}) => {
    return (
        <Item item={item}/>
        );
  }

  const Item = ({item}) => {

      return(
          <View style={styles.comment}>
            <Text>{item.id}</Text>
          </View>
      );
  };

  const TabBar = ({param}) =>{
    return(
        <TabView
            selectedIndex={selectedTabIndex}
            onSelect={index => setSelectedTabIndex(index)}>
          <Tab title='Ürün Açıklaması'>
            <Layout style={styles.InsideTabContainer}>
              <Text category='s1'>{param.item.productInfo}</Text>
            </Layout>
          </Tab>
          <Tab title='Yorumlar'>
            <Layout style={styles.InsideTabContainer}>
              <FlatList
                  data = {product}
                  renderItem={renderComments}
                  keyExtractor={(item) => item.id}
              />
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
              accessoryRight={renderRightActions}
            />
            <View style={styles.ProductSlider}>
              <ProductSwiper />
            </View>
            <View style={styles.ProductInfoContainer}>
              <View style={styles.NameInfoContainer}>
                <Text category="s1">{product.item.name}</Text>
              </View>
              <View style={styles.PriceButtonContainer}>
                <View style={styles.priceContainer}>
                  <Text category="s1" style={{fontSize: 16}}>
                    {product.item.price.toFixed(2) + '₺'}
                  </Text>
                </View>
                <Button
                  style={styles.button}
                  status="success"
                  accessoryLeft={CartIcon}
                  onPress={() => {
                    let temp = value[1];
                    temp.push(product.item.id);
                    setValue([{count:value[0].count + 1}, temp]);
                    SuccessAlert();
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
              accessoryRight={renderRightActions}
            />
            <View style={styles.ProductSlider}>
              <ProductSwiper />
            </View>
            <View style={styles.ProductInfoContainer}>
              <View style={styles.NameInfoContainer}>
                <Text category="s1">{product.item.name}</Text>
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
                        fontSize: 16,
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
                      temp.push(product.item.id);
                      setValue([{count:value[0].count + 1}, temp]);
                      SuccessAlert();
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
    height: 60,
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
    width: 200,
    height: 240,
    marginTop:20
  },
  TabContainer: {
    alignSelf:'center',
    width: responsiveWidth(90),
    marginTop: 30
  },
  InsideTabContainer: {
    paddingTop:16,
    height: 180,
  },
  comment: {
    flex:1
  }
});

export default ProductView;
