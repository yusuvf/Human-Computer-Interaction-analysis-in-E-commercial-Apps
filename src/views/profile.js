import * as React from 'react';
import {SafeAreaView} from 'react-native';
import {
  Layout,
  Text,
  Button,
  Icon,
  MenuItem,
  Menu,
} from '@ui-kitten/components';
import {createStackNavigator} from '@react-navigation/stack';

const ProfileStack = createStackNavigator();

function ProfileView() {
  const ShoppingBagIcon = (props) => (
    <Icon {...props} name="shopping-bag-outline" />
  );
  const StarIcon = (props) => <Icon {...props} name="star" />;
  const PersonIcon = (props) => <Icon {...props} name="person-outline" />;
  const InfoIcon = (props) => <Icon {...props} name="info-outline" />;

  const ForwardIcon = (props) => <Icon {...props} name="arrow-ios-forward" />;

  const MenuItemSimpleUsageShowcase = () => (
    <Menu>
      <MenuItem
        title="Siparişlerim"
        accessoryLeft={ShoppingBagIcon}
        accessoryRight={ForwardIcon}
        onPress={() => console.log('sipariş')}
      />
      <MenuItem
        title="Favorilerim"
        accessoryLeft={StarIcon}
        accessoryRight={ForwardIcon}
      />
      <MenuItem
        title="Üyelik Bilgilerim"
        accessoryLeft={PersonIcon}
        accessoryRight={ForwardIcon}
      />
      <MenuItem
        title="Uygulama Hakkında"
        accessoryLeft={InfoIcon}
        accessoryRight={ForwardIcon}
      />
    </Menu>
  );

  return (
    <SafeAreaView style={{flex: 1}}>
      <MenuItemSimpleUsageShowcase />
    </SafeAreaView>
  );
}
function ProfileViewStack() {
    return (
        <ProfileStack.Navigator>
            <ProfileStack.Screen name="Profilim" component={ProfileView} />
        </ProfileStack.Navigator>
    );
}

export default ProfileViewStack;
