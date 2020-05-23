import * as React from 'react';
import {Text,TextInput,  View} from 'react-native';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import { SearchBar } from 'react-native-elements';

import HomeScreen from './views/home';
import CategoryStackScreen from './views/category';
import CartView from './views/cart';
import ProfileView from './views/profile';

const Tab = createBottomTabNavigator();

function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Feed"
        tabBarOptions={{
          activeTintColor: '#4b5fe9',
        }}>
        <Tab.Screen
          name="Home"
          component={HomeScreen}
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
          component={CartView}
          options={{
            tabBarLabel: 'Sepet',
            tabBarIcon: ({color, size}) => (
              <Icon name="shopping-cart" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileView}
          options={{
            tabBarLabel: 'Profil',
            tabBarIcon: ({color, size}) => (
              <Icon name="user-circle" color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App;
