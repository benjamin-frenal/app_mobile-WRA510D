import React, { useEffect, useState } from "react";
import { ScrollView, View, StyleSheet, FlatList, Text, Image } from "react-native";
import axios from "axios";
import {globalStyles} from '../../assets/styles/styles.js';

const ListShiny = () => {
    const [listPokemon, setListPokemon] = useState([]);
    const [nextPage, setNextPage] = useState("https://pokeapi.co/api/v2/pokemon");

    useEffect(() => {
        loadPokemons(nextPage);
    }, []);

    const loadPokemons = async (url) => {
        try {
            const response = await axios.get(url);
            const { results, next } = response.data;

            const pokemonDetailsPromises = results.map(async (pokemon) => {
                const detailResponse = await axios.get(pokemon.url);
                return detailResponse.data;
            });

            const pokemonDetails = await Promise.all(pokemonDetailsPromises);

            setListPokemon((prevList) => [...prevList, ...pokemonDetails]);
            setNextPage(next);
        } catch (error) {
            console.error('Erreur lors du chargement des pokémons', error);
        }
    };

    return (
        <ScrollView style={styles.scrollcontainer}>
            <View style={globalStyles.container}>
                <Text style={globalStyles.headerText}>Liste Shinys ✨</Text>
                <Image
                    source={{ uri: listPokemon[3]?.sprites.other['official-artwork'].front_shiny }}
                    style={styles.pokemonbigImage}
                />
                <Text style={styles.h2}>Qu'est-ce qu'un shinny ? 🔮</Text>
                <Text style={styles.description}>
                    Chaque espèce de Pokémon possède une unique forme chromatique caractérisée par une couleur inhabituelle. Un son cristallin accompagné d'étoiles signale l'apparition d'un chromatique.
                </Text>
                <Text style={styles.h2}>Découvrez-les ! ⭐️</Text>
                <View>
                    <FlatList
                        style={styles.list}
                        data={listPokemon}
                        horizontal={true}
                        keyExtractor={(item) => item.name}
                        renderItem={({ item }) => (
                            <View style={styles.listItemContainer}>
                                <View style={styles.listitem}>
                                    <Text style={styles.itemText}>{item.name}</Text>
                                    <Image source={{ uri: item.sprites.other.home.front_shiny }} style={styles.pokemonImage} />
                                </View>
                            </View>
                        )}
                        numColumns={1}
                        onEndReached={() => {
                            if (nextPage) {
                                loadPokemons(nextPage);
                            }
                        }}
                        onEndReachedThreshold={0.1}
                    />
                </View>
            </View>
        </ScrollView>
    );
};

export default ListShiny;
const styles = StyleSheet.create({
    scrollcontainer: {
        backgroundColor: '#000000',
    },
    h2: {
        color: '#fff',
        fontSize: 26,
        fontWeight: '600',
        marginBottom: 20,
        textAlign: 'center',
    },
    description: {
      color: '#fff',
        fontSize: 18,
        fontWeight: '400',
        marginBottom: 20,
        textAlign: 'center',
    },
    rectangleContainer: {
        flexDirection: 'row',
        gap: 10,
        marginBottom: 10,
        marginHorizontal: 10,
    },
    rectangle: {
        position: 'relative',
        width: '50%',
        flex: 1,
        height: 100,
        backgroundColor: '#F7786A',
        borderRadius: 10,
    },
    rectangleText: {
        color: '#fff',
        fontSize: 20,
        fontWeight: '600',
        marginTop: 60,
        marginLeft: 20,
    },
    list: {
        marginHorizontal: 10,
        marginBottom: 50,
    },
    listitem: {
        borderRadius: 10,
        padding: 20,
        backgroundColor: '#d7aa1b',
        marginRight: 10,
        marginBottom: 10,
        flexDirection: 'column',
        gap: 6,
        maxWidth: 180,
    },
    pokemonImage: {
        width: 120,
        height: 120,
        resizeMode: 'contain',
    },
    pokemonbigImage: {
        width: "100%",
        height: 300,
        resizeMode: 'contain',
        alignSelf: 'center',
        padding: 20,
        borderRadius: 10,
        marginBottom: 20,
    },
    itemText: {
        fontSize: 20,
        fontWeight: '600',
        color: '#fff',
        textAlign: 'center',
        textTransform: 'capitalize',
    },
});
