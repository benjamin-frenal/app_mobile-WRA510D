import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { globalStyles } from '../../assets/styles/styles';

const Settings = () => {
    const categories = [
        { title: 'Prenom', value: 'Benjamin' },
        { title: 'Nom', value: 'Frenal' },
        { title: 'Email', value: 'ben.frenal@icloud.com' },
        { title: 'Semestre', value: '5' },
        { title: 'Groupe', value: 'TP F' }
    ];

    return (
        <View style={globalStyles.container}>
            <Image source={require('../../assets/images/benji.png')} style={styles.image} />
            <Text style={styles.prenom}>Benjamin Frenal</Text>
            <View style={styles.card}>
                {categories.map((category, index) => (
                    <View key={index} style={[styles.category, index === categories.length - 1 && { borderBottomWidth: 0 }]}>
                        <Text style={styles.categorysaisie}>{category.title}</Text>
                        <Text style={styles.categorytext}>{category.value}</Text>
                    </View>
                ))}
            </View>
        </View>
    );
};

export default Settings;

const styles = StyleSheet.create({
    image: {
        marginTop: 15,
        alignSelf: 'center',
        width: 150,
        height: 150,
        borderRadius: 150,
    },
    prenom: {
        textAlign: 'center',
        fontSize: 24,
        color: '#ffffff',
        marginTop: 20,
    },
    tags: {
        textAlign: 'center',
        fontSize: 16,
        color: '#a9a9a9',
        marginTop: 10,
    },
    card: {
        marginTop: 75,
        flexDirection: 'column',
        justifyContent: 'space-between',
        width: '100%',
        backgroundColor: 'rgba(75,75,75,0.25)',
        borderRadius: 20,
        paddingHorizontal: 20,
    },
    category: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#696969',
    },
    categorysaisie: {
        fontSize: 18,
        color: '#ffffff',
    },
    categorytext: {
        fontSize: 18,
        color: '#a9a9a9',
    },
});
