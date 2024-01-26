import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {globalStyles} from "../../assets/styles/styles";

const Random = () => {
    return (
        <View style={globalStyles.container}>
            <Text style={globalStyles.headerText}>Random</Text>
        </View>
    );
};

export default Random;
