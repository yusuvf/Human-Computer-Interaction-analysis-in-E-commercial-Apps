import * as React from 'react';
import {
    ActivityIndicator,
    Button,
    Image,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    View,
} from 'react-native';
import {
    Text,
    Drawer,
    DrawerGroup,
    DrawerItem,
    Icon, Layout, TopNavigation, TopNavigationAction, OverflowMenu, MenuItem,
} from '@ui-kitten/components';
import GlobalStyles from './GlobalStyles';
import {responsiveHeight, responsiveWidth} from 'react-native-responsive-dimensions';
import {SliderBox} from 'react-native-image-slider-box';

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

  return (
    <SafeAreaView>
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false} >
          <Layout style={styles.ProductSliderContainer} level="1">
              <TopNavigation
                  alignment="center"
                  accessoryLeft={() => renderBackAction(navigation)}
                  accessoryRight={renderRightActions}
              />
              <View style={styles.ProductSlider}>
                  <SliderBox
                      images={product.item.img_url}
                      sliderBoxHeight={300}
                      parentWidth={responsiveWidth(90)}
                  />
              </View>
          </Layout>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles= StyleSheet.create({
    ProductSlider: {
        width: responsiveWidth(90),
        height: 300,
        borderRadius: 12,
        alignSelf:'center'
    },
    ProductSliderContainer:{
        flex:1,
        height: responsiveHeight(100)
    }
});


export default ProductView;
