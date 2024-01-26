import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Home from '../view/Home';
import Search from '../view/Search';
import MyTeam from '../view/MyTeam';
import Random from '../view/Random';
import Settings from '../view/Settings';

const Tab = createBottomTabNavigator();

const Navigation = () => (
    <NavigationContainer>
        <Tab.Navigator
            screenOptions={({ route }) => ({
                //headerShown: false,
                tabBarStyle: {
                    backgroundColor: '#161618',
                    borderTopWidth: 0,
                },
            })}
        >
            <Tab.Screen name="Home" component={Home} />
            <Tab.Screen name="Search" component={Search} />
            <Tab.Screen name="MyTeam" component={MyTeam} />
            <Tab.Screen name="Random" component={Random} />
            <Tab.Screen name="Settings" component={Settings} />
        </Tab.Navigator>
    </NavigationContainer>
);

export default Navigation;