import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';
import { saveLocation, getLocations, clearLocations } from './async/storage';  // Updated import path

export default function App() {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    loadLocations();
  }, []);

  const loadLocations = async () => {
    const savedLocations = await getLocations();
    setLocations(savedLocations);
  };

  const addNewLocation = async () => {
    const newLocation = { name: 'New Travel Spot', timestamp: Date.now() };
    await saveLocation(newLocation);
    loadLocations();
  };

  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
      <Button title="Save Location" onPress={addNewLocation} />
      <Button title="Clear Locations" onPress={async () => { await clearLocations(); setLocations([]); }} />
      <FlatList
        data={locations}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <Text>{item.name} - {new Date(item.timestamp).toLocaleString()}</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
