import * as React from 'react';
import {SafeAreaView, Alert, View} from 'react-native';
import {
  Layout,
  Text,
  Button,
  Icon,
  MenuItem,
  Menu,
    ListItem
} from '@ui-kitten/components';
import {createStackNavigator} from '@react-navigation/stack';
import OrdersView from './orders.js';
import {responsiveHeight} from 'react-native-responsive-dimensions';

const ProfileStack = createStackNavigator();

import {CartInfoContext} from "../components/CartInfoContext";

function ProfileView({navigation}) {
  const ShoppingBagIcon = (props) => (
    <Icon {...props} name="shopping-bag-outline" />
  );
  const StarIcon = (props) => <Icon {...props} name="star" />;
  const PersonIcon = (props) => <Icon {...props} name="person-outline" />;
  const InfoIcon = (props) => <Icon {...props} name="info-outline" />;

  const ForwardIcon = (props) => <Icon {...props} name="arrow-ios-forward" />;

  const MenuItemSimpleUsageShowcase = () => {
      const [value, setValue] = React.useContext(CartInfoContext);
      console.log(value);
      return(
          <View style={{flex:1, height:responsiveHeight(100), backgroundColor:'white'}}>
              <ListItem
                  style={{borderBottomWidth:0.3, borderTopWidth:0.3,borderColor:'grey'}}
                  title="Siparişlerim"
                  accessoryLeft={ShoppingBagIcon}
                  accessoryRight={ForwardIcon}
                  onPress={() =>{
                      console.log(value);
                      if(value[2].flag === true){
                          navigation.navigate("Siparişlerim")
                      }else{
                          Alert.alert(
                              "Herhangi bir siparişiniz bulunmamaktadır.",
                              " "
                                  [
                                  { text: "OK", onPress: () => console.log("OK Pressed") }
                                  ],
                              { cancelable: false }
                          )
                      }
                  }}
              />
              <ListItem
                  style={{borderBottomWidth:0.3 ,borderColor:'grey'}}
                  title="Favorilerim"
                  accessoryLeft={StarIcon}
                  accessoryRight={ForwardIcon}
                  onPress={() => Alert.alert(
                      "Favorilerinizde Ürün Bulunmamaktadır.",
                      " "
                          [
                          { text: "OK", onPress: () => console.log("OK Pressed") }
                          ],
                      { cancelable: false }
                  )}
              />
              <ListItem
                  style={{borderBottomWidth:0.3, borderColor:'grey'}}
                  title="Üyelik Bilgilerim"
                  accessoryLeft={PersonIcon}
                  accessoryRight={ForwardIcon}
              />
              <ListItem
                  style={{borderBottomWidth:0.3 ,borderColor:'grey'}}
                  title="Uygulama Hakkında"
                  accessoryLeft={InfoIcon}
                  onPress={() => Alert.alert(
                      "Bu Uygulama bir araştırma projesi kapsamında Yusuf Dönmez Tarafından geliştirilmiştir.\nTicari amaçlı geliştirilmemiştir.",
                      " "
                          [
                          { text: "OK", onPress: () => console.log("OK Pressed") }
                          ],
                      { cancelable: false }
                  )}
              />
          </View>
      );
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <MenuItemSimpleUsageShowcase />
    </SafeAreaView>
  );
}
function ProfileViewStack({navigation}) {
    return (
        <ProfileStack.Navigator>
            <ProfileStack.Screen name="Profilim" component={ProfileView} />
            <ProfileStack.Screen name="Siparişlerim" component={OrdersView} />
        </ProfileStack.Navigator>
    );
}

export default ProfileViewStack;
