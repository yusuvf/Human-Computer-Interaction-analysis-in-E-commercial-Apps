import * as React from 'react';
import { Button, SafeAreaView, View, Text } from 'react-native';


function SearchResultView({ route, navigation }){

    const searchedText  = route.params;
    return(
        <SafeAreaView>
            <Text>
                {searchedText}
            </Text>
        </SafeAreaView>
    );
}


export default SearchResultView;
