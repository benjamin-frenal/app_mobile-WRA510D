import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { globalStyles } from "../../assets/styles/styles";

const Random = () => {
    const [totalPokemon] = useState(1025);
    const [randomPokemonId, setRandomPokemonId] = useState(null);
    const [pokemonData, setPokemonData] = useState(null);
    const [backgroundColor, setBackgroundColor] = useState('#1F1F1F'); // Couleur de fond par défaut

    const getRandomPokemonId = () => {
        return Math.floor(Math.random() * totalPokemon) + 1;
    };

    useEffect(() => {
        if (!randomPokemonId) {
            setRandomPokemonId(getRandomPokemonId());
        }
    }, [randomPokemonId]);

    useEffect(() => {
        const fetchPokemonDetails = async () => {
            try {
                const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomPokemonId}`);
                const data = await response.json();
                setPokemonData(data);

                // Détermine la couleur de fond en fonction du premier type du Pokémon
                setBackgroundColor(determineBackgroundColor(data.types));
            } catch (error) {
                console.error('Erreur lors du chargement des détails du Pokémon :', error);
            }
        };

        if (randomPokemonId) {
            fetchPokemonDetails();
        }
    }, [randomPokemonId]);

    const determineBackgroundColor = (types) => {
        const backgroundColors = {
            grass: '#acdc74',
            poison: '#AA5599',
            fire: '#e39086',
            flying: '#92c7ea',
            fighting: '#BA5544',
            water: '#8db8ef',
            electric: '#f1cc51',
            psychic: '#FF5599',
            dragon: '#7038F8',
            dark: '#705848',
            fairy: '#EE99EE',
            bug: '#AABA23',
            rock: '#BAA23C',
            steel: '#AAAABB',
            ghost: '#7D7DC5',
            ice: '#9AD6DF',
            ground: '#E2C570',
            normal: '#AAAA99',
            default: '#1F1F1F' // Couleur par défaut
        };
        return backgroundColors[types[0]?.type?.name] || backgroundColors['default'];
    };

    return (
        <View style={[globalStyles.container, styles.container, { backgroundColor: backgroundColor }]}>
            <Text style={globalStyles.headerText}>Découvrez de nouveaux Pokémons !</Text>
            {pokemonData && (
                <View style={styles.pokemonDetails}>
                    <Image source={{ uri: pokemonData.sprites.other.home.front_default }} style={styles.pokemonImage} />
                    <Text style={styles.pokemonName}>{pokemonData.name}</Text>
                </View>
            )}
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={() => setRandomPokemonId(getRandomPokemonId())}>
                    <Text style={styles.buttonText}>Générer un Pokémon</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'black',
    },
    buttonContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        position: 'absolute',
        bottom: 20,
        backgroundColor: '#161618',
        padding: 15,
        borderRadius: 5,
        marginTop: 10,
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
    },
    pokemonDetails: {
        alignItems: 'center',
        marginTop: 50,
    },
    pokemonName: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 15,
        marginBottom: 10,
        color: 'white',
    },
    pokemonText: {
        color: 'white',
    },
    pokemonImage: {
        width: 250,
        height: 250,
        marginBottom: 10,
    },
});

export default Random;
