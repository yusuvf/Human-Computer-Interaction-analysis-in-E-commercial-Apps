import * as React from 'react';
import {
  View,
  Text,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';

import {createStackNavigator} from '@react-navigation/stack';
import {Avatar, ListItem} from '@ui-kitten/components';
import GlobalStyles from './GlobalStyles';
import {Shadow} from 'react-native-neomorph-shadows';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {AirbnbRating} from 'react-native-ratings';

const CategoryStack = createStackNavigator();

function CategoryStackScreen() {
  return (
    <CategoryStack.Navigator>
      <CategoryStack.Screen name="Kategoriler" component={CategoryView} />
    </CategoryStack.Navigator>
  );
}

const categoryData = [
  {name: 'Elektronik'},
  {name: 'Moda'},
  {name: 'Ev ve Ofis Ürünleri'},
  {name: 'Hobi (Kitap,Film)'},
  {name: 'Kozmetik ve Kişisel Bakım'},
];

function CategoryView({route, navigation}) {
  const [selectedId, setSelectedId] = React.useState(null);

  const ElectronicImage = (props) => (
    <Avatar
      {...props}
      style={[props.style, {tintColor: null, width: 40, height: 40}]}
      source={require('../img/iphone-xr-blue.png')}
      shape={'square'}
    />
  );
  const FashionImage = (props) => (
      <Avatar
          {...props}
          style={[props.style, {tintColor: null, width: 40, height: 40}]}
          source={require('../img/sweater.webp')}
          shape={'square'}
      />
  );
  const FurnitureImage = (props) => (
      <Avatar
          {...props}
          style={[props.style, {tintColor: null, width: 40, height: 40}]}
          source={require('../img/chair.png')}
          shape={'square'}
      />
  );
  const HobbyImage = (props) => (
      <Avatar
          {...props}
          style={[props.style, {tintColor: null, width: 40, height: 40}]}
          source={require('../img/avatar-book.png')}
          shape={'square'}
      />
  );
  const CosmeticImage = (props) => (
      <Avatar
          {...props}
          style={[props.style, {tintColor: null, width: 40, height: 40}]}
          source={require('../img/nail-polish-avatar.png')}
          shape={'square'}
      />
  );
  const PetImage = (props) => (
      <Avatar
          {...props}
          style={[props.style, {tintColor: null, width: 40, height: 40}]}
          source={require('../img/cat-house-avatar.png')}
          shape={'square'}
      />
  );

  return (
    <ScrollView>
      <View style={styles.categoryContainer}>
        <ListItem
          title="Elektronik"
          description="Akıllı Telefon, Bilgisayar, TV, Beyaz Eşya ve Fazlası"
          accessoryLeft={ElectronicImage}
        />
        <ListItem
          title="Moda"
          description="Giyim, Aksesuar, Outdoor Giyim"
          accessoryLeft={FashionImage}
        />
        <ListItem
          title="Ev ve Ofis Ürünleri"
          description="Masa, Sandalye, Oturma Grubu ve Fazlası"
          accessoryLeft={FurnitureImage}
        />
        <ListItem
          title="Hobi Ürünleri"
          description="Kitap, Film, Oyun"
          accessoryLeft={HobbyImage}
        />
        <ListItem
          title="Kozmetik ve Kişisel Bakım"
          description="Makyaj Malzemeleri, Cilt Bakım Ürünleri, Parfüm"
          accessoryLeft={CosmeticImage}
        />
        <ListItem
            title="Evcil Hayvan Ürünleri"
            description="Mamalar, Evcil Hayvan Evleri ve Oyuncakları"
            accessoryLeft={PetImage}
        />
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  categoryContainer: {
    flex: 1,
  },
});

export default CategoryStackScreen;
