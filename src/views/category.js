import * as React from 'react';
import {View, Text, ScrollView, FlatList, TouchableOpacity, Image, ActivityIndicator, StyleSheet} from 'react-native';

import {createStackNavigator} from '@react-navigation/stack';
import { Avatar, ListItem } from '@ui-kitten/components';
import GlobalStyles from './GlobalStyles';
import {Shadow} from "react-native-neomorph-shadows";
import {responsiveHeight, responsiveWidth} from 'react-native-responsive-dimensions';
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
    {name: "Elektronik"},
    {name: "Moda"},
    {name: "Ev ve Ofis Ürünleri"},
    {name: "Hobi (Kitap,Film)"},
    {name: "Kozmetik ve Kişisel Bakım"},
]


function CategoryView({ route, navigation }) {
    const [selectedId, setSelectedId] = React.useState(null);

    const ElectronicImage = (props) => (
        <Avatar
            {...props}
            style={[props.style, { tintColor: null, width:40, height:40 }]}
            source={require('../img/iphone-xr-red.png')}
        />
    );

  return (
      <View >
          <ListItem
              title='Elektronik'
              description='Akıllı Telefon, Bilgisayar, TV, Beyaz Eşya ve fazlası'
              accessoryLeft={ElectronicImage}
          />
          <ListItem
              title='Moda'
              description='A set of React Native components'
              accessoryLeft={ElectronicImage}
          />
      </View>
  );
}
const styles = StyleSheet.create({
    element :{

    }
});

export default CategoryStackScreen;
