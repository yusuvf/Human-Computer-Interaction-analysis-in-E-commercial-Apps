import * as React from 'react';
import {TextInput, View,Dimensions} from 'react-native';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';

import HomeView from './views/home';
import CategoryStackScreen from './views/category';
import CartViewStack from './views/cart';
import ProfileViewStack from './views/profile';

import {EvaIconsPack} from '@ui-kitten/eva-icons';
import * as eva from '@eva-design/eva';
import {
  ApplicationProvider,
  Layout,
  Text,
  IconRegistry,
} from '@ui-kitten/components';
import {default as theme} from './theme.json';
import SearchResultView from './views/searchResultView';

import ProductView from './views/productView';
import {CartInfoContext} from './components/CartInfoContext';

const Tab = createBottomTabNavigator();

function App() {
  const [value, setValue] = React.useState([{count: 0}, []]);
    console.log(Dimensions.get('window').width);
  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={{...eva.light, ...theme}}>
        <CartInfoContext.Provider value={[value, setValue]}>
          <NavigationContainer>
            <Tab.Navigator
              initialRouteName="Home"
              tabBarOptions={{
                activeTintColor: '#4b5fe9',
                style: {backgroundColor: '#F5F5F4'},
              }}>
              <Tab.Screen
                name="Home"
                component={HomeView}
                options={{
                  tabBarLabel: 'Ana Sayfa',
                  tabBarIcon: ({color, size}) => (
                    <Icon name="home" color={color} size={size} />
                  ),
                }}
              />
              <Tab.Screen
                name="Category"
                component={CategoryStackScreen}
                options={{
                  tabBarLabel: 'Kategoriler',
                  tabBarIcon: ({color, size}) => (
                    <Icon name="bars" color={color} size={size} />
                  ),
                }}
              />
              <Tab.Screen
                name="Cart"
                component={CartViewStack}
                options={{
                  tabBarBadge: value[0].count <= 0 ? null : value[0].count,
                  tabBarLabel: 'Sepet',
                  tabBarIcon: ({color, size}) => (
                    <Icon name="shopping-cart" color={color} size={size} />
                  ),
                }}
              />
              <Tab.Screen
                name="Profile"
                component={ProfileViewStack}
                options={{
                  tabBarLabel: 'Profil',
                  tabBarIcon: ({color, size}) => (
                    <Icon name="user-circle" color={color} size={size} />
                  ),
                }}
              />
            </Tab.Navigator>
          </NavigationContainer>
        </CartInfoContext.Provider>
      </ApplicationProvider>
    </>
  );
}

export default App;
