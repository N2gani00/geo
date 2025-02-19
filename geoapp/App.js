import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList } from 'react-native';
import { saveLocation, getLocations, clearLocations } from './utils/storage';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
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
    <View style={{ padding: 20 }}>
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
