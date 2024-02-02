import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {globalStyles} from "../../assets/styles/styles";

const Settings = () => {
    return (
        <View style={globalStyles.container}>
            <Text style={globalStyles.headerText}>Un changement Dresseur ?</Text>
        </View>
    );
};

export default Settings;
