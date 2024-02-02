import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {globalStyles} from '../../assets/styles/styles.js';

const MyTeam = () => {
    return (
        <View style={globalStyles.container}>
            <Text style={globalStyles.headerText}>Mon équipe</Text>
        </View>
    );
};

export default MyTeam;
