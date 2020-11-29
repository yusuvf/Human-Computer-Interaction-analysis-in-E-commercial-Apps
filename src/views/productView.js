import * as React from 'react';
import {
  ActivityIndicator,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
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
} from '@ui-kitten/components';
import GlobalStyles from './GlobalStyles';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {SliderBox} from 'react-native-image-slider-box';
import Swiper from 'react-native-swiper';

function ProductView({route, navigation}) {
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
      <TopNavigationAction icon={EditIcon} />
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
            style={{width: 200, height: 240}}
            source={{uri: product.item.img_url[0]}}
          />
        </View>
        <View style={styles.slide2}>
          <Image
            style={{width: 200, height: 240}}
            source={{uri: product.item.img_url[1]}}
          />
        </View>
        <View style={styles.slide3}>
          <Image
            style={{width: 200, height: 240}}
            source={{uri: product.item.img_url[2]}}
          />
        </View>
      </Swiper>
    );
  };

  const DrawerGroupsShowcase = () => {
    const [selectedIndex, setSelectedIndex] = React.useState(null);

    return (
      <Drawer
        selectedIndex={selectedIndex}
        onSelect={(index) => setSelectedIndex(index)}>
        <DrawerGroup title="Ürün Hakkında" accessoryLeft={SmartphoneIcon}>
          <DrawerItem title="UI Kitten" accessoryLeft={StarIcon} />
          <DrawerItem title="Kitten Tricks" accessoryLeft={StarIcon} />
        </DrawerGroup>
        <DrawerGroup title="Akveo Angular" accessoryLeft={BrowserIcon}>
          <DrawerItem title="Nebular" accessoryLeft={StarIcon} />
          <DrawerItem title="ngx-admin" accessoryLeft={StarIcon} />
          <DrawerItem title="UI Bakery" accessoryLeft={StarIcon} />
        </DrawerGroup>
        <DrawerGroup title="Akveo Design" accessoryLeft={ColorPaletteIcon}>
          <DrawerItem title="Eva Design System" accessoryLeft={StarIcon} />
          <DrawerItem title="Eva Icons" accessoryLeft={StarIcon} />
        </DrawerGroup>
      </Drawer>
    );
  };

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
              onPress={() => console.log('asd')}
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
                  accessoryLeft={CartIcon}>
                  Sepete Ekle
                </Button>
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
              onPress={() => console.log('asd')}
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
                  accessoryLeft={CartIcon}>
                  Sepete Ekle
                </Button>
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
    height: 300,
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
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB',
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#97CAE5',
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#92BBD9',
  },
});

export default ProductView;
