import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Vibration } from 'react-native';

const PokemonDetail = ({ route }) => {
    const navigation = useNavigation();
    const { pokemon } = route.params;
    const [isInTeam, setIsInTeam] = useState(false);

    useEffect(() => {
        checkIfInTeam();
    }, []);

    const checkIfInTeam = async () => {
        try {
            const currentTeam = await AsyncStorage.getItem('team');
            if (currentTeam !== null) {
                const team = JSON.parse(currentTeam);
                setIsInTeam(team.includes(pokemon.id));
            }
        } catch (error) {
            console.error('Erreur lors de la vérification de l\'appartenance du Pokémon à l\'équipe', error);
        }
    };

    const addToTeam = async () => {
        try {
            let updatedTeam = [];
            const currentTeam = await AsyncStorage.getItem('team');
            if (currentTeam !== null) {
                updatedTeam = JSON.parse(currentTeam);
            }

            if (isInTeam) {
                // Remove the Pokémon from the team
                const index = updatedTeam.indexOf(pokemon.id);
                if (index > -1) {
                    updatedTeam.splice(index, 1);
                }
            } else {
                if (updatedTeam.length >= 6) {
                    alert("Vous avez déjà 6 Pokémon dans votre équipe. Veuillez en supprimer un avant d'en ajouter un nouveau.");
                    return;
                }

                updatedTeam.push(pokemon.id);
            }

            await AsyncStorage.setItem('team', JSON.stringify(updatedTeam));
            setIsInTeam(!isInTeam);

            // Vibrate the phone
            Vibration.vibrate(200);
        } catch (error) {
            console.error('Erreur lors de l\'ajout du Pokémon à l\'équipe', error);
        }
    };


    return (
        <View style={styles.container}>
            <View style={styles.boutons}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <AntDesign style={styles.btnRetour} name="arrowleft" size={24} color="white" />
                </TouchableOpacity>
                <TouchableOpacity onPress={addToTeam}>
                    <AntDesign
                        style={styles.btnRetour}
                        name={isInTeam ? "heart" : "hearto"}
                        size={24}
                        color={isInTeam ? "red" : "white"}
                    />
                </TouchableOpacity>
            </View>
            <Image source={{ uri: pokemon.sprites.other.home.front_default }} style={styles.image} />
            <Text style={styles.name}>{pokemon.name}</Text>
            <Text style={styles.type}>{pokemon.types[0].type.name} Pokemon</Text>
            <View style={styles.card}>
                <View style={styles.category}>
                    <Text style={styles.categorynumber}>{pokemon.weight}</Text>
                    <Text style={styles.categorytext}>Weight</Text>
                </View>
                <View style={styles.category}>
                    <Text style={styles.categorynumber}>{pokemon.height}</Text>
                    <Text style={styles.categorytext}>Height</Text>
                </View>
                <View style={styles.category}>
                    <Text style={styles.categorynumber}>{pokemon.stats[1].base_stat}</Text>
                    <Text style={styles.categorytext}>Attack</Text>
                </View>
                <View style={styles.category}>
                    <Text style={styles.categorynumber}>{pokemon.stats[0].base_stat}</Text>
                    <Text style={styles.categorytext}>Defense</Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#000000',
        paddingHorizontal: 20,
        paddingTop: 75,
        paddingBottom: 50,
    },
    boutons: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    btnRetour: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
        marginHorizontal: 20,
        marginVertical: 10,
    },
    name: {
        marginTop: 50,
        fontSize: 24,
        fontWeight: 'bold',
        textTransform: 'capitalize',
        color: '#fff',
    },
    type: {
        fontSize: 16,
        fontWeight: '600',
        textTransform: 'capitalize',
        marginTop: 10,
        color: '#909090',
    },
    card: {
        backgroundColor: 'rgba(75,75,75,0.5)',
        width: '100%',
        borderRadius: 20,
        marginTop: 120,
        padding: 20,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    category: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        rowGap: 6,
    },
    categorynumber: {
        color: '#fff',
        fontSize: 20,
        fontWeight: '600',
    },
    categorytext: {
        color: '#2ec2f6',
        fontSize: 16,
        fontWeight: '400',
    },
    image: {
        width: 300,
        height: 300,
    },
});

export default PokemonDetail;
