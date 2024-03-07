// MyTeam.js
import React, { useEffect, useState, useCallback } from "react";
import { View, StyleSheet, Text, Image, FlatList, TouchableOpacity } from "react-native";
import axios from "axios";
import { globalStyles } from '../../assets/styles/styles.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useIsFocused } from "@react-navigation/native";

const MyTeam = () => {
    const navigation = useNavigation();
    const isFocused = useIsFocused();
    const [teamDetails, setTeamDetails] = useState([]);

    useEffect(() => {
        loadTeamDetails();
    }, []);

    const loadTeamDetails = useCallback(async () => {
        try {
            const currentTeam = await AsyncStorage.getItem('team');
            if (currentTeam !== null) {
                const teamIds = JSON.parse(currentTeam);
                const teamPromises = teamIds.map(async (pokemonId) => {
                    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
                    return response.data;
                });
                const teamData = await Promise.all(teamPromises);
                setTeamDetails(teamData);
            }
        } catch (error) {
            console.error('Erreur lors du chargement de l\'équipe Pokémon', error);
        }
    }, []);

    useEffect(() => {
        if (isFocused) {
            loadTeamDetails();
        }
    }, [isFocused, loadTeamDetails]);

    const navigateToPokemonDetail = (pokemon) => {
        navigation.navigate('PokemonDetail', { pokemon });
    };

    return (
        <View style={globalStyles.container}>
            <Text style={globalStyles.headerText}>Mon équipe Pokémon 🌟</Text>
            <FlatList
                style={styles.list}
                data={teamDetails}
                keyExtractor={(item) => item.id.toString()}
                numColumns={2}
                renderItem={({ item }) => (
                    <View style={styles.listitem}>
                        <TouchableOpacity onPress={() => navigateToPokemonDetail(item)}>
                            <Text style={styles.itemText}>{item.name}</Text>
                            <Image
                                source={{ uri: item.sprites.other.home.front_default }}
                                style={styles.pokemonImage}
                            />
                        </TouchableOpacity>
                    </View>
                )}
            />
        </View>
    );
};

const styles= StyleSheet.create({

    list: {
        marginHorizontal: 10,
        paddingTop: 25,
        marginBottom: 75,
        alignSelf: 'center',
    },
    listitem: {
        borderRadius: 10,
        padding: 20,
        backgroundColor: '#e11646',
        flexDirection: 'column',
        gap: 6,
        marginHorizontal: 10,
        marginBottom: 10,
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
});

export default MyTeam;