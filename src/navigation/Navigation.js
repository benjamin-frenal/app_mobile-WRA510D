import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';

import Home from '../view/Home';
import Search from '../view/Search';
import MyTeam from '../view/MyTeam';
import Random from '../view/Random';
import Settings from '../view/Settings';
import CameraPage from '../view/CameraPage';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const MainNavigation = () => (
    <Tab.Navigator
        screenOptions={({ route }) => ({
            tabBarStyle: {
                backgroundColor: '#161618',
                borderTopWidth: 0,
            },
            tabBarActiveTintColor: '#F7786A',
            tabBarInactiveTintColor: 'gray',
            headerShown: false,
            tabBarIcon: ({ focused, color, size }) => {
                let iconName;

                if (route.name === 'Accueil') {
                    iconName = focused ? 'home' : 'home';
                } else if (route.name === 'Recherche') {
                    iconName = focused ? 'search' : 'search';
                } else if (route.name === 'Ma Team') {
                    iconName = focused ? 'users' : 'users';
                } else if (route.name === 'Aléatoire') {
                    iconName = focused ? 'random' : 'random';
                } else if (route.name === 'Paramètres') {
                    iconName = focused ? 'cogs' : 'cogs';
                }

                return <Icon name={iconName} size={size} color={color} />;
            },
        })}
    >
        <Tab.Screen name="Accueil" component={Home} />
        <Tab.Screen name="Recherche" component={Search} />
        <Tab.Screen name="Ma Team" component={MyTeam} />
        <Tab.Screen name="Aléatoire" component={Random} />
        <Tab.Screen name="Paramètres" component={Settings} />
    </Tab.Navigator>
);

const App = () => (
    <NavigationContainer>
        <Stack.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
            })}
        >
            <Stack.Screen name="Main" component={MainNavigation} />
            <Stack.Screen name="CameraPage" component={CameraPage} />
        </Stack.Navigator>
    </NavigationContainer>
);

export default App;