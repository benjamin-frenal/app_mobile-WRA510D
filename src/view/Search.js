import React from 'react';
import { View, Text } from 'react-native';
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
        </View>
    );
};

export default Search;
