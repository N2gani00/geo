import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';

// Import Screens
import LocationsScreen from './components/LocationScreen';
import AddLocationScreen from './components/AddLocation';
import MapScreen from './components/MapScreen';
import CapitalsScreen from './components/CapitalScreen';

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={{ headerShown: false }}>
        <Tab.Screen name="Locations" component={LocationsScreen} />
        <Tab.Screen name="Add Location" component={AddLocationScreen} />
        <Tab.Screen name="Map" component={MapScreen} />
        <Tab.Screen name="Capitals" component={CapitalsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
