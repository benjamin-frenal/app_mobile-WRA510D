import React, { useEffect, useState } from "react";
import { FontAwesome } from '@expo/vector-icons';
import axios from "axios";
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function PokemonSearch() {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResult, setSearchResult] = useState(null);

    const searchPokemon = async () => {
        try {
            const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${searchTerm.toLowerCase()}`);
            setSearchResult(response.data);
        } catch (error) {
            Alert.alert('Erreur', 'Le Pokémon spécifié n\'existe pas.');
        }
    };

    useEffect(() => {
        console.log(searchResult);
    }, [searchResult]);

    return (
        <View style={styles.container}>
            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Pikachu, Bulbasaur..."
                    placeholderTextColor="gray"
                    value={searchTerm}
                    onChangeText={setSearchTerm}
                />
                <TouchableOpacity onPress={() => {
                    searchTerm !== '' ? searchPokemon() : Alert.alert('Hé, Dresseur !', 'Veuillez entrer un nom de Pokémon.');
                }} style={styles.searchIcon}>
                    <FontAwesome name="search" size={18} color="gray" />
                </TouchableOpacity>
            </View>
            {searchResult && (
                <View style={styles.searchResultContainer}>
                    <Text style={styles.itemText}>{searchResult.name}</Text>
                    <Text style={styles.itemCategorie}>Poids: {searchResult.weight}</Text>
                    <Text style={styles.itemCategorie}>Taille: {searchResult.height}</Text>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        marginHorizontal: 10,
    },
    input: {
        flex: 1,
        borderWidth: 1,
        backgroundColor: '#161618',
        color: '#fff',
        borderRadius: 15,
        padding: 12,
    },
    searchResultContainer: {
        marginHorizontal: 10,
        padding: 10,
        backgroundColor: '#eee',
        borderRadius: 5,
        marginBottom: 10,
    },
    itemText: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    itemCategorie: {
        fontSize: 14,
    },
    searchIcon: {
        position: 'absolute',
        top: 12,
        right: 20,
    }
});