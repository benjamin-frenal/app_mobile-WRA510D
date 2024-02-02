import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {globalStyles} from '../../assets/styles/styles.js';
import PokemonSearch from "../components/SearchComponent";

const Search = () => {
    return (
        <View style={globalStyles.container}>
            <Text style={globalStyles.headerText}>Recherche ton futur coéquipier !</Text>
            <PokemonSearch />
        </View>
    );
};

export default Search;