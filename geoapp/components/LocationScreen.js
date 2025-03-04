import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LocationsScreen = ({ navigation }) => {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    const loadLocations = async () => {
      try {
        const storedLocations = await AsyncStorage.getItem('locations');
        if (storedLocations) {
          setLocations(JSON.parse(storedLocations));
        }
      } catch (error) {
        console.error("Error loading locations:", error);
      }
    };

    const unsubscribe = navigation.addListener('focus', loadLocations);
    return unsubscribe;
  }, [navigation]);

  const deleteLocation = async (index) => {
    Alert.alert("Confirm", "Delete this location?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Yes",
        onPress: async () => {
          try {
            const newLocations = locations.filter((_, i) => i !== index);
            await AsyncStorage.setItem('locations', JSON.stringify(newLocations));
            setLocations(newLocations);
          } catch (error) {
            console.error("Error deleting location:", error);
          }
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Saved Locations</Text>
      <FlatList
        data={locations}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.locationItem}>
            <View style={styles.textContainer}>
              <Text style={styles.locationName}>{item.name} ⭐ {item.rating}</Text>
              <Text style={styles.description}>{item.description}</Text>
            </View>
            
            {/* 📍 Make pin clickable to navigate to Map */}
            <TouchableOpacity 
              onPress={() => navigation.navigate("Map", { locationName: item.name })} 
            >
              <Text style={styles.pinIcon}>📍</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => deleteLocation(index)}>
              <Text style={styles.deleteText}>🗑️</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
    
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, paddingTop: 40 },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 10 },
  locationItem: { 
    flexDirection: "row", 
    alignItems: "center", 
    padding: 15, 
    borderBottomWidth: 1, 
    marginTop: 10 
  },
  textContainer: { flex: 1 },
  locationName: { fontSize: 18, fontWeight: "bold" },
  description: { fontSize: 14, color: "gray" },
  pinIcon: { fontSize: 20, marginRight: 10 },
  deleteText: { fontSize: 20, marginLeft: 10, color: "black" },
  addButton: { backgroundColor: "green", padding: 15, borderRadius: 5, marginTop: 20 },
  addButtonText: { color: "white", textAlign: "center", fontSize: 18 }
});


export default LocationsScreen;
