import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import LocationsScreen from './components/LocationScreen';
import AddLocation from './components/AddLocation';
import MapScreen from './components/MapScreen';

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={{ headerShown: false }}>
        <Tab.Screen name="Locations" component={LocationsScreen} />
        <Tab.Screen name="Add Location" component={AddLocation} />
        <Tab.Screen name="Map" component={MapScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
