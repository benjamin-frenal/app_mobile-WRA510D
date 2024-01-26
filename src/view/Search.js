import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {globalStyles} from '../../assets/styles/styles.js';

const Search = () => {
    return (
        <View style={globalStyles.container}>
            <Text style={globalStyles.headerText}>Search</Text>
        </View>
    );
};

export default Search;