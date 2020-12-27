import * as React from 'react';
import {
  Button,
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import {Image} from 'react-native-elements';
import {Text} from '@ui-kitten/components';

import ProductView from './productView';

import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';

import {
  Icon,
  Layout,
  MenuItem,
  OverflowMenu,
  TopNavigation,
  TopNavigationAction,
} from '@ui-kitten/components';
import {Shadow} from 'react-native-neomorph-shadows';
import GlobalStyles from './GlobalStyles';
import {AirbnbRating} from 'react-native-ratings';

const BackIcon = (props) => <Icon {...props} name="arrow-back" />;

const EditIcon = (props) => <Icon {...props} name="edit" />;

const MenuIcon = (props) => <Icon {...props} name="more-vertical" />;

const InfoIcon = (props) => <Icon {...props} name="info" />;

const LogoutIcon = (props) => <Icon {...props} name="log-out" />;

const Products = require('../db/products.json');

function findSearchedProduct(searchedText) {
  let allProducts = [];

  for (let i = 0; i < Products.products.length; i++) {
    for (let k = 0; k < Products.products[i].keywords.length; k++) {
      if (searchedText === Products.products[i].keywords[k]) {
        allProducts.push(Products.products[i]);
        break;
      }
    }
  }
  return allProducts;
}

const Item = ({item, onPress}) => {
  //console.log(item);
  if (item.salePrice === '') {
    return (
      <View style={styles.ProductContainer}>
        <Shadow style={styles.shadow}>
          <TouchableOpacity onPress={onPress} style={{alignItems: 'center'}}>
            <Image
              source={{uri: item.img_url[0]}}
              style={{
                width: responsiveWidth(30),
                maxHeight: 160,
                height: 200,
              }}
              PlaceholderContent={<ActivityIndicator />}
            />
            <View style={{padding: 0, alignItems: 'center'}}>
              <AirbnbRating
                count={5}
                reviewSize={0.1}
                defaultRating={item.itemRating}
                size={12}
                isDisabled={true}
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
                    marginTop: 45,
                  }}>
                  <View style={{borderRadius: 4, padding: 3, marginTop: 3}}>
                    <Text
                      category="s1"
                      style={{fontSize: 15, fontWeight: 'bold'}}>
                      {item.price.toFixed(2) + '₺'}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        </Shadow>
      </View>
    );
  } else {
    return (
      <View style={styles.ProductContainer}>
        <Shadow style={styles.shadow}>
          <TouchableOpacity onPress={onPress} style={{alignItems: 'center'}}>
            <Image
              source={{uri: item.img_url[0]}}
              style={{
                width: responsiveWidth(30),
                maxHeight: 160,
                height: 200,
              }}
              PlaceholderContent={<ActivityIndicator />}
            />
            <View style={{padding: 0, alignItems: 'center'}}>
              <AirbnbRating
                count={5}
                reviewSize={0.1}
                defaultRating={item.itemRating}
                size={12}
                isDisabled={true}
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
                      marginTop: 45,
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
                      {item.salePrice.toFixed(2) + '₺'}
                    </Text>
                  </View>
                  <Text
                    category="s1"
                    style={{
                      fontSize: 13,
                      textDecorationLine: 'line-through',
                      textDecorationStyle: 'solid',
                    }}>
                    {item.price.toFixed(2) + '₺'}
                  </Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        </Shadow>
      </View>
    );
  }
};

const SearchResultView = ({route, navigation}) => {
  const [menuVisible, setMenuVisible] = React.useState(false);
  const [selectedId, setSelectedId] = React.useState(null);

  /*
    React.useEffect(() => {
        navigation.navigate("ProductView", selectedId)
    }, [selectedId]);
     */
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

  const searchedText = route.params;
  let result = findSearchedProduct(searchedText);
  //console.log(result);
  if (result.length === 0) {
    return (
      <SafeAreaView style={styles.MainContainer}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          style={GlobalStyles.scrollViewContainer}>
          <Layout style={styles.container} level="1">
            <TopNavigation
              alignment="center"
              title={'"' + searchedText + '"'}
              subtitle="Arama Sonuçları"
              accessoryLeft={() => renderBackAction(navigation)}
              accessoryRight={renderRightActions}
            />
            <Text
              category="s1"
              style={{
                marginTop: 100,
                justifyContent: 'center',
                alignSelf: 'center',
              }}>
              Aradağınız Ürün Bulunamadı..
            </Text>
          </Layout>
        </ScrollView>
      </SafeAreaView>
    );
  }
  //console.log(result[0].img_reference)

  const renderItem = ({item}) => {
    //console.log(selectedId);
    return (
      <Item
        item={item}
        onPress={() => navigation.navigate('ProductView', {item})}
      />
    );
  };
  let flag = true;

  return (
    <SafeAreaView style={GlobalStyles.droidSafeArea}>
      <Layout style={styles.container} level="1">
        <TopNavigation
          alignment="center"
          title={'"' + searchedText + '"'}
          subtitle="Arama Sonuçları"
          accessoryLeft={renderBackAction}
          accessoryRight={renderRightActions}
        />
        <FlatList
          data={result.sort(function (a, b) {
            if (a.price > b.price) return 1;
            if (a.price < b.price) return -1;
            return 0;
          })}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          extraData={selectedId}
          //contentContainerStyle={styles.list}
          horizontal={false}
          numColumns={2}
          onPress={() => navigation.navigate('ProductView')}
        />
      </Layout>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  ProductContainer: {
    padding: responsiveWidth(2.5),
    alignItems: 'center',
  },
  container: {
    flex: 1,
    width: responsiveWidth(100),
  },
  shadow: {
    paddingTop: 15,
    shadowOffset: {width: 7, height: 7},
    shadowOpacity: 1,
    shadowColor: 'grey',
    shadowRadius: 10,
    borderRadius: 10,
    backgroundColor: 'white',
    height: 320,
    width: responsiveWidth(45),
    alignSelf: 'center',
  },
});

export default SearchResultView;
