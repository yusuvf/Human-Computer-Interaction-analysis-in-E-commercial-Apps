import * as React from 'react';
import { Button, SafeAreaView, View, Text } from 'react-native';

function ProductView({ route, navigation }){
    const obj  = route.params;
    console.log(obj.item.price);
    return(
        <SafeAreaView>
            <View>
                <Text>
                    {obj.item.price}
                </Text>
            </View>
        </SafeAreaView>
    );
}

export default ProductView;
