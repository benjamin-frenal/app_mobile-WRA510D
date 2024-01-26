import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';

import Home from '../view/Home';
import Search from '../view/Search';
import MyTeam from '../view/MyTeam';
import Random from '../view/Random';
import Settings from '../view/Settings';

const Tab = createBottomTabNavigator();

const Navigation = () => (
    <NavigationContainer>
        <Tab.Navigator
            tabBarOptions={{
                activeTintColor: 'red',
                inactiveTintColor: 'gray'
            }}
            screenOptions={({ route }) => ({
                tabBarStyle: {
                    backgroundColor: '#161618',
                    borderTopWidth: 0,
                },
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
    </NavigationContainer>
);

export default Navigation;