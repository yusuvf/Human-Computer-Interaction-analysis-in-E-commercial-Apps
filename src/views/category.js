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

import CategoryResult from './CategoryListView';

const CategoryStack = createStackNavigator();

function CategoryStackScreen({route, navigation}) {
  return (
    <CategoryStack.Navigator>
      <CategoryStack.Screen name="Kategoriler" component={CategoryView} />
      <CategoryStack.Screen name="Elektronik" component={CategoryResult} />
      <CategoryStack.Screen name="Moda" component={CategoryResult} />
      <CategoryStack.Screen name="Ev ve Ofis Ürünleri" component={CategoryResult} />
      <CategoryStack.Screen name="Hobi Ürünleri" component={CategoryResult} />
      <CategoryStack.Screen name="Kozmetik ve Kişisel Bakım" component={CategoryResult} />
      <CategoryStack.Screen name="Evcil Hayvan Ürünleri" component={CategoryResult} />
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
      source={{uri:"https://raw.githubusercontent.com/donmezyusuf/GraduationProject/main/src/img/iphone-xr-blue.png"}}
      shape={'square'}
    />
  );
  const FashionImage = (props) => (
      <Avatar
          {...props}
          style={[props.style, {tintColor: null, width: 40, height: 40}]}
          source={{uri:"https://raw.githubusercontent.com/donmezyusuf/GraduationProject/main/src/img/sweater.webp"}}
          shape={'square'}
      />
  );
  const FurnitureImage = (props) => (
      <Avatar
          {...props}
          style={[props.style, {tintColor: null, width: 40, height: 40}]}
          source={{uri:"https://raw.githubusercontent.com/donmezyusuf/GraduationProject/main/src/img/chair.png"}}
          shape={'square'}
      />
  );
  const HobbyImage = (props) => (
      <Avatar
          {...props}
          style={[props.style, {tintColor: null, width: 40, height: 40}]}
          source={{uri:"https://raw.githubusercontent.com/donmezyusuf/GraduationProject/main/src/img/avatar-book.png"}}
          shape={'square'}
      />
  );
  const CosmeticImage = (props) => (
      <Avatar
          {...props}
          style={[props.style, {tintColor: null, width: 40, height: 40}]}
          source={{uri:"https://raw.githubusercontent.com/donmezyusuf/GraduationProject/main/src/img/nail-polish-avatar.png"}}
          shape={'square'}
      />
  );
  const PetImage = (props) => (
      <Avatar
          {...props}
          style={[props.style, {tintColor: null, width: 40, height: 40}]}
          source={{uri:"https://raw.githubusercontent.com/donmezyusuf/GraduationProject/main/src/img/cat-house-avatar.png"}}
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
          onPress={() => navigation.navigate('Elektronik',"Elektronik") }
        />
        <ListItem
          title="Moda"
          description="Giyim, Aksesuar, Outdoor Giyim"
          accessoryLeft={FashionImage}
          onPress={() => navigation.navigate('Moda',"Moda") }
        />
        <ListItem
          title="Ev ve Ofis Ürünleri"
          description="Masa, Sandalye, Oturma Grubu ve Fazlası"
          accessoryLeft={FurnitureImage}
          onPress={() => navigation.navigate('Ev ve Ofis Ürünleri','Ev ve Ofis Ürünleri') }
        />
        <ListItem
          title="Hobi Ürünleri"
          description="Kitap, Film, Oyun"
          accessoryLeft={HobbyImage}
          onPress={() => navigation.navigate('Hobi Ürünleri','Hobi Ürünleri') }
        />
        <ListItem
          title="Kozmetik ve Kişisel Bakım"
          description="Makyaj Malzemeleri, Cilt Bakım Ürünleri, Parfüm"
          accessoryLeft={CosmeticImage}
          onPress={() => navigation.navigate('Kozmetik ve Kişisel Bakım','Kozmetik ve Kişisel Bakım') }
        />
        <ListItem
            title="Evcil Hayvan Ürünleri"
            description="Mamalar, Evcil Hayvan Evleri ve Oyuncakları"
            accessoryLeft={PetImage}
            onPress={() => navigation.navigate('Evcil Hayvan Ürünleri','Evcil Hayvan Ürünleri') }
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
