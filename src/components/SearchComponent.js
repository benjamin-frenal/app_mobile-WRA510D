import React, { useState } from "react";
import { FontAwesome } from '@expo/vector-icons';
import axios from "axios";
import { Alert, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function PokemonSearch({ onSelectPokemon }) {
    const navigation = useNavigation();
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

    const navigateToPokemonDetail = () => {
        if (searchResult) {
            onSelectPokemon(searchResult);
            navigation.navigate('PokemonDetail', { pokemon: searchResult });
        }
    };

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
                {searchTerm !== '' && (
                    <TouchableOpacity onPress={() => setSearchTerm('')} style={styles.closeIcon}>
                        <FontAwesome name="times" size={18} color="gray" />
                    </TouchableOpacity>
                )}
                <TouchableOpacity onPress={() => {
                    searchTerm !== '' ? searchPokemon() : Alert.alert('Hé, Dresseur !', 'Veuillez entrer un nom de Pokémon.');
                }} style={styles.searchIcon}>
                    <FontAwesome name="search" size={18} color="gray" />
                </TouchableOpacity>
            </View>
            {searchResult && (
                <TouchableOpacity onPress={navigateToPokemonDetail}>
                    <View style={styles.searchResultContainer}>
                        <View style={styles.searchResultLeft}>
                            <Text style={styles.itemText}>{searchResult.name}</Text>
                            <Text style={styles.itemCategorie}>Poids: {searchResult.weight}</Text>
                            <Text style={styles.itemCategorie}>Taille: {searchResult.height}</Text>
                        </View>
                        <Image source={{ uri: searchResult.sprites.other.home.front_default }} style={styles.pokemonImage} />

                        <TouchableOpacity onPress={() => setSearchResult(null)} style={styles.closeResultIcon}>
                            <FontAwesome name="times" size={18} color="gray" />
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 10,
    },
    searchContainer: {
        position: 'relative',
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
        paddingHorizontal: 10,
        paddingVertical: 10,
        backgroundColor: '#eee',
        borderRadius: 5,
        marginBottom: 10,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    itemText: {
        fontWeight: 'bold',
        fontSize: 16,
        textTransform: "capitalize",
        marginBottom: 15,
    },
    itemCategorie: {
        fontSize: 14,
    },
    searchIcon: {
        position: 'absolute',
        top: 12,
        right: 20,
    },
    closeIcon: {
        position: 'absolute',
        top: 12,
        right: 50,
    },
    closeResultIcon: {
        position: 'absolute',
        paddingVertical: 10,
        paddingHorizontal: 10,
        top: 0,
        right: 0,
    },
    pokemonImage: {
        flex: "none",
        width: 100,
        height: 100,
        marginTop: 10,
    },
});
