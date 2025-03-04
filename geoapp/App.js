import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import LocationsScreen from './components/LocationScreen';
import AddLocation from './components/AddLocation';
import MapScreen from './components/MapScreen';
import Icon from 'react-native-vector-icons/Ionicons';  // Import Icon from react-native-vector-icons

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={{ headerShown: false }}>
        <Tab.Screen
          name="Locations"
          component={LocationsScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Icon name="location-sharp" size={size} color={color} /> // Use Ionicons for Android
            ),
          }}
        />
        <Tab.Screen
          name="Add Location"
          component={AddLocation}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Icon name="add-circle" size={size} color={color} /> // Ionicon name for Add Location
            ),
          }}
        />
        <Tab.Screen
          name="Map"
          component={MapScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Icon name="map" size={size} color={color} /> // Icon name for Map
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
