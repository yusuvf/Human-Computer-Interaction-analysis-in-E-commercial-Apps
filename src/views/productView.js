import * as React from 'react';
import { Button, SafeAreaView, View, Text } from 'react-native';

function ProductView({ route, navigation }){
    const text  = route.params;

    return(
        <SafeAreaView>
            <View>
                <Text>
                    {text}
                </Text>
            </View>
        </SafeAreaView>
    );
}

export default ProductView;
