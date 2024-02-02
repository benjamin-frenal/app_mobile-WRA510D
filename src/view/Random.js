import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { globalStyles } from "../../assets/styles/styles";

const Random = () => {
    const [totalPokemon] = useState(1025);
    const [randomPokemonId, setRandomPokemonId] = useState(null);
    const [pokemonData, setPokemonData] = useState(null);

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
            } catch (error) {
                console.error('Error fetching pokemon details:', error);
            }
        };

        if (randomPokemonId) {
            fetchPokemonDetails();
        }
    }, [randomPokemonId]);

    return (
        <View style={[globalStyles.container, styles.container]}>
            <Text style={globalStyles.headerText}>Découvrez de nouveaux Pokémons !</Text>
            <TouchableOpacity style={styles.button} onPress={() => setRandomPokemonId(getRandomPokemonId())}>
                <Text style={styles.buttonText}>Nouveau Pokémon</Text>
            </TouchableOpacity>
            {pokemonData && (
                <View style={styles.pokemonDetails}>
                    <Text style={styles.pokemonName}>{pokemonData.name}</Text>
                    <Image source={{ uri: pokemonData.sprites.front_default }} style={styles.pokemonImage} />
                    <Text style={styles.pokemonText}>Type: {pokemonData.types.map(type => type.type.name).join(', ')}</Text>
                    <Text style={styles.pokemonText}>Poids: {pokemonData.weight}</Text>
                    <Text style={styles.pokemonText}>Taille: {pokemonData.height}</Text>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'black',
    },
    button: {
        backgroundColor: 'blue',
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
    },
    pokemonDetails: {
        alignItems: 'center',
        marginTop: 20,
    },
    pokemonName: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        color: 'white',
    },
    pokemonText: {
        color: 'white',
    },
    pokemonImage: {
        width: 200,
        height: 200,
        marginBottom: 10,
    },
});

export default Random;
