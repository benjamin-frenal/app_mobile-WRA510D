import React, { useEffect, useState } from "react";
import { View, StyleSheet, FlatList, Text, Image} from "react-native";
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
        switch (types[0].type.name) {
            case 'grass':
                return styles.grassBackground;
            case 'poison':
                return styles.poisonBackground;
            case 'fire':
                return styles.fireBackground;
            case 'flying':
                return styles.flyingBackground;
            case 'water':
                return styles.waterBackground;
            case 'electric':
                return styles.electricBackground;
            default:
                return styles.defaultBackground;
        }
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
            <FlatList
                style={styles.list}
                data={listPokemon}
                horizontal={true}
                keyExtractor={(item) => item.name}
                renderItem={({ item }) => (
                    <View style={[styles.listitem, determineBackgroundColor(item.types)]}>
                        <Text style={styles.itemText}>{item.name}</Text>
                        <Text style={styles.itemCategorie}>Poids: {item.weight}</Text>
                        <Text style={styles.itemCategorie}>Taille: {item.height}</Text>
                        <Text style={styles.itemTypes}>
                            Types: </Text><Text>{item.types.map((type, index) => {
                        let typeStyle;
                        switch (type.type.name) {
                            case 'grass':
                                typeStyle = styles.grassType;
                                break;
                            case 'poison':
                                typeStyle = styles.poisonType;
                                break;
                            case 'fire':
                                typeStyle = styles.fireType;
                                break;
                            case 'flying':
                                typeStyle = styles.flyingType;
                                break;
                            case 'water':
                                typeStyle = styles.waterType;
                                break;
                            case 'electric':
                                typeStyle = styles.electricType;
                                break;
                            default:
                                typeStyle = styles.defaultType;
                        }
                        const isLastType = index === item.types.length - 1;
                        const comma = isLastType ? '' : ', ';
                        return (
                            <React.Fragment key={type.type.name}>
                                <Text style={typeStyle}>{type.type.name}</Text>
                                {comma}
                            </React.Fragment>
                        );
                    })}
                    </Text>
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
    );
}

const styles = StyleSheet.create({
    rectangleContainer: {
        flexDirection: 'row',
        columnGap: 10,
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
        top: "auto",
        right: -10,
        bottom: 10,
        position: 'absolute',
        flex: 1,
        resizeMode: 'contain',
        width: '50%',
        height: '50%',
    },
    list: {
        marginLeft: 10,
        marginRight: 10,
    },
    listitem: {
        borderRadius: 10,
        padding: 20,
        marginRight: 10,
        marginBottom: 10,
        display: 'flex',
        flexDirection: 'column',
        rowGap: 6,
        maxWidth: 180,
        maxHeight: 200,
    },
    itemText: {
        fontSize: 20,
        fontWeight: '600',
        color: '#fff',
        textTransform: 'capitalize',
    },
    itemCategorie: {
        color: '#3D4146',
        textTransform: 'capitalize',
    },
    grassBackground: {
        backgroundColor: '#C7EF99',
    },
    poisonBackground: {
        backgroundColor: '#D08DD9',
    },
    fireBackground: {
        backgroundColor: '#FAD0C3',
    },
    flyingBackground: {
        backgroundColor: '#B4E1FF',
    },
    waterBackground: {
        backgroundColor: '#A3CBFF',
    },
    electricBackground: {
        backgroundColor: '#FFEE93',
    },
    defaultBackground: {
        backgroundColor: '#1F1F1F',
    },
    grassType: {
        color: '#3CA225',
    },
    poisonType: {
        color: '#913FCB',
    },
    fireType: {
        color: '#E72224',
    },
    flyingType: {
        color: '#81BAF0',
    },
    waterType: {
        color: '#2581EF',
    },
    electricType: {
        color: '#F9C200',
    },
    defaultType: {
        color: '#9EA19F',
    },
});