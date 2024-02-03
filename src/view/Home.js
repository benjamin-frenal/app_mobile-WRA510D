import React, { useEffect, useState } from "react";
import { View, StyleSheet, FlatList, Text, Image } from "react-native";
import axios from "axios";
import { globalStyles } from "../../assets/styles/styles";
import PokemonSearch from "../components/SearchComponent";

export default function Home() {
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

    const determineBackgroundColor = (types) => {
        const backgroundColors = {
            grass: styles.grassBackground,
            poison: styles.poisonBackground,
            fire: styles.fireBackground,
            flying: styles.flyingBackground,
            fighting: styles.fightingBackground,
            water: styles.waterBackground,
            electric: styles.electricBackground,
            psychic: styles.psychicBackground,
            dragon: styles.dragonBackground,
            dark: styles.darkBackground,
            fairy: styles.fairyBackground,
            bug: styles.bugBackground,
            rock: styles.rockBackground,
            steel: styles.steelBackground,
            ghost: styles.ghostBackground,
            ice: styles.iceBackground,
            ground: styles.groundBackground,
            normal: styles.normalBackground,
            default: styles.defaultBackground
        };
        return backgroundColors[types[0]?.type?.name] || styles.defaultBackground;
    };

    return (
        <View style={globalStyles.container}>
            <Text style={globalStyles.headerText}>Explorez le monde des Pokémon !</Text>
            <PokemonSearch />
            <View style={styles.rectangleContainer}>
                <View style={styles.rectangle}>
                    <Text style={styles.rectangleText}>Ma Team</Text>
                    <Image
                        source={require('../../assets/images/users.png')}
                        style={styles.backgroundImage}
                    />
                </View>
                <View style={[styles.rectangle, styles.tworectangle]}>
                    <Text style={styles.rectangleText}>Aléatoire</Text>
                    <Image
                        source={require('../../assets/images/pokefond.png')}
                        style={styles.backgroundImage}
                    />
                </View>
            </View>
            <View>
                <Text style={styles.categorieText}>État sauvage</Text>
                <FlatList
                    style={styles.list}
                    data={listPokemon}
                    horizontal={true}
                    keyExtractor={(item) => item.name}
                    renderItem={({ item }) => (
                        <View style={styles.listItemContainer}>
                            <View style={[styles.listitem, determineBackgroundColor(item.types)]}>
                                <Text style={styles.itemText}>{item.name}</Text>
                                <Image source={{ uri: item.sprites.other.home.front_default }} style={styles.pokemonImage} />
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
    );
}

const styles = StyleSheet.create({
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
    tworectangle: {
        backgroundColor: '#5CBE62',
    },
    backgroundImage: {
        position: 'absolute',
        top: "auto",
        right: -10,
        bottom: 10,
        flex: 1,
        resizeMode: 'contain',
        width: '50%',
        height: '50%',
    },
    categorieText: {
        marginTop: 20,
        marginBottom: 10,
        color: '#fff',
        fontSize: 20,
        fontWeight: '600',
        marginLeft: 10,
    },
    list: {
        marginHorizontal: 10,
    },
    listitem: {
        borderRadius: 10,
        padding: 20,
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
    itemText: {
        fontSize: 20,
        fontWeight: '600',
        color: '#fff',
        textAlign: 'center',
        textTransform: 'capitalize',
    },
    grassBackground: {
        backgroundColor: '#acdc74',
    },
    poisonBackground: {
        backgroundColor: '#AA5599',
    },
    fireBackground: {
        backgroundColor: '#e39086',
    },
    flyingBackground: {
        backgroundColor: '#92c7ea',
    },
    waterBackground: {
        backgroundColor: '#8db8ef',
    },
    electricBackground: {
        backgroundColor: '#f1cc51',
    },
    psychicBackground: {
        backgroundColor: '#FF5599',
    },
    ghostBackground: {
        backgroundColor: '#7D7DC5',
    },
    fairyBackground: {
        backgroundColor: '#EE99EE',
    },
    bugBackground: {
        backgroundColor: '#AABA23',
    },
    darkBackground: {
        backgroundColor: '#705848',
    },
    steelBackground: {
        backgroundColor: '#AAAABB',
    },
    groundBackground: {
        backgroundColor: '#E2C570',
    },
    fightingBackground: {
        backgroundColor: '#BA5544',
    },
    rockBackground: {
        backgroundColor: '#BAA23C',
    },
    iceBackground: {
        backgroundColor: '#9AD6DF',
    },
    dragonBackground: {
        backgroundColor: '#7038F8',
    },
    normalBackground: {
        backgroundColor: '#AAAA99',
    },
    defaultBackground: {
        backgroundColor: '#1F1F1F',
    },
    pcContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    itemType: {
        fontSize: 14,
        fontWeight: '400',
        color: '#fff',
        textAlign: 'center',
        textTransform: 'capitalize',
        marginTop: 4,
    },
    listItemContainer: {
        marginBottom: 10,
    },
});