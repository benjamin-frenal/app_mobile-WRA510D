import { Camera } from 'expo-camera';
import { useState, useEffect } from 'react';
import { Button, StyleSheet, Text, Image, Linking, TouchableOpacity, View, Alert } from 'react-native';
import { globalStyles } from "../../assets/styles/styles";
import { AntDesign } from '@expo/vector-icons';
import * as MediaLibrary from 'expo-media-library';

export default function CameraPage({ navigation }) {
    const [type, setType] = useState(Camera.Constants.Type.back);
    const [cameraRef, setCameraRef] = useState(null);
    const [hasPermission, setHasPermission] = useState(null);
    const requestPermission = async () => {
        const { status } = await Camera.requestCameraPermissionsAsync();
        setHasPermission(status === 'granted');
    }
    const handleOpenSettings = () => {
        Linking.openSettings();
    };

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    if (hasPermission === null) {
        return <View />;
    }
    if (hasPermission === false) {
        return (
            <View style={[globalStyles.container, styles.grantedcontainer]}>
                <Text style={styles.grantedtext}>Les Pokémons ont besoin de vous pour les rendre visibles</Text>
                <Button onPress={requestPermission} title="Activer la caméra" />
                <TouchableOpacity onPress={handleOpenSettings}>
                    <Text style={styles.settingsText}>Ouvrir les paramètres de l'application</Text>
                </TouchableOpacity>
            </View>
        );
    }

    const takePicture = async () => {
        if (cameraRef) {
            try {
                const { uri } = await cameraRef.takePictureAsync();
                await MediaLibrary.requestPermissionsAsync();
                await MediaLibrary.saveToLibraryAsync(uri);
                Alert.alert('Photo enregistrée', 'La photo a été enregistrée dans votre pellicule.');
            } catch (error) {
                console.error('Erreur lors de la prise de la photo:', error);
            }
        }
    };

    const toggleCameraType = () => {
        setType(
            type === Camera.Constants.Type.back
                ? Camera.Constants.Type.front
                : Camera.Constants.Type.back
        );
    };

    return (
        <View style={styles.container}>
            <Camera
                ref={ref => {
                    setCameraRef(ref);
                }}
                style={styles.camera}
                type={type}
            >
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <AntDesign name="arrowleft" size={24} color="white" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.flipButton} onPress={toggleCameraType}>
                    <AntDesign name="camera" size={24} color="white" />
                </TouchableOpacity>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.captureButton} onPress={takePicture}>
                        <AntDesign name="camerao" size={24} color="white" />
                    </TouchableOpacity>
                </View>
                <Image
                    source={require('../../assets/images/pokesnap.png')}
                    style={styles.overlayImage}
                />
            </Camera>
        </View>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    grantedcontainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    grantedtext: {
        textAlign: 'center',
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
    },
    settingsText: {
        color: 'gray',
        fontStyle: 'italic',
        fontSize: 14,
        marginTop: 20,
    },
    camera: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    backButton: {
        position: 'absolute',
        top: 80,
        left: 20,
        zIndex: 1,
    },
    flipButton: {
        position: 'absolute',
        top: 80,
        right: 20,
        zIndex: 1,
    },
    overlayImage: {
        position: 'absolute',
        bottom: 100,
        right: 50,
        width: 100,
        height: 100,
        zIndex: 1,
    },
    buttonContainer: {
        flexDirection: 'row',
        marginBottom: 20,
    },
    button: {
        alignSelf: 'center',
        marginHorizontal: 20,
    },
    captureButton: {
        backgroundColor: '#fff',
        borderRadius: 50,
        padding: 15,
        marginBottom: 20,
    },
});
