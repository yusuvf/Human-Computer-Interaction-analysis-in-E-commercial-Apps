import * as React from 'react';
import {View, Text} from 'react-native';

import {createStackNavigator} from '@react-navigation/stack';

const CategoryStack = createStackNavigator();

function CategoryStackScreen() {
  return (
    <CategoryStack.Navigator>
      <CategoryStack.Screen name="Kategoriler" component={CategoryView} />
    </CategoryStack.Navigator>
  );
}

function CategoryView() {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Kategoriler</Text>
    </View>
  );
}

export default CategoryStackScreen;
