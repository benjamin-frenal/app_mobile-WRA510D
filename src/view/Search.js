import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import { globalStyles } from '../../assets/styles/styles.js';
import PokemonSearch from "../components/SearchComponent";

const Search = () => {
    const handleSelectPokemon = (selectedPokemon) => {
        console.log("Le Pokémon sélectionné est :", selectedPokemon);
    };

    return (
        <View style={globalStyles.container}>
            <Text style={globalStyles.headerText}>Recherche ton futur coéquipier !</Text>
            <PokemonSearch onSelectPokemon={handleSelectPokemon} />

            <Image
                source={require('../../assets/images/sacha.png')}
                style={styles.sacha}
            />
        </View>
    );
};

export default Search;

const styles = StyleSheet.create({
    sacha: {
        position: 'absolute',
        top: "auto",
        right: -10,
        zIndex: -1,
        bottom: 10,
        flex: 1,
        opacity: 0.15,
        resizeMode: 'contain',
        width: '60%',
        height: '60%',
    },
});
