import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const PokemonDetail = ({ route }) => {
    const { pokemon } = route.params;

    return (
        <View style={styles.container}>
            <Text style={styles.name}>{pokemon.name}</Text>
            <View style={styles.card}>
                <Image source={{ uri: pokemon.sprites.other.home.front_default }} style={styles.image} />
                <View style={styles.infoContainer}>
                    <Text>Type: {pokemon.types[0].type.name}</Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderRadius: 10,
        backgroundColor: 'lightblue',
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    image: {
        width: 100,
        height: 100,
        marginRight: 10,
    },
    infoContainer: {
        flex: 1,
    },
});

export default PokemonDetail;
